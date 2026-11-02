import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/AtlierFashion2" : "");

export const metadata: Metadata = {
  title: "ALTIER MAISON PRIVÉE — Haute Couture Designer Operating System",
  description: "The digital atelier for world-class independent fashion designers and discerning luxury patrons.",
  icons: {
    icon: `${basePath}/images/altier-logo.svg`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${jakarta.variable} ${inter.variable} h-full`}>
      <head>
        <link rel="icon" type="image/svg+xml" href={`${basePath}/images/altier-logo.svg`} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFF7F9] text-[#231820] antialiased relative">
        {/* Luxury Gold Shimmer Textured Atelier Background */}
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url('${basePath}/images/atelier-gold-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
          aria-hidden="true"
        />

        {/* Page Content positioned above the background */}
        <div 
          className="min-h-full flex flex-col flex-1"
          style={{ position: "relative", zIndex: 1, backgroundColor: "transparent" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
