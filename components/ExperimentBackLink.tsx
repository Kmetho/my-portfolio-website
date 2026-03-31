"use client";

import Link from "next/link";

export default function ExperimentBackLink() {
  return (
    <Link
      href="/experiments"
      className="fixed top-4 left-4 z-50 text-xs text-primary/50 hover:text-primary font-bold transition-colors duration-200"
    >
      &larr; experiments
    </Link>
  );
}
