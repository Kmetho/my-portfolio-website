import "./globals.css";

export const metadata = {
  title: "wercche – making things on the internet",
  description:
    "Creative technologist unearthing the in-between of virtual and real. I build interactive web experiences, 3D experiments, and visual projects.",
  icons: {
    icon: "/smile.ico",
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
    images: "/og-image.jpg",
  },
  other: {
    "X-UA-Compatible": "IE=edge",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
