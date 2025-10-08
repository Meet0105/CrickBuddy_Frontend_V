import React from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}
export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4 md:px-0">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-400 mb-3 sm:mb-4 md:mb-5">
        News Categories
      </h2>
      <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/news/category/${category.id}`}
            className="bg-green-900/90 hover:bg-green-800 active:bg-green-700 text-green-300 hover:text-green-200 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 min-w-[60px] sm:min-w-[70px] text-center"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};