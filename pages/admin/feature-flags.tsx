import React from 'react';
import Head from 'next/head';
import FeatureFlagsManager from '../../components/admin/FeatureFlagsManager';

const FeatureFlagsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Feature Flags - Cricket App Admin</title>
        <meta name="description" content="Manage API feature flags and handle subscription limitations" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <FeatureFlagsManager />
        </div>
      </div>
    </>
  );
};

export default FeatureFlagsPage;