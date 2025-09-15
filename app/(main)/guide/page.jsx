// File: app/(main)/guide/page.jsx

import { ppur_attractions } from '@/data/guidePageData/pandharpurAttractions';
import TripPlannerPage from './_components/TripPlannerPage';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const GuidePage = () => {
  return (
    <div className="mt-25 min-h-screen dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-orange-600 via-red-500 to-orange-400 text-transparent bg-clip-text">Advanced Trip Planner</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Your complete toolkit for planning the perfect pilgrimage to Pandharpur.</p>
      </div>

      <TripPlannerPage GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY} ppur_attractions={ppur_attractions} />
    </div>
  );
};

export default GuidePage;