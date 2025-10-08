import React from 'react';

interface VenuesTabProps {
  venues: any[];
}

export const VenuesTab: React.FC<VenuesTabProps> = ({ venues }) => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Venues
      </h3>
      {venues && venues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {venues.map((venue: any, index: number) => (
            <div key={index} className="group border border-gray-700/50 hover:border-green-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 bg-gray-800/80 hover:bg-gray-700/80 transition-all duration-200 transform hover:scale-[1.02]">
              <div className="flex items-start gap-2 mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-100 group-hover:text-green-300 transition-colors">{venue.ground || venue.name}</h4>
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 ml-6">
                {venue.city}, {venue.country}
              </div>
              {venue.timezone && (
                <div className="text-xs sm:text-sm text-gray-400 mt-1.5 sm:mt-2 ml-6 flex items-center gap-1.5">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {venue.timezone}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm sm:text-base text-gray-400 italic text-center p-4 sm:p-6">No venue data available.</p>
      )}
    </div>
  );
};