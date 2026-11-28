import type { Metadata } from "next";
import localFont from "next/font/local";
import { Prata, Outfit } from "next/font/google";
import "./globals.css";

const cintarini = localFont({
  src: "./fonts/Cintarini.ttf",
  variable: "--font-cintarini",
  display: "swap",
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  fallback: ["serif"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["sans-serif"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/AtlierFashion2" : "");

export const metadata: Metadata = {
  title: "STYTELL — Haute Couture & Bespoke Luxury Maison",
  description: "The digital atelier for world-class independent fashion designers and discerning luxury customers at STYTELL.",
  icons: {
    icon: `${basePath}/images/stytell-favicon.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cintarini.variable} ${prata.variable} ${outfit.variable} h-full`}>
      <head>
        <link rel="icon" type="image/png" href={`${basePath}/images/stytell-favicon.png`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Prata&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FAF7F2] text-[#231820] antialiased relative">
        {/* Page Content */}
        <div 
          className="min-h-full flex flex-col flex-1 relative z-0"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
