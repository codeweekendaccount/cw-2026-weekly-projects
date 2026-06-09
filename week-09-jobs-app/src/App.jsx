import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { mockJobs } from './data/jobs';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import { CheckCircle2 } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [jobs, setJobs] = useState(mockJobs);
  const [savedJobs, setSavedJobs] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSearch = () => {
    const filteredJobs = mockJobs.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());
      return matchTitle && matchLocation;
    });
    setJobs(filteredJobs);
  };

  const handleSaveJob = (jobToSave) => {
    const alreadySaved = savedJobs.find(job => job.id === jobToSave.id);
    if (!alreadySaved) {
      setSavedJobs([...savedJobs, jobToSave]);
      setToastMessage(`Saved "${jobToSave.title}"`);
    } else {
      handleRemoveSavedJob(jobToSave.id);
    }
  };

  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
    setToastMessage('Job removed from saved');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans transition-colors duration-200">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-grow flex flex-col">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  locationTerm={locationTerm}
                  setLocationTerm={setLocationTerm}
                  onSearch={handleSearch}
                  jobs={jobs}
                  onJobSave={handleSaveJob}
                  savedJobs={savedJobs}
                />
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <JobDetailsPage
                  savedJobs={savedJobs}
                  onSave={handleSaveJob}
                  onToast={setToastMessage}
                />
              }
            />
            <Route
              path="/saved"
              element={
                <SavedJobsPage
                  savedJobs={savedJobs}
                  onRemove={handleRemoveSavedJob}
                />
              }
            />
          </Routes>
        </main>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-4 right-4 z-50 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-lg shadow-lg flex items-center transform transition-all duration-300 animate-slide-up" role="alert">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 dark:text-emerald-600 mr-3 flex-shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 text-center text-gray-500 dark:text-gray-400 text-sm mt-auto transition-colors">
          <p>&copy; {new Date().getFullYear()} CareerConnect. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
