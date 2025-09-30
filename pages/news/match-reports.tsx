import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

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

export default function MatchReports({ news }: { news: NewsItem[] }) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400 mb-6">Match Reports</h1>
          <Link href="/news" className="text-green-300 hover:text-green-400 text-sm font-medium">
            ← Back to News
          </Link>
        </div>
        
        {news && news.length > 0 ? (
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.newsId} className="bg-gray-800 hover:bg-gray-700 shadow-lg rounded-lg overflow-hidden transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-green-300">{item.headline}</h3>
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
                      className="text-green-300 hover:text-green-400 text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 text-gray-400 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">No Match Reports Available</h3>
            <p className="mb-4">Match report data is currently being synced. Please check back later!</p>
            <Link href="/news" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to News
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    // Fetch news and filter for match reports
    const res = await axios.get(`${apiUrl}/api/news`);
    
    // Handle different response formats
    let allNews = [];
    if (Array.isArray(res.data)) {
      allNews = res.data;
    } else if (res.data.news && Array.isArray(res.data.news)) {
      allNews = res.data.news;
    }
    
    // Filter for match reports
    const matchReports = allNews.filter((item: NewsItem) => 
      item.category === 'MATCH_REPORT' || 
      item.headline.toLowerCase().includes('match') ||
      item.headline.toLowerCase().includes('report')
    );
    return { props: { news: matchReports } };
  } catch (error) {
    console.error('Error fetching match reports:', error);
    return { props: { news: [] } };
  }
}