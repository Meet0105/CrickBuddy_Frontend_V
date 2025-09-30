import Link from 'next/link';

const SeriesDropdown = () => {
  return (
    <div className="bg-slate-800 text-gray-100 rounded-xl shadow-2xl w-64 py-2">
      <div className="px-4 py-3 border-b border-slate-700">
        <h3 className="font-bold flex items-center">
          <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Cricket Series
        </h3>
      </div>
      
      <div className="py-1">
        <Link href="/series" className="block px-4 py-3 text-sm text-gray-100 hover:bg-slate-700 transition-colors flex items-center rounded-md">
          <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Current Series
        </Link>
        <Link href="/series/archive" className="block px-4 py-3 text-sm text-gray-100 hover:bg-slate-700 transition-colors flex items-center rounded-md">
          <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Series Archive
        </Link>
        <Link href="/series/upcoming" className="block px-4 py-3 text-sm text-gray-100 hover:bg-slate-700 transition-colors flex items-center rounded-md">
          <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upcoming Series
        </Link>
      </div>
      
      <div className="px-4 py-3 border-t border-slate-700">
        <Link 
          href="/series" 
          className="text-emerald-400 hover:text-emerald-500 font-medium text-sm flex items-center justify-center"
        >
          View All Series
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SeriesDropdown;