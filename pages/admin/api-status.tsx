import React from 'react';
import Head from 'next/head';
import ApiConfigDashboard from '../../components/admin/ApiConfigDashboard';

const ApiStatusPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>API Status Dashboard - Cricket App Admin</title>
        <meta name="description" content="Monitor API usage and rate limiting status" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ApiConfigDashboard />
        </div>
      </div>
    </>
  );
};

export default ApiStatusPage;