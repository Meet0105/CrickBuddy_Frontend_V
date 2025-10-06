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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
            <div className="text-5xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">News Not Found</h3>
            <p className="text-gray-400 mb-4">The requested news article could not be found.</p>
            <Link href="/news" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">Cricket News</h1>
          <Link href="/news" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
            ← Back to News
          </Link>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          {news.featuredImage?.url && (
            <div className="w-full h-64 md:h-96 overflow-hidden">
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
                <p className="text-gray-400 text-sm p-3 bg-gray-900 border-t border-gray-700">{news.featuredImage.caption}</p>
              )}
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-100">{news.headline}</h1>
              <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {news.category}
              </span>
            </div>
            
            {news.subHeadline && (
              <p className="text-gray-400 text-lg mb-4">{news.subHeadline}</p>
            )}
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span>By {news.author.name}</span>
              <span className="mx-2">•</span>
              <span>{new Date(news.publishedDate).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{news.readTime} min read</span>
            </div>
            
            <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-line">
              <p>{news.content}</p>
            </div>
          </div>
        </div>

        {/* Photo Gallery Section */}
        {photos && photos.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 border border-gray-700">
            <h2 className="text-xl font-bold text-green-400 mb-4">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="overflow-hidden rounded-lg">
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
                    <p className="text-gray-400 text-sm p-2 bg-gray-900 border-t border-gray-700">{photo.caption}</p>
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