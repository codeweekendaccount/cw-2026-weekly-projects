import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockJobs } from '../data/jobs';
import {
  MapPin,
  DollarSign,
  Clock,
  Building,
  CheckCircle2,
  ArrowLeft,
  BookmarkPlus,
  Send,
  Globe,
  Users,
  GraduationCap,
  Heart,
  Coffee,
  Laptop,
  Briefcase,
} from 'lucide-react';

const JobDetailsPage = ({ savedJobs, onSave, onToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find((j) => j.id === parseInt(id));
  const isSaved = savedJobs.some((j) => j.id === job?.id);

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Briefcase className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Job not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">The job you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to all jobs
        </Link>
      </div>
    );
  }

  const handleApply = () => {
    onToast(`Application sent for ${job.title}!`);
  };

  const handleSave = () => {
    onSave(job);
  };

  // Fake "posted" date based on job id
  const daysAgo = job.id * 2 + 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-indigo-200">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Jobs</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium truncate" aria-current="page">{job.title}</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left: Job info */}
            <div className="flex items-start gap-5">
              {/* Company logo placeholder */}
              <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl text-2xl font-bold flex-shrink-0">
                {job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{job.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-indigo-100">
                  <span className="flex items-center gap-1.5">
                    <Building size={16} />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} />
                    Posted {daysAgo} days ago
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleSave}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white ${
                  isSaved
                    ? 'bg-white text-indigo-700 hover:bg-indigo-50'
                    : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                }`}
                aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
              >
                <BookmarkPlus size={18} className={isSaved ? 'fill-current' : ''} />
                {isSaved ? 'Saved' : 'Save Job'}
              </button>
              <button
                onClick={handleApply}
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white shadow-lg"
              >
                <Send size={18} />
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Salary</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{job.salary}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Job Type</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{job.type}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Location</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{job.location}</p>
                </div>
              </div>
            </div>

            {/* About the Role */}
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/50">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">About the Role</h2>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{job.description}</p>
              </div>
            </section>

            {/* Requirements */}
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/50">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Requirements</h2>
              </div>
              <div className="px-6 py-5">
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Responsibilities */}
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/50">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Responsibilities</h2>
              </div>
              <div className="px-6 py-5">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 dark:text-gray-300">Collaborate with cross-functional teams to define and implement solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 dark:text-gray-300">Write clean, maintainable, and well-documented code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 dark:text-gray-300">Participate in code reviews and contribute to team best practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 dark:text-gray-300">Troubleshoot and debug issues across the full stack</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-20 space-y-6">
              {/* Company Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/50">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Company Overview</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-700 dark:text-indigo-300 text-lg font-bold flex-shrink-0">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{job.company}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Technology</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
                      <Globe size={16} className="text-gray-400 dark:text-gray-500 flex-shrink-0" aria-hidden="true" />
                      <span>www.{job.company.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
                      <Users size={16} className="text-gray-400 dark:text-gray-500 flex-shrink-0" aria-hidden="true" />
                      <span>50-200 employees</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2">
                      <MapPin size={16} className="text-gray-400 dark:text-gray-500 flex-shrink-0" aria-hidden="true" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/50">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Benefits & Perks</h3>
                </div>
                <div className="px-6 py-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Heart size={16} className="text-rose-400 flex-shrink-0" aria-hidden="true" />
                      <span>Health Insurance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Coffee size={16} className="text-amber-500 flex-shrink-0" aria-hidden="true" />
                      <span>Free Lunch</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Laptop size={16} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
                      <span>Remote Work</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <GraduationCap size={16} className="text-indigo-500 flex-shrink-0" aria-hidden="true" />
                      <span>Learning Budget</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Apply CTA */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white text-center">
                <h3 className="text-lg font-bold mb-2">Interested in this role?</h3>
                <p className="text-indigo-200 text-sm mb-4">Apply now and hear back within 48 hours.</p>
                <button
                  onClick={handleApply}
                  className="w-full inline-flex justify-center items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white shadow-md"
                >
                  <Send size={18} />
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Jobs */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1"
          >
            <ArrowLeft size={18} />
            Back to all jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
