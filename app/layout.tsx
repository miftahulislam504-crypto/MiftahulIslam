import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontMono, fontDisplay, fontBody } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";
import { SpotlightSearch } from "@/components/os/spotlight-search";
import { BackToTop } from "@/components/ui/back-to-top";
import { PageTransition } from "@/components/ui/page-transition";
import { PwaRegister } from "@/components/ui/pwa-register";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
  manifest: "/manifest.json",
  applicationName: SITE.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE.name,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0B0D10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontMono.variable} ${fontDisplay.variable} ${fontBody.variable} font-body antialiased`}
      >
        <Providers>
          <PwaRegister />
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgressBar />
          <SpotlightSearch />
          <PageTransition>{children}</PageTransition>
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
