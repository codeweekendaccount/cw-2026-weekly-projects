import React from 'react';
import JobCard from './JobCard';
import { Briefcase } from 'lucide-react';

const JobList = ({ jobs, onJobSave, savedJobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
        <Briefcase className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No jobs found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or location filters.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="job-list-heading">
      <h2 id="job-list-heading" className="sr-only">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const isSaved = savedJobs.some(savedJob => savedJob.id === job.id);
          return (
            <JobCard 
              key={job.id} 
              job={job} 
              onSave={onJobSave}
              isSaved={isSaved}
            />
          );
        })}
      </div>
    </section>
  );
};

export default JobList;
