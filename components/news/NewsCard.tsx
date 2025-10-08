import React from 'react';
import Link from 'next/link';
import { NewsItem } from '../../utils/news/newsTypes';

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <div 
      key={item.newsId} 
      className="bg-gray-800/95 hover:bg-gray-700 shadow-lg hover:shadow-2xl rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] border border-gray-700/50 hover:border-green-500/30"
    >
      <div className="flex flex-col sm:flex-row">
        {/* News Image */}
        <div className="w-full sm:w-2/5 md:w-1/3 flex-shrink-0">
          {item.featuredImage?.url ? (
            <img 
              src={`https://via.placeholder.com/640x360/10b981/ffffff?text=Cricket+News`}
              alt={item.headline}
              className="w-full h-48 sm:h-56 md:h-full object-cover transition-transform duration-300 hover:scale-105"
              onLoad={(e) => {
                // Try to load the actual cricket image
                const target = e.target as HTMLImageElement;
                const imageId = item.featuredImage?.url;
                if (imageId) {
                  const cricketImageUrl = `https://static.cricbuzz.com/a/img/v1/420x235/i1/c${imageId}/i.jpg`;
                  const img = new Image();
                  img.onload = () => {
                    target.src = cricketImageUrl;
                  };
                  img.onerror = () => {
                    // Keep the placeholder if cricket image fails
                  };
                  img.src = cricketImageUrl;
                }
              }}
            />
          ) : (
            <div className="w-full h-48 sm:h-56 md:h-full bg-gradient-to-br from-green-900 to-green-800 flex items-center justify-center">
              <div className="text-center text-green-300">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2">📰</div>
                <p className="text-xs sm:text-sm md:text-base font-medium px-2">Cricket News</p>
              </div>
            </div>
          )}
        </div>
        
        {/* News Content */}
        <div className="w-full sm:w-3/5 md:w-2/3 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2 sm:mb-3">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-300 hover:text-green-200 transition-colors line-clamp-2 flex-1">
                {item.headline}
              </h3>
              {item.category && (
                <span className="bg-green-900/80 text-green-300 text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full sm:ml-2 flex-shrink-0 self-start">
                  {item.category}
                </span>
              )}
            </div>
            
            {item.subHeadline && (
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {item.subHeadline}
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 pt-3 border-t border-gray-700/50">
            <span className="text-gray-500 text-xs sm:text-sm md:text-base font-medium flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2 2z" />
              </svg>
              {new Date(item.publishedDate).toLocaleDateString()}
            </span>
            <Link 
              href={`/news/${item.newsId}`} 
              className="text-green-300 hover:text-green-400 active:text-green-500 text-sm sm:text-base md:text-lg font-semibold flex items-center gap-1 sm:gap-2 group transition-all duration-200"
            >
              Read More 
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};