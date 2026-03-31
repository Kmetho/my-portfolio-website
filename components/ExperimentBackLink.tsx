"use client";

import Link from "next/link";

export default function ExperimentBackLink() {
  return (
    <Link
      href="/experiments"
<<<<<<< Updated upstream
      className="fixed top-4 left-4 z-50 text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
=======
      className="fixed top-4 left-4 z-50 text-xs text-primary/50 hover:text-primary font-bold transition-colors duration-200"
>>>>>>> Stashed changes
    >
      &larr; experiments
    </Link>
  );
}
