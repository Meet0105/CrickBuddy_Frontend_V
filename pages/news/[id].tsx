import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

type NewsItem = {
  newsId: string;
  headline: string;
  subHeadline?: string;
  content: string;
  author: {
    name: string;
  };
  publishedDate: string;
  category: string;
  readTime: number;
  featuredImage?: {
    url: string;
    caption: string;
  };
};

type Photo = {
  id: string;
  imageUrl: string;
  caption: string;
};

export default function NewsDetails({ news, photos }: { news: NewsItem, photos: Photo[] }) {
  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
        <Navbar />
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center border border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">📰</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">News Not Found</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2">The requested news article could not be found.</p>
            <Link href="/news" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to News
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Function to construct image URL for photos
  const getPhotoUrl = (imageId: string) => {
    if (imageId) {
      // Use our photo API to serve the image
      return `/api/photos/image/${imageId}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400">Cricket News</h1>
          <Link href="/news" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </Link>
        </div>
        
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-700">
          {news.featuredImage?.url && (
            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
              <img 
                src={`https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,t_ds_h_675/lsci/db/PICTURES/CMS/${Math.floor(parseInt(news.featuredImage.url) / 1000) * 1000}/${news.featuredImage.url}.jpg`}
                alt={news.headline}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/1200x675/10b981/ffffff?text=Cricket+News`;
                }}
              />
              {news.featuredImage.caption && (
                <p className="text-gray-400 text-xs sm:text-sm p-2 sm:p-3 bg-gray-900 border-t border-gray-700">{news.featuredImage.caption}</p>
              )}
            </div>
          )}
          
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 break-words flex-1">{news.headline}</h1>
              <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0">
                {news.category}
              </span>
            </div>
            
            {news.subHeadline && (
              <p className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">{news.subHeadline}</p>
            )}
            
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 gap-2">
              <span>By {news.author.name}</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span>{new Date(news.publishedDate).toLocaleDateString()}</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span>{news.readTime} min read</span>
            </div>
            
            <div className="prose prose-invert max-w-none text-sm sm:text-base text-gray-300 whitespace-pre-line leading-relaxed">
              <p>{news.content}</p>
            </div>
          </div>
        </div>

        {/* Photo Gallery Section */}
        {photos && photos.length > 0 && (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mt-6 sm:mt-8 border border-gray-700">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-4 sm:mb-6">Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="overflow-hidden rounded-lg sm:rounded-xl">
                  {photo.imageUrl ? (
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.caption || news.headline}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <img 
                      src={getPhotoUrl(photo.id)} 
                      alt={photo.caption || news.headline}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  {photo.caption && (
                    <p className="text-gray-400 text-xs sm:text-sm p-2 bg-gray-900 border-t border-gray-700 line-clamp-2">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    
    // Fetch news details
    const newsRes = await axios.get(`${apiUrl}/api/news/${params.id}`);
    const news = newsRes.data;
    
    // Fetch photo gallery for this news (using a placeholder ID for now)
    // In a real implementation, you would extract the gallery ID from the news data
    let photos = [];
    try {
      const photosRes = await axios.get(`${apiUrl}/api/news/photo-gallery/6050`);
      photos = Array.isArray(photosRes.data.photoGalleryDetails) ? 
        photosRes.data.photoGalleryDetails.map((photo: any) => ({
          id: photo.imageId,
          imageUrl: `/api/photos/image/${photo.imageId}`,
          caption: photo.caption
        })) : [];
    } catch (error) {
      console.log('Error fetching photo gallery:', error);
    }
    
    return { 
      props: { 
        news,
        photos: Array.isArray(photos) ? photos.slice(0, 9) : [] // Limit to 9 photos
      } 
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { props: { news: null, photos: [] } };
  }
}