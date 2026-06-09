import React from 'react';
import SavedJobs from '../components/SavedJobs';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const SavedJobsPage = ({ savedJobs, onRemove }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <SavedJobs
        jobs={savedJobs}
        onRemove={onRemove}
      />

      {savedJobs.length === 0 && (
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
          >
            <Search size={18} />
            Browse available jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;
