import Link from 'next/link';

const TeamsDropdown = () => {
  return (
    <div className="bg-slate-800 text-gray-100 rounded-lg sm:rounded-xl shadow-2xl w-full sm:w-64 md:w-72 py-2">
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-slate-700">
        <h3 className="text-sm sm:text-base font-bold flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Cricket Teams
        </h3>
      </div>
      
      <div className="py-1">
        <Link href="/teams" className="block px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-100 hover:bg-slate-700 transition-colors flex items-center rounded-md group">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          International Teams
        </Link>
        <Link href="/teams/domestic" className="block px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-100 hover:bg-slate-700 transition-colors flex items-center rounded-md group">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Domestic Teams
        </Link>
      </div>
      
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-slate-700">
        <Link 
          href="/teams" 
          className="text-emerald-400 hover:text-emerald-500 font-semibold text-xs sm:text-sm flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          View All Teams
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default TeamsDropdown;