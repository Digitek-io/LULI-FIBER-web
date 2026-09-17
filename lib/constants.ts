import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

/**
 * Central data file. Anything that appears in more than one place on the
 * site -- contact details, external links, plan pricing -- lives here so
 * a change (new phone line, new plan price, renewal URL) only has to be
 * made once.
 */

export const CONTACT = {
  phones: ["02016402510", "02085914555"],
  whatsapp: "+2349066515018",
  whatsappHref: "https://wa.me/2349066515018",
   supportPhoneLocal: "09066515018",
  supportEmail: "help@lulifiber.com",
  salesEmail: "sales@lulifiber.com",
  address: "3b Adegbeyeni Street, Allen, Ikeja, Lagos, 100001, Nigeria.",
  hours: {
    support: "Customer Support: 24/7",
    installation: "Installation & Office Hours: Monday – Saturday, 9:00 AM – 6:00 PM",
  },
};

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/lulifiber", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/lulifiber/", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/lulifiber/", Icon: FaLinkedinIn },
];

export const LINKS = {
  home: "/",
  pricing: "/#pricing",
  shop: "https://goxsolution.com",
  speedTest: "https://gox-conect.speedtestcustom.com/",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  login: "https://flowsoft.io/app/login",
  register: "https://flowsoft.io/app/lulifiber/register",
  renewSubscription: "https://flowsoft.io/app/login",
  waitlist: "",
};

export const LEGAL_LINKS = [
  { label: "Acceptable Use", href: "/acceptable-use" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export const COMPANY_LINKS = [
  { label: "About", href: LINKS.about },
  { label: "Contact", href: LINKS.contact },
  { label: "Blog", href: LINKS.blog },
];

export const SELF_SERVICE_LINKS = [
  { label: "Register", href: LINKS.register },
  { label: "Renew Subscription", href: LINKS.renewSubscription },
  { label: "Speed Checker", href: LINKS.speedTest },
];

// ---- Plans --------------------------------------------------------------
// TODO: placeholder pricing -- the live site's plan grid is populated by JS
// this fetch couldn't see. Swap every value below for the real speed/price
// sheet per city/tier before launch. Structured identically for both
// cities for now; split by city here if Lagos and Owerri actually differ.

export const CITIES = ["Lagos", "Owerri"] as const;
export type City = (typeof CITIES)[number];

export const TIERS = ["Promo", "Premium", "Enterprise & Dedicated"] as const;
export type Tier = (typeof TIERS)[number];

export interface Plan {
  name: string;
  speed: string;
  price: string;
  cadence?: string;
  features: string[];
  popular?: boolean;
  ctaLabel: string;
  ctaHref: string;
}


export const LULI_PLANS = {
  "locations": [
    {
      "city": "Lagos",
      "categories": [
        {
          "name": "Promo",
          "subtitle": "Luli Special",
          "plans": [
            {
              "plan_name": "Luli Core",
              "speed": "100 Mbps",
              "price_per_month": "21,000",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Luli Boost",
              "speed": "200 Mbps",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "40,000",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Luli Prime",
              "badge": "POPULAR",
              "speed": "300 Mbps",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "50,000",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds",
                "Large Office Ready"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Luli Max",
              "speed": "500 Mbps",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "70,000",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "4K Streaming/Gaming",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            }
          ]
        },
        {
          "name": "Premium",
          "subtitle": "Luli Premium Plans",
          "plans": [
            {
              "plan_name": "Luli Essential",
              "speed": "30 Mbps",
              "price_per_month": "16,125",
              "features": [
                "Multiple Devices Support",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "91,375",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "Luli Estate Plan",
              "speed": "60 Mbps",
              "price_per_month": "18,275",
              "features": [
                "Multiple Devices Support",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "93,525",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "Luli Basic",
              "badge": "MOST POPULAR",
              "speed": "50 Mbps",
              "price_per_month": "27,036",
              "features": [
                "Multiple Devices Support",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "102,286",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "Luli Gamer",
              "speed": "75 Mbps",
              "price_per_month": "50,906",
              "features": [
                "Multiple Devices Support",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "126,151",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "Luli Ultra",
              "badge": "BEST VALUE",
              "speed": "100 Mbps",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "79,442",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "4K Streaming/Gaming",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "154,692",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "Luli Business",
              "speed": "200 Mbps",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "113,815",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "189,065",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "Luli Ultimate",
              "speed": "300 Mbps",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "139,750",
              "features": [
                "Ideal for large offices",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "terms": "Contact us for total package details.\nInstallation completed within 7-14 working days."
            }
          ]
        },
        {
          "name": "Enterprise & Dedicated",
          "plans": [
            {
              "plan_name": "DP Core",
              "speed": "10 Mbps Dedicated",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "107,500",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "268,750",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "DP Pro",
              "badge": "RECOMMENDED",
              "speed": "15 Mbps Dedicated",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "161,250",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "372,500",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "DP Elite",
              "speed": "20 Mbps Dedicated",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "215,000",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "426,250",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            },
            {
              "plan_name": "DP Apex",
              "speed": "30 Mbps Dedicated",
              "additional_perks": "+ Luli-chat & Luli-sign",
              "price_per_month": "322,500",
              "features": [
                "Ideal for 10-12 Users",
                "100% Unlimited Data",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "total_first_time_payment": "533,750",
              "terms": "Installation completed within 7-14 working days.\nUpon contract termination, routers remain the property of Lulifiber and must be returned."
            }
          ]
        }
      ]
    },
    {
      "city": "Owerri",
      "categories": [
        {
          "name": "Promo",
          "plans": [
            {
              "plan_name": "Home Starter",
              "speed": "30 Mbps",
              "price_per_month": "26,875",
              "features": [
                "100% Unlimited Data",
                "FREE Installation",
                "Symmetrical Speeds",
                "Multiple Devices"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Home Plus",
              "speed": "50 Mbps",
              "price_per_month": "50,901.25",
              "features": [
                "100% Unlimited Data",
                "FREE Installation",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Home Pro",
              "badge": "MOST POPULAR",
              "speed": "75 Mbps",
              "price_per_month": "79,442.50",
              "features": [
                "100% Unlimited Data",
                "FREE Installation",
                "4K Streaming/Gaming",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Home Ultra",
              "speed": "100 Mbps",
              "price_per_month": "145,662.50",
              "features": [
                "100% Unlimited Data",
                "FREE Installation",
                "4K Streaming/Gaming",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Home Max",
              "speed": "200 Mbps",
              "price_per_month": "220,375",
              "features": [
                "100% Unlimited Data",
                "FREE Installation",
                "Heavy Multi-User Ready",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Home Apex",
              "speed": "300 Mbps",
              "price_per_month": "Consult",
              "features": [
                "100% Unlimited Data",
                "FREE Installation",
                "Premium Support",
                "Symmetrical Speeds"
              ],
              "terms": "Contact us for a tailored quote."
            }
          ]
        },
        {
          "name": "Premium",
          "plans": [
            {
              "plan_name": "Business Essential",
              "speed": "60 Mbps",
              "price_per_month": "86,000",
              "features": [
                "100% Unlimited Data",
                "FREE Installation",
                "Super HD Video Calls",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "Business Elite",
              "badge": "BEST VALUE",
              "speed": "80 Mbps",
              "price_per_month": "129,000",
              "features": [
                "100% Unlimited Data",
                "FREE Installation",
                "4K Streaming/Gaming",
                "Symmetrical Speeds"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            }
          ]
        },
        {
          "name": "Enterprise & Dedicated",
          "plans": [
            {
              "plan_name": "DP 10",
              "speed": "10 Mbps Dedicated",
              "price_per_month": "118,250",
              "features": [
                "Symmetrical Dedicated",
                "100% Unlimited Data",
                "FREE Installation",
                "Priority Support"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "DP 20",
              "badge": "RECOMMENDED",
              "speed": "20 Mbps Dedicated",
              "price_per_month": "236,500",
              "features": [
                "Symmetrical Dedicated",
                "100% Unlimited Data",
                "FREE Installation",
                "Priority Support"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "DP 30",
              "speed": "30 Mbps Dedicated",
              "price_per_month": "354,750",
              "features": [
                "Symmetrical Dedicated",
                "100% Unlimited Data",
                "FREE Installation",
                "Priority Support"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            },
            {
              "plan_name": "DP 50",
              "speed": "50 Mbps Dedicated",
              "price_per_month": "591,250",
              "features": [
                "Symmetrical Dedicated",
                "100% Unlimited Data",
                "FREE Installation",
                "Priority Support"
              ],
              "terms": "FREE Installation - T&C Apply\nInstallation completed within 7-14 working days."
            }
          ]
        }
      ]
    }
  ]
}

export const COVERAGE_MAP: Record<string, string[]> = {
  Lagos: [
    "Agege",
    "Airport Road",
    "Ajasa",
    "Dopemu",
    "Egbeda",
    "Fadeyi",
    "Iju",
    "Ikeja",
    "Ipaja / Command",
    "Ketu",
    "Lekki",
    "Surulere",
    "Victoria Island (VI)",
    "Yaba",
  ].sort(),
  Owerri: [
    "Along Avu Road",
    "Along Egbu Road (before ShopRite)",
    "Along Mbaise Road",
    "Amakohia Road",
    "Arugo - Egbeada Housing Estate Road",
    "Avu Resettlement Layout",
    "Bala Suya Road",
    "Diamond Estate",
    "Federal Housing Estate",
    "Hilltop Estate Phase 2",
    "Holy Rosary Axis",
    "Ikenegbu Layout",
    "Imo Housing Estate Umuguma",
    "Imsu Axis",
    "New Owerri",
    "Okigwe Road",
    "Pocket Layout Amakohia",
    "Port Harcourt Road",
    "Umudagu Layout Axis",
    "Umuguma Layout",
    "Works Layout",
    "World Bank",
  ].sort(),
};