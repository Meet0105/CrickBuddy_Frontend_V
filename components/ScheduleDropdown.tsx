import Link from 'next/link';

const ScheduleDropdown = () => {
  return (
    <div className="bg-white rounded-xl shadow-2xl w-64 py-2">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule
        </h3>
      </div>
      
      <div className="py-1">
        <Link href="/formats/upcoming" className="block px-4 py-3 text-sm text-gray-800 hover:bg-green-50 transition-colors flex items-center">
          <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upcoming Matches
        </Link>
        <Link href="/formats/live" className="block px-4 py-3 text-sm text-gray-800 hover:bg-green-50 transition-colors flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Live Matches
        </Link>
        <Link href="/formats/recent" className="block px-4 py-3 text-sm text-gray-800 hover:bg-green-50 transition-colors flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Results
        </Link>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-100">
        <Link 
          href="/formats/upcoming" 
          className="text-green-700 hover:text-green-800 font-medium text-sm flex items-center justify-center"
        >
          Full Schedule
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ScheduleDropdown;