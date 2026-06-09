import React from 'react';
import JobCard from './JobCard';
import { Bookmark } from 'lucide-react';

const SavedJobs = ({ jobs, onRemove }) => {
  return (
    <section aria-labelledby="saved-jobs-heading" className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <Bookmark className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" aria-hidden="true" />
        <h2 id="saved-jobs-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Saved Jobs
          <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
            {jobs.length}
          </span>
        </h2>
      </div>
      
      {jobs.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
          <Bookmark className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" aria-hidden="true" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No saved jobs</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            When you save jobs they will appear here for easy access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="relative group/saved">
              <JobCard 
                job={job} 
                onSave={() => onRemove(job.id)}
                isSaved={true}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedJobs;
