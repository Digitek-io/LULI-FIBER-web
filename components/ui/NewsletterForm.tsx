"use client";

import { useState } from "react";
import { FiMail, FiCheck, FiLoader } from "react-icons/fi";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "newsletter",
          email: email,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to subscribe");

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <FiMail size={18} />
        </div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          placeholder="Enter your email address"
          className="w-full py-3 pl-11 pr-32 bg-white border border-gray-200 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand disabled:opacity-60 transition-all"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-brand text-white text-sm font-semibold rounded-full hover:bg-[#b3146d] transition-colors disabled:opacity-80 flex items-center justify-center min-w-25"
        >
          {status === "loading" ? (
            <FiLoader className="animate-spin" size={16} />
          ) : status === "success" ? (
            <span className="flex items-center gap-1"><FiCheck /> Done</span>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-500 mt-2 absolute">{errorMessage}</p>
      )}
    </form>
  );
}