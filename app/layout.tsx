import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://wercche.xyz"),
  title: "wercche – making things on the internet",
  description:
    "Creative technologist unearthing the in-between of virtual and real. I build interactive web experiences, 3D experiments, and visual projects.",
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
      "Creative technologist unearthing the in-between of virtual and real. I build interactive web experiences, 3D experiments, and visual projects.",
    type: "website",
    url: "https://wercche.xyz/",
    siteName: "wercche",
    locale: "en_US",
    images: "/opengraph-image.jpg",
  },
  other: {
    "X-UA-Compatible": "IE=edge",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
