import "./globals.css";
import type { Metadata } from "next";
import { Young_Serif } from "next/font/google";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wercche.xyz"),
  title: "wercche – making things on the internet",
  description:
    "Web developer & media artist building interactive web experiences, 3D experiments, and visual projects.",
  icons: {
    icon: "/favicon.ico",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://wercche.xyz/",
  },
  openGraph: {
    title: "wercche – making things on the internet",
    description:
      "Web developer & media artist building interactive web experiences, 3D experiments, and visual projects.",
    type: "website",
    url: "https://wercche.xyz/",
    siteName: "wercche",
    locale: "en_US",
    images: "/opengraph-image.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={youngSerif.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
