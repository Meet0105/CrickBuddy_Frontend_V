import Link from 'next/link';

const ScheduleDropdown = () => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full sm:w-64 md:w-72 py-2">
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
        <h3 className="text-sm sm:text-base font-bold text-gray-800 flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule
        </h3>
      </div>
      
      <div className="py-1">
        <Link href="/formats/upcoming" className="block px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-800 hover:bg-green-50 transition-colors flex items-center group">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upcoming Matches
        </Link>
        <Link href="/formats/live" className="block px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-800 hover:bg-green-50 transition-colors flex items-center group">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Live Matches
        </Link>
        <Link href="/formats/recent" className="block px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-800 hover:bg-green-50 transition-colors flex items-center group">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Results
        </Link>
      </div>
      
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100">
        <Link 
          href="/formats/upcoming" 
          className="text-green-700 hover:text-green-800 font-semibold text-xs sm:text-sm flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          Full Schedule
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ScheduleDropdown;