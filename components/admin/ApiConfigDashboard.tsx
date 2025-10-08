import React, { useState, useEffect } from 'react';

interface RateLimitStatus {
  requestsThisMinute: number;
  requestsThisHour: number;
  maxPerMinute: number;
  maxPerHour: number;
  canMakeRequest: boolean;
}

interface ApiStatus {
  rateLimitStatus: RateLimitStatus;
  recommendations: {
    canMakeRequest: boolean;
    requestsRemaining: {
      thisMinute: number;
      thisHour: number;
    };
    utilizationPercentage: {
      minute: number;
      hour: number;
    };
  };
  timestamp: string;
}

const ApiConfigDashboard: React.FC = () => {
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/rate-limit-status');
      if (!response.ok) throw new Error('Failed to fetch API status');
      const data = await response.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    if (percentage >= 50) return 'text-blue-600 bg-blue-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusColor = (canMakeRequest: boolean) => {
    return canMakeRequest 
      ? 'text-green-600 bg-green-50 border-green-200' 
      : 'text-red-600 bg-red-50 border-red-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 sm:p-8">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-emerald-500"></div>
        <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-300">Loading API status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="text-red-300 font-semibold text-base sm:text-lg mb-2">Error</h3>
        <p className="text-red-400 text-sm sm:text-base mb-4">{error}</p>
        <button 
          onClick={fetchStatus}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!status) return null;

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-100">API Configuration & Status</h2>
        <button
          onClick={fetchStatus}
          className="group px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
        >
          <svg className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border backdrop-blur-sm transition-all duration-300 ${getStatusColor(status.rateLimitStatus.canMakeRequest)}`}>
          <h3 className="font-semibold text-sm sm:text-base mb-2">API Status</h3>
          <p className="text-xl sm:text-2xl font-black">
            {status.rateLimitStatus.canMakeRequest ? 'Available' : 'Limited'}
          </p>
        </div>

        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300">
          <h3 className="font-semibold text-gray-300 text-sm sm:text-base mb-2">Requests This Minute</h3>
          <p className="text-xl sm:text-2xl font-black text-gray-100">
            {status.rateLimitStatus.requestsThisMinute}/{status.rateLimitStatus.maxPerMinute}
          </p>
          <div className="w-full bg-slate-700 rounded-full h-2 sm:h-2.5 mt-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 sm:h-2.5 rounded-full transition-all duration-500"
              style={{ 
                width: `${(status.rateLimitStatus.requestsThisMinute / status.rateLimitStatus.maxPerMinute) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300">
          <h3 className="font-semibold text-gray-300 text-sm sm:text-base mb-2">Requests This Hour</h3>
          <p className="text-xl sm:text-2xl font-black text-gray-100">
            {status.rateLimitStatus.requestsThisHour}/{status.rateLimitStatus.maxPerHour}
          </p>
          <div className="w-full bg-slate-700 rounded-full h-2 sm:h-2.5 mt-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 sm:h-2.5 rounded-full transition-all duration-500"
              style={{ 
                width: `${(status.rateLimitStatus.requestsThisHour / status.rateLimitStatus.maxPerHour) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300">
          <h3 className="font-semibold text-gray-300 text-sm sm:text-base mb-3">Remaining Requests</h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-1">This Minute: <span className="text-emerald-400 font-bold">{status.recommendations.requestsRemaining.thisMinute}</span></p>
          <p className="text-xs sm:text-sm text-gray-400">This Hour: <span className="text-emerald-400 font-bold">{status.recommendations.requestsRemaining.thisHour}</span></p>
        </div>
      </div>

      {/* Utilization Metrics */}
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-4 sm:mb-6">API Utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs sm:text-sm font-medium text-gray-300">Minute Utilization</span>
              <span className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full ${getUtilizationColor(status.recommendations.utilizationPercentage.minute)}`}>
                {status.recommendations.utilizationPercentage.minute}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 sm:h-4">
              <div
                className={`h-3 sm:h-4 rounded-full transition-all duration-500 shadow-lg ${
                  status.recommendations.utilizationPercentage.minute >= 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  status.recommendations.utilizationPercentage.minute >= 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                  status.recommendations.utilizationPercentage.minute >= 50 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                }`}
                style={{ width: `${status.recommendations.utilizationPercentage.minute}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs sm:text-sm font-medium text-gray-300">Hour Utilization</span>
              <span className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full ${getUtilizationColor(status.recommendations.utilizationPercentage.hour)}`}>
                {status.recommendations.utilizationPercentage.hour}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 sm:h-4">
              <div
                className={`h-3 sm:h-4 rounded-full transition-all duration-500 shadow-lg ${
                  status.recommendations.utilizationPercentage.hour >= 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  status.recommendations.utilizationPercentage.hour >= 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                  status.recommendations.utilizationPercentage.hour >= 50 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                }`}
                style={{ width: `${status.recommendations.utilizationPercentage.hour}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-blue-300 mb-3 sm:mb-4 flex items-center">
          <span className="text-lg sm:text-xl mr-2">💡</span> Recommendations
        </h3>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-200">
          {status.recommendations.utilizationPercentage.minute > 80 && (
            <p>⚠️ High minute utilization detected. Consider reducing API call frequency.</p>
          )}
          {status.recommendations.utilizationPercentage.hour > 80 && (
            <p>⚠️ High hourly utilization detected. Monitor usage closely to avoid hitting limits.</p>
          )}
          {!status.rateLimitStatus.canMakeRequest && (
            <p>🚫 API requests are currently blocked due to rate limiting. Wait before making more requests.</p>
          )}
          {status.rateLimitStatus.canMakeRequest && status.recommendations.utilizationPercentage.minute < 50 && (
            <p>✅ API usage is within safe limits. Normal operations can continue.</p>
          )}
        </div>
      </div>

      {/* Current Configuration */}
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Current Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="space-y-2">
            <p className="text-gray-300"><strong className="text-emerald-400">Max Requests/Minute:</strong> {status.rateLimitStatus.maxPerMinute}</p>
            <p className="text-gray-300"><strong className="text-emerald-400">Max Requests/Hour:</strong> {status.rateLimitStatus.maxPerHour}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300"><strong className="text-emerald-400">Last Updated:</strong> {new Date(status.timestamp).toLocaleString()}</p>
            <p className="text-gray-300"><strong className="text-emerald-400">Auto-refresh:</strong> Every 30 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConfigDashboard;