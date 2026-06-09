import React from 'react';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';

const HomePage = ({ searchTerm, setSearchTerm, locationTerm, setLocationTerm, onSearch, jobs, onJobSave, savedJobs }) => {
  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        onSearch={onSearch}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {searchTerm || locationTerm ? 'Search Results' : 'Latest Opportunities'}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
            </p>
          </div>
        </div>

        <JobList
          jobs={jobs}
          onJobSave={onJobSave}
          savedJobs={savedJobs}
        />
      </div>
    </>
  );
};

export default HomePage;
