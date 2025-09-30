import React from 'react';

interface VenuesTabProps {
  venues: any[];
}

export const VenuesTab: React.FC<VenuesTabProps> = ({ venues }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-100 mb-4">Venues</h3>
      {venues && venues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venues.map((venue: any, index: number) => (
            <div key={index} className="border border-gray-700 rounded p-4 bg-gray-800 hover:bg-gray-700 transition-colors">
              <h4 className="font-bold text-gray-100 mb-1">{venue.ground || venue.name}</h4>
              <div className="text-sm text-gray-300">
                {venue.city}, {venue.country}
              </div>
              {venue.timezone && (
                <div className="text-xs text-gray-400 mt-1">
                  Timezone: {venue.timezone}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic">No venue data available.</p>
      )}
    </div>
  );
};