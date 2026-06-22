import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link to="/" className="text-xl font-bold text-white">
            Smart<span className="text-teal-400">Clinic</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            Compassionate care with intelligent assistance — available 24/7 via
            our AI chat widget.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href="/#services" className="hover:text-teal-400">
                Services
              </a>
            </li>
            <li>
              <a href="/#doctors" className="hover:text-teal-400">
                Our Doctors
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-teal-400">
                Contact
              </a>
            </li>
            <li>
              <Link to="/upload" className="hover:text-teal-400">
                Upload Knowledge
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>120 Health Avenue, Suite 400</li>
            <li>(555) 123-4567</li>
            <li>hello@smartclinic.care</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} SmartClinic. All rights reserved.</p>
          <p>
            AI assistant provides general clinic information only — not medical
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
