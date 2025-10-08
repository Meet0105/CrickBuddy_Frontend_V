import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

type Venue = {
  venueId: string;
  name: string;
  location?: string;
  capacity?: number;
};

export default function Venues({ venues }: { venues: Venue[] }) {
  return (
    <div className="min-h-screen bg-gray-900 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400 flex items-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            Cricket Venues
          </h1>
          <Link href="/" className="group text-green-300 hover:text-green-400 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        {venues && venues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {venues.map((venue) => (
              <div key={venue.venueId} className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-purple-400 hover:scale-105">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 truncate">{venue.name}</h3>
                {venue.location && (
                  <p className="text-gray-300 text-xs sm:text-sm mb-2"><span className="font-medium text-green-400">Location:</span> {venue.location}</p>
                )}
                {venue.capacity && (
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4"><span className="font-medium text-green-400">Capacity:</span> {venue.capacity.toLocaleString()}</p>
                )}
                <Link 
                  href={`/venues/${venue.venueId}`} 
                  className="group text-green-300 hover:text-green-400 text-xs sm:text-sm font-medium flex items-center"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center border border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 text-green-400">🏟️</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 px-2">No Venues Available</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 px-2 max-w-md mx-auto">Venue data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    // For now, we'll use placeholder data since we don't have a direct list endpoint
    // In a real implementation, you would fetch this from your API
    const venues = [
      { venueId: "45", name: "Basin Reserve", location: "Wellington, New Zealand", capacity: 11600 },
      { venueId: "24", name: "Melbourne Cricket Ground", location: "Melbourne, Australia", capacity: 100024 },
      { venueId: "30", name: "Lord's Cricket Ground", location: "London, England", capacity: 31100 },
      { venueId: "50", name: "Eden Gardens", location: "Kolkata, India", capacity: 68000 },
      { venueId: "15", name: "Sydney Cricket Ground", location: "Sydney, Australia", capacity: 48700 }
    ];
    return { props: { venues } };
  } catch (error) {
    console.error('Error fetching venues:', error);
    return { props: { venues: [] } };
  }
}
