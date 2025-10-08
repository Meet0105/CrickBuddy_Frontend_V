import React from 'react';

const DebugInfo = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
  const nodeEnv = process.env.NODE_ENV || 'development';

  return (
    <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/90 backdrop-blur-sm text-white p-2 sm:p-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-mono z-50 shadow-lg border border-gray-700/50 max-w-[90vw] sm:max-w-xs">
      <div className="flex items-center gap-1 sm:gap-2 mb-1">
        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-green-400 font-bold text-xs sm:text-sm">Debug</span>
      </div>
      <div className="space-y-0.5 sm:space-y-1">
        <div className="truncate"><span className="text-gray-400">API:</span> <span className="text-green-300">{apiUrl}</span></div>
        <div><span className="text-gray-400">ENV:</span> <span className="text-yellow-300">{nodeEnv}</span></div>
        <div><span className="text-gray-400">Time:</span> <span className="text-blue-300">{new Date().toLocaleTimeString()}</span></div>
      </div>
    </div>
  );
};

export default DebugInfo;