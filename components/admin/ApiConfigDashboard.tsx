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
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading API status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchStatus}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!status) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">API Configuration & Status</h2>
        <button
          onClick={fetchStatus}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg border ${getStatusColor(status.rateLimitStatus.canMakeRequest)}`}>
          <h3 className="font-semibold">API Status</h3>
          <p className="text-2xl font-bold">
            {status.rateLimitStatus.canMakeRequest ? 'Available' : 'Limited'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700">Requests This Minute</h3>
          <p className="text-2xl font-bold text-gray-900">
            {status.rateLimitStatus.requestsThisMinute}/{status.rateLimitStatus.maxPerMinute}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ 
                width: `${(status.rateLimitStatus.requestsThisMinute / status.rateLimitStatus.maxPerMinute) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700">Requests This Hour</h3>
          <p className="text-2xl font-bold text-gray-900">
            {status.rateLimitStatus.requestsThisHour}/{status.rateLimitStatus.maxPerHour}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ 
                width: `${(status.rateLimitStatus.requestsThisHour / status.rateLimitStatus.maxPerHour) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700">Remaining Requests</h3>
          <p className="text-sm text-gray-600">This Minute: {status.recommendations.requestsRemaining.thisMinute}</p>
          <p className="text-sm text-gray-600">This Hour: {status.recommendations.requestsRemaining.thisHour}</p>
        </div>
      </div>

      {/* Utilization Metrics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Minute Utilization</span>
              <span className={`text-sm font-bold px-2 py-1 rounded ${getUtilizationColor(status.recommendations.utilizationPercentage.minute)}`}>
                {status.recommendations.utilizationPercentage.minute}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  status.recommendations.utilizationPercentage.minute >= 90 ? 'bg-red-500' :
                  status.recommendations.utilizationPercentage.minute >= 70 ? 'bg-yellow-500' :
                  status.recommendations.utilizationPercentage.minute >= 50 ? 'bg-blue-500' : 'bg-green-500'
                }`}
                style={{ width: `${status.recommendations.utilizationPercentage.minute}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Hour Utilization</span>
              <span className={`text-sm font-bold px-2 py-1 rounded ${getUtilizationColor(status.recommendations.utilizationPercentage.hour)}`}>
                {status.recommendations.utilizationPercentage.hour}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  status.recommendations.utilizationPercentage.hour >= 90 ? 'bg-red-500' :
                  status.recommendations.utilizationPercentage.hour >= 70 ? 'bg-yellow-500' :
                  status.recommendations.utilizationPercentage.hour >= 50 ? 'bg-blue-500' : 'bg-green-500'
                }`}
                style={{ width: `${status.recommendations.utilizationPercentage.hour}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Recommendations</h3>
        <div className="space-y-2 text-sm text-blue-800">
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
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Max Requests/Minute:</strong> {status.rateLimitStatus.maxPerMinute}</p>
            <p><strong>Max Requests/Hour:</strong> {status.rateLimitStatus.maxPerHour}</p>
          </div>
          <div>
            <p><strong>Last Updated:</strong> {new Date(status.timestamp).toLocaleString()}</p>
            <p><strong>Auto-refresh:</strong> Every 30 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConfigDashboard;