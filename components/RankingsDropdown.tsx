import Link from 'next/link';

const RankingsDropdown = () => {
  return (
    <div className="bg-slate-800 text-gray-100 rounded-xl shadow-2xl w-64 py-2">
      <div className="px-4 py-3 border-b border-slate-700">
        <h3 className="font-bold flex items-center">
          <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          ICC Rankings
        </h3>
      </div>
      
      <div className="py-1">
        <Link href="/rankings" className="block px-4 py-3 text-sm text-gray-100 hover:bg-slate-700 transition-colors flex items-center rounded-md">
          <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Men's Rankings
        </Link>
        <Link href="/rankings/women" className="block px-4 py-3 text-sm text-gray-100 hover:bg-slate-700 transition-colors flex items-center rounded-md">
          <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Women's Rankings
        </Link>
      </div>
      
      <div className="px-4 py-3 border-t border-slate-700">
        <Link 
          href="/rankings" 
          className="text-emerald-400 hover:text-emerald-500 font-medium text-sm flex items-center justify-center"
        >
          View Full Rankings
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RankingsDropdown;