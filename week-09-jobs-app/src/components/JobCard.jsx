import { MapPin, DollarSign, Clock, BookmarkPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onSave, isSaved }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all duration-200 p-5 flex flex-col h-full group relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            <Link to={`/jobs/${job.id}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {job.title}
            </Link>
          </h3>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">{job.company}</p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSave(job);
          }}
          className={`relative z-10 p-2 rounded-full shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isSaved 
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50' 
              : 'text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title} to your jobs`}
        >
          <BookmarkPlus size={20} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-2 mt-auto relative z-10 pointer-events-none">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <MapPin size={16} className="mr-2 shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          <span className="line-clamp-1">{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <DollarSign size={16} className="mr-2 shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock size={16} className="mr-2 shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          <span>{job.type}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-2 relative z-10 pointer-events-none">
        {job.requirements.slice(0, 3).map((req, index) => (
          <span 
            key={index} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {req}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>
    </article>
  );
};

export default JobCard;
