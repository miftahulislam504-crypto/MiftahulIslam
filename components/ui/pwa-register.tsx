"use client";

import { useEffect } from "react";

// Registers the service worker in production only, after the page has
// finished loading, so it never competes with initial paint/hydration.
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Silently ignore — offline support is a progressive enhancement,
        // not something that should surface errors to the user.
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
