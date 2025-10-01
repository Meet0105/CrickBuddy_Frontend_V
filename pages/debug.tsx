import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function DebugPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        console.log('Fetching from:', `${apiUrl}/api/matches?format=ODI`);
        
        const response = await axios.get(`${apiUrl}/api/matches?format=ODI`);
        console.log('Response data:', response.data);
        
        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Debug Page</h1>
        
        {loading && <p>Loading...</p>}
        
        {error && (
          <div className="bg-red-900 text-red-100 p-4 rounded mb-4">
            <h2 className="text-xl font-bold mb-2">Error:</h2>
            <p>{error}</p>
          </div>
        )}
        
        {data && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">API Response Data:</h2>
            <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}