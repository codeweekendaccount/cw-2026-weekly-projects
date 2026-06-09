import React from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, locationTerm, setLocationTerm, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-8 px-4 sm:px-6 lg:px-8" aria-label="Job Search">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl mb-6 text-center">
          Find your next <span className="text-indigo-600 dark:text-indigo-400">dream job</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="mt-8 sm:flex gap-4">
          <div className="flex-1 relative rounded-md shadow-sm mb-4 sm:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </div>
            <label htmlFor="job-title" className="sr-only">Job title, keywords, or company</label>
            <input
              type="text"
              name="job-title"
              id="job-title"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 outline-none border transition-colors dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 relative rounded-md shadow-sm mb-4 sm:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </div>
            <label htmlFor="location" className="sr-only">City, state, or remote</label>
            <input
              type="text"
              name="location"
              id="location"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 outline-none border transition-colors dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="City, state, or remote"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
          >
            Search Jobs
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
