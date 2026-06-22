import {
  Baby,
  Bone,
  Check,
  Clock,
  Cross,
  Heart,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { services, doctors } from "../data/clinicKnowledgeBase";

const serviceIcons = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  heart: Heart,
  baby: Baby,
  bone: Bone,
  microscope: Microscope,
};

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-slate-50 px-4 pb-20 pt-16 bg-linear-to-br from-slate-50 to-teal-50">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-teal-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-800">
                AI-Powered Healthcare
              </span>
              <h1 className="mb-5 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                Care that listens —{" "}
                <em className="font-serif font-normal not-italic text-teal-600">
                  intelligent
                </em>{" "}
                support at your fingertips
              </h1>
              <p className="mb-8 max-w-lg text-lg text-slate-500">
                SmartClinic combines expert medical care with a RAG-powered
                virtual assistant. Get instant answers about services, doctors,
                and policies — right from our homepage.
              </p>
              <div className="mb-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-teal-600 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  Book an Appointment
                </a>
                <a
                  href="#services"
                  className="rounded-full border-2 border-slate-200 px-7 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:border-teal-600 hover:text-teal-600"
                >
                  Explore Services
                </a>
              </div>
              <div className="flex gap-10 border-t border-slate-200 pt-6">
                {[
                  { value: "15+", label: "Specialists" },
                  { value: "10k+", label: "Patients Served" },
                  { value: "24/7", label: "AI Assistant" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <strong className="block text-2xl text-teal-800">
                      {stat.value}
                    </strong>
                    <span className="text-sm text-slate-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[320px]" aria-hidden="true">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                  <Cross className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Virtual Front Desk
                </h3>
                <p className="mb-4 text-sm text-slate-500">
                  Ask anything about clinic hours, pricing, or which doctor to
                  see.
                </p>
                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm italic text-slate-500">
                  &ldquo;Do you have a skin specialist?&rdquo;
                </div>
              </div>
              <div className="absolute -bottom-4 -right-2 flex max-w-[220px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-xs font-medium text-slate-700">
                  Grounded in real clinic data
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-teal-50/50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <span className="mb-4 inline-block rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Our Services
              </span>
              <h2 className="mb-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Comprehensive care under one roof
              </h2>
              <p className="text-slate-500">
                From routine checkups to specialized treatments, our team is
                here for every stage of your health journey.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = serviceIcons[service.icon] ?? Stethoscope;
                return (
                  <article
                    key={service.id}
                    className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <Icon
                      className="mb-4 h-8 w-8 text-teal-600"
                      strokeWidth={1.75}
                    />
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm text-slate-500">
                      {service.description}
                    </p>
                    <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">
                      {service.hours}
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Doctors */}
        <section id="doctors" className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <span className="mb-4 inline-block rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Our Team
              </span>
              <h2 className="mb-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Meet our specialists
              </h2>
              <p className="text-slate-500">
                Experienced, compassionate professionals dedicated to your
                wellbeing.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {doctors.map((doctor) => (
                <article
                  key={doctor.id}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md"
                >
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-teal-600 to-teal-400 text-lg font-bold text-white"
                    aria-hidden="true"
                  >
                    {doctor.name
                      .split(" ")
                      .slice(1)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {doctor.name}
                    </h3>
                    <p className="text-sm font-semibold text-teal-600">
                      {doctor.specialty}
                    </p>
                    <p className="text-xs text-slate-500">
                      {doctor.experience} experience
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{doctor.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-teal-50/50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Get in Touch
                </span>
                <h2 className="mb-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Visit us or reach out anytime
                </h2>
                <p className="mb-8 text-slate-500">
                  Prefer to talk to a person? Our front desk is ready to help
                  during clinic hours — or use the AI chat widget for instant
                  answers.
                </p>

                <ul className="space-y-5">
                  {[
                    {
                      icon: MapPin,
                      title: "Address",
                      text: "120 Health Avenue, Suite 400, Medical District",
                    },
                    {
                      icon: Phone,
                      title: "Phone",
                      text: "(555) 123-4567",
                    },
                    {
                      icon: Clock,
                      title: "Hours",
                      text: "Mon–Sat 8 AM – 8 PM · Sun emergency walk-ins",
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      text: "hello@smartclinic.care",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <li key={title} className="flex gap-4">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                      <div>
                        <strong className="block text-sm text-slate-900">
                          {title}
                        </strong>
                        <p className="text-sm text-slate-500">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <h3 className="mb-6 text-lg font-semibold text-slate-900">
                  Request an appointment
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700">
                    Phone
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      className={inputClass}
                    />
                  </label>
                </div>
                <label className="mt-4 block text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className={inputClass}
                  />
                </label>
                <label className="mt-4 block text-sm font-medium text-slate-700">
                  Preferred Service
                  <select defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="mt-4 block text-sm font-medium text-slate-700">
                  Message
                  <textarea
                    rows={4}
                    placeholder="Tell us about your visit…"
                    className={inputClass}
                  />
                </label>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-teal-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  Submit Request
                </button>
                <p className="mt-4 text-center text-xs text-slate-400">
                  This form is for demo purposes. Connect your backend to enable
                  submissions.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
