"use client";

import { useEffect } from "react";

export default function DigitalZineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return <>{children}</>;
}
