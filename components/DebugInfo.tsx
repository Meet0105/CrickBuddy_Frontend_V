import React from 'react';

const DebugInfo = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
  const nodeEnv = process.env.NODE_ENV || 'development';

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div>API: {apiUrl}</div>
      <div>ENV: {nodeEnv}</div>
      <div>Time: {new Date().toLocaleTimeString()}</div>
    </div>
  );
};

export default DebugInfo;