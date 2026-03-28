export default function Nav({ current }) {
  const links = [
    { label: "Work", href: "/work" },
    { label: "Experiments", href: "/experiments" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="glass flex items-center justify-between px-8 py-5 md:px-16 lg:px-24 border-b">
      <a
        href="/"
        className="font-display text-lg font-black tracking-tight hover:text-primary transition-colors duration-200"
      >
        wercche
      </a>
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
              current === link.label.toLowerCase()
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
