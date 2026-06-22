import { Link } from "react-router-dom";
import { Cross } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-16 bg-slate-50 px-6 bg-linear-to-br from-slate-50 to-teal-50">
      <div className="max-w-md">
        <span
          className="mb-2 block text-8xl font-bold leading-none text-teal-200"
          aria-hidden="true"
        >
          404
        </span>
        <h1 className="mb-4 text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="mb-8 text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Our AI assistant is still available on the homepage if you need help.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-full bg-teal-600 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Back to Homepage
          </Link>
          <Link
            to="/upload"
            className="rounded-full border-2 border-slate-200 px-7 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:border-teal-600 hover:text-teal-600"
          >
            Upload Knowledge
          </Link>
        </div>
      </div>

      <div className="hidden md:block" aria-hidden="true">
        <div className="flex h-40 w-40 animate-pulse items-center justify-center rounded-full bg-teal-100 text-teal-600">
          <Cross className="h-16 w-16" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
