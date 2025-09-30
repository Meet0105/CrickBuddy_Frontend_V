import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

type NewsItem = {
  newsId: string;
  headline: string;
  subHeadline?: string;
  publishedDate: string;
  category: string;
  featuredImage?: {
    url: string;
  };
};

type Category = {
  id: string;
  name: string;
  description?: string;
};

export default function NewsCategory({ news, category, error }: { news: NewsItem[]; category: Category; error?: string }) {
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-green-400">News Category</h1>
            <Link href="/news" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
              ← Back to News
            </Link>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">Rate Limit Exceeded</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <p className="text-gray-500 text-sm mb-4">Please wait a few minutes before trying again.</p>
            <Link href="/news" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to News
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">News Category: {category?.name || 'Category'}</h1>
          <Link href="/news" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
            ← Back to News
          </Link>
        </div>
        
        {category?.description && (
          <div className="bg-gray-800 rounded-lg shadow p-4 mb-6 border border-gray-700">
            <p className="text-gray-300">{category.description}</p>
          </div>
        )}
        
        {news && news.length > 0 ? (
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.newsId} className="bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-xl transition border border-gray-700">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-100">{item.headline}</h3>
                    {item.category && (
                      <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    )}
                  </div>
                  
                  {item.subHeadline && (
                    <p className="text-gray-400 mb-3">{item.subHeadline}</p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      {new Date(item.publishedDate).toLocaleDateString()}
                    </span>
                    <Link 
                      href={`/news/${item.newsId}`} 
                      className="text-green-400 hover:text-green-300 text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
            <div className="text-5xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">No News in this Category</h3>
            <p className="text-gray-400 mb-4">There are currently no news articles in this category. Please check back later!</p>
            <Link href="/news" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to News
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Fetch news by category
    const newsRes = await axios.get(`${apiUrl}/api/news/category-id/${params.id}`);
    const news = Array.isArray(newsRes.data.news) ? newsRes.data.news : [];
    
    // For now, we'll use a placeholder category since we don't have a specific endpoint for category details
    const category = {
      id: params.id,
      name: `Category ${params.id}`,
      description: `News articles in category ${params.id}`
    };
    
    return { props: { news, category } };
  } catch (error: any) {
    console.error('Error fetching news by category:', error);
    
    // Handle rate limiting errors
    if (error.response?.status === 429) {
      return { 
        props: { 
          news: [], 
          category: { id: params.id, name: 'Category', description: '' },
          error: 'API rate limit exceeded. Please try again in a few minutes.' 
        } 
      };
    }
    
    // Handle other errors
    return { props: { news: [], category: { id: params.id, name: 'Category', description: '' }, error: 'Failed to load news. Please try again later.' } };
  }
}