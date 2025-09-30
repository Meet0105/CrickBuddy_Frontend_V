import React from 'react';
import Link from 'next/link';
import { NewsItem } from './utils/newsTypes';

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <div key={item.newsId} className="bg-gray-800 hover:bg-gray-700 shadow-lg rounded-lg overflow-hidden transition">
      <div className="md:flex">
        {/* News Image */}
        <div className="md:w-1/3">
          {item.featuredImage?.url ? (
            <img 
              src={`https://via.placeholder.com/640x360/10b981/ffffff?text=Cricket+News`}
              alt={item.headline}
              className="w-full h-48 md:h-full object-cover"
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
            <div className="w-full h-48 md:h-full bg-gradient-to-br from-green-900 to-green-800 flex items-center justify-center">
              <div className="text-center text-green-300">
                <div className="text-4xl mb-2">📰</div>
                <p className="text-sm font-medium">Cricket News</p>
              </div>
            </div>
          )}
        </div>
        
        {/* News Content */}
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-green-300 line-clamp-2">{item.headline}</h3>
            {item.category && (
              <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-0.5 rounded ml-2 flex-shrink-0">
                {item.category}
              </span>
            )}
          </div>
          
          {item.subHeadline && (
            <p className="text-gray-400 mb-3 line-clamp-2">{item.subHeadline}</p>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">
              {new Date(item.publishedDate).toLocaleDateString()}
            </span>
            <Link 
              href={`/news/${item.newsId}`} 
              className="text-green-300 hover:text-green-400 text-sm font-medium flex items-center"
            >
              Read More 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};