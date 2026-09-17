import { NextRequest, NextResponse } from "next/server";

// Define the exact sources your components are sending
export type LeadSource =
  | "contact-form"
  | "exit-intent-popup"
  | "newsletter";

export interface LeadPayload {
  source: LeadSource;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// Map the raw sources to human-readable labels for n8n/emails
const sourceLabels: Record<LeadSource, string> = {
  "contact-form": "Contact Page Form",
  "exit-intent-popup": "Exit Intent Popup",
  "newsletter": "Footer Newsletter",
};

// 1. Validation Logic
function validate(body: unknown): { valid: boolean; payload?: LeadPayload; error?: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }
  
  const b = body as Record<string, unknown>;
  const validSources: LeadSource[] = ["contact-form", "exit-intent-popup", "newsletter"];
  
  if (!b.source || !validSources.includes(b.source as LeadSource)) {
    return { valid: false, error: "Invalid or missing source" };
  }
  
  // Require at least an email or a phone number for any lead
  if (!b.email && !b.phone) {
    return { valid: false, error: "An email or phone number is required" };
  }

  return {
    valid: true,
    payload: {
      source: b.source as LeadSource,
      name: typeof b.name === "string" ? b.name.trim() : undefined,
      email: typeof b.email === "string" ? b.email.trim() : undefined,
      phone: typeof b.phone === "string" ? b.phone.trim() : undefined,
      message: typeof b.message === "string" ? b.message.trim() : undefined,
    },
  };
}

// 2. Webhook Notification Logic
async function notifyWebhook(payload: LeadPayload): Promise<void> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("N8N_WEBHOOK_URL is missing. Lead was not forwarded:", payload);
    return;
  }

  // Generate a Nigerian-formatted timestamp
  const timestamp = new Date().toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });

  // Construct the final payload for n8n
  const body: Record<string, unknown> = {
    formType: payload.source,
    sourceLabel: sourceLabels[payload.source],
    submittedAt: timestamp,
  };

  if (payload.name) body.name = payload.name;
  if (payload.email) body.email = payload.email;
  if (payload.phone) body.phone = payload.phone;
  if (payload.message) body.message = payload.message;

  // Send to n8n
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`n8n Webhook failed: ${res.status} ${text}`);
  }
}

// 3. Simple In-Memory Rate Limiting (Prevents spam bots)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // Max 5 submissions per IP
const WINDOW_MS = 10 * 60 * 1000; // per 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) return true;
  record.count++;
  return false;
}

// 4. Main POST Handler
export async function POST(request: NextRequest) {
  try {
    // Extract IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse Body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Validate
    const { valid, payload, error } = validate(body);
    if (!valid || !payload) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Send to n8n
    try {
      await notifyWebhook(payload);
    } catch (err) {
      console.error("Webhook notification failed:", err);
      return NextResponse.json(
        { error: "Failed to connect to the server. Please try again later." }, 
        { status: 502 } // 502 Bad Gateway is accurate here
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Block GET requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}