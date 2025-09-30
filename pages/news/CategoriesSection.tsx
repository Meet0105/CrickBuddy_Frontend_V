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
    <div className="mb-8">
      <h2 className="text-lg font-bold text-green-400 mb-3">News Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/news/category/${category.id}`}
            className="bg-green-900 hover:bg-green-800 text-green-300 px-3 py-1 rounded-full text-sm font-medium transition"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};