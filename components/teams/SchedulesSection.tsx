import React from 'react';
import Link from 'next/link';
import { Schedule } from '../../utils/teams/teamTypes';

interface SchedulesSectionProps {
  schedules: Schedule[];
}

export const SchedulesSection: React.FC<SchedulesSectionProps> = ({ schedules }) => {
  return schedules && schedules.length > 0 ? (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-100 mb-4">Upcoming Matches</h2>
      <div className="space-y-3">
        {schedules.map((schedule, index) => (
          <Link
            key={schedule.matchId || index}
            href={`/matches/${schedule.matchId}`}
            className="border border-gray-700 rounded p-3 hover:bg-gray-700 hover:border-blue-400 transition cursor-pointer block group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-100 group-hover:text-blue-400">{schedule.title}</p>
                <p className="text-sm text-gray-400">{schedule.date} at {schedule.venue}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-600 bg-opacity-20 text-blue-400 rounded">
                  {schedule.status}
                </span>
              </div>
              <div className="text-blue-400 group-hover:text-blue-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-100 mb-4">Upcoming Matches</h2>
      <p className="text-gray-400">No upcoming matches available for this team.</p>
    </div>
  );
};