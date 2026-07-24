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
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
