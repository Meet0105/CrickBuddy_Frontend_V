import React from 'react';
import { Series } from './utils/seriesTypes';

interface SeriesInfoProps {
  series: Series;
}

export const SeriesInfo: React.FC<SeriesInfoProps> = ({ series }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-100 mb-3">Series Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Format:</span>
              <span className="font-medium text-gray-200">{series.format}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <span className="font-medium text-gray-200">{series.seriesType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className={`font-medium ${
                series.status === 'ONGOING' ? 'text-red-400' :
                series.status === 'UPCOMING' ? 'text-blue-400' :
                'text-gray-400'
              }`}>
                {series.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="font-medium text-gray-200">
                {new Date(series.startDate).toLocaleDateString()} - {new Date(series.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Matches:</span>
              <span className="font-medium text-gray-200">{series.completedMatches} / {series.totalMatches}</span>
            </div>
            {series.venue.country && (
              <div className="flex justify-between">
                <span className="text-gray-400">Country:</span>
                <span className="font-medium text-gray-200">{series.venue.country}</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-100 mb-3">Teams</h3>
          <div className="space-y-2">
            {series.teams.map((team) => (
              <div key={team.teamId} className="flex items-center p-2 bg-gray-750 border border-gray-700 rounded">
                <span className="font-medium text-gray-200">{team.teamName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {series.description && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-100 mb-2">Description</h3>
          <p className="text-gray-300">{series.description}</p>
        </div>
      )}
    </div>
  );
};