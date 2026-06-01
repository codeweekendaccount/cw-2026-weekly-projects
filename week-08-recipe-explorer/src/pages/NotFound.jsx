import { Link } from 'react-router';
import { Home, UtensilsCrossed } from 'lucide-react';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <UtensilsCrossed className="w-24 h-24 text-slate-600 mb-6" />
      <h2 className="text-6xl font-bold mb-4 bg-linear-to-br from-white to-slate-400 bg-clip-text text-transparent">
        404
      </h2>
      <h3 className="text-2xl font-semibold text-slate-300 mb-6">
        Page Not Found
      </h3>
      <p className="text-slate-400 text-lg mb-10 max-w-md">
        Oops! We couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link 
        to="/"
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-primary/20"
      >
        <Home size={20} />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
