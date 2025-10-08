import React from 'react';
import { NewsItem } from '../../utils/players/playerTypes';

interface PlayerNewsProps {
  news: NewsItem[];
}

export const PlayerNews: React.FC<PlayerNewsProps> = ({ news }) => {
  if (!news || news.length === 0) return null;

  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-700/50">
      <div className="flex items-center gap-2 mb-4 sm:mb-5 md:mb-6">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-300">
          Player News
        </h2>
      </div>
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {news.map((item, index) => (
          <div 
            key={item.id} 
            className="group p-3 sm:p-4 md:p-5 bg-gray-900/50 hover:bg-gray-900/70 rounded-lg sm:rounded-xl border border-gray-700/30 hover:border-green-500/40 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3">
              <h3 className="flex-1 text-sm sm:text-base md:text-lg font-semibold text-green-300 group-hover:text-green-200 transition-colors line-clamp-2">
                {item.title}
              </h3>
              <div className="flex-shrink-0 px-2 sm:px-2.5 py-1 bg-green-900/40 rounded-full">
                <span className="text-xs sm:text-sm font-medium text-green-400">#{index + 1}</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed mb-2 sm:mb-3 line-clamp-3">
              {item.summary}
            </p>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2 2z" />
              </svg>
              <time className="font-medium text-green-400">{new Date(item.date).toLocaleDateString()}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};