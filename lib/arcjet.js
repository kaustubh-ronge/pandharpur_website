import arcjet, { 
  detectBot, 
  fixedWindow, 
  shield
} from "@arcjet/next";

// Centralized Arcjet configuration
export const aj = arcjet({
  key: process.env.ARCJET_KEY, // Get your site key from https://app.arcjet.com
  characteristics: ["ip.src"], // Track requests by IP address
  rules: [
    // Shield protects against common attacks like SQL injection and XSS
    shield({ mode: "LIVE" }),
    
    // Detect bots and block malicious ones
    detectBot({
      mode: "LIVE",
      // Block all bots except search engine crawlers
      allow: ["CATEGORY:SEARCH_ENGINE"], 
    }),

    // Default rate limiting for general requests
    fixedWindow({
      mode: "LIVE",
      window: "60s",
      max: 100,
    }),
  ],
});

// Specialized rate limiter for AI and Auth sensitive routes
export const aiRateLimiter = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
    fixedWindow({
      mode: "LIVE",
      window: "10m",
      max: 10, // Max 10 AI requests per 10 minutes
    }),
  ],
});

// Specialized rate limiter for forms (Join Us, Kirtankar, etc)
export const formRateLimiter = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
    fixedWindow({
      mode: "LIVE",
      window: "1h",
      max: 5, // Max 5 form submissions per hour
    }),
  ],
});

// Brute-force protection for sensitive operations (e.g. admin actions, payments)
export const bruteForceLimiter = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    fixedWindow({
      mode: "LIVE",
      window: "1h",
      max: 20, // Max 20 attempts per hour
    }),
  ],
});
