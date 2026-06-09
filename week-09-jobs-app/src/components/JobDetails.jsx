import { useEffect, useRef } from 'react';
import { MapPin, DollarSign, Clock, X, Building, CheckCircle2 } from 'lucide-react';

const JobDetails = ({ job, onClose, onApply }) => {
  const panelRef = useRef(null);

  // Trap focus for accessibility when opened as a modal
  useEffect(() => {
    if (job && panelRef.current) {
      panelRef.current.focus();
    }
  }, [job]);

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div 
          ref={panelRef}
          className="max-w-md w-full bg-white shadow-xl flex flex-col focus:outline-none overflow-y-auto"
        >
          <div className="px-4 py-6 sm:px-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900" id="slide-over-title">
                  {job.title}
                </h2>
                <div className="mt-1 flex items-center text-indigo-600 font-medium">
                  <Building className="mr-1.5 h-4 w-4" aria-hidden="true" />
                  {job.company}
                </div>
              </div>
              <div className="ml-3 h-7 flex items-center">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6 flex-1">
            {/* Metadata */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                <MapPin className="mr-1.5 h-4 w-4 text-gray-500" aria-hidden="true" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                <DollarSign className="mr-1.5 h-4 w-4 text-gray-500" aria-hidden="true" />
                {job.salary}
              </div>
              <div className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                <Clock className="mr-1.5 h-4 w-4 text-gray-500" aria-hidden="true" />
                {job.type}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">About the Role</h3>
              <p className="text-gray-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-2 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="shrink-0 px-4 py-4 border-t border-gray-200 sm:px-6 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => onApply(job)}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
