"use client";

import Link from "next/link";

export default function WorkBackLink() {
  return (
    <Link
      href="/work"
      className="fixed top-4 left-4 z-50 text-xs text-foreground font-bold uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
    >
      &larr; go back to work list
    </Link>
  );
}
