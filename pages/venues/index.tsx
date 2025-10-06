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
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">Cricket Venues</h1>
          <Link href="/" className="text-green-300 hover:text-green-400 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        {venues && venues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => (
              <div key={venue.venueId} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-lg font-bold text-white mb-2">{venue.name}</h3>
                {venue.location && (
                  <p className="text-gray-300 text-sm mb-2">Location: {venue.location}</p>
                )}
                {venue.capacity && (
                  <p className="text-gray-300 text-sm mb-3">Capacity: {venue.capacity.toLocaleString()}</p>
                )}
                <Link 
                  href={`/venues/${venue.venueId}`} 
                  className="text-green-300 hover:text-green-400 text-sm font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4 text-green-400">🏟️</div>
            <h3 className="text-xl font-bold text-white mb-2">No Venues Available</h3>
            <p className="text-gray-300 mb-4">Venue data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
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
