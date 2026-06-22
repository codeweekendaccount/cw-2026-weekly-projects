import { Link } from "react-router-dom";
import { Cross } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Doctors", href: "/#doctors" },
  { label: "Contact", href: "/#contact" },
  { label: "Upload Knowledge", href: "/upload" },
];

const linkClass =
  "text-sm font-medium text-slate-500 transition-colors hover:text-teal-600";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Cross className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span>
            Smart<span className="text-teal-600">Clinic</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.href.startsWith("/upload") ? (
              <Link key={link.href} to={link.href} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <a
          href="/#contact"
          className="hidden rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 md:inline-flex"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}
