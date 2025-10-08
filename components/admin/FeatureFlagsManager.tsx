import React, { useState, useEffect } from 'react';

interface FeatureFlag {
  name: string;
  enabled: boolean;
  description: string;
}

interface FeatureFlagsData {
  features: FeatureFlag[];
  rateLimits: {
    MAX_REQUESTS_PER_MINUTE: number;
    MAX_REQUESTS_PER_HOUR: number;
    RETRY_DELAY_MS: number;
    MAX_RETRIES: number;
  };
  cache: any;
  lastUpdated: string;
}

const FeatureFlagsManager: React.FC = () => {
  const [data, setData] = useState<FeatureFlagsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatureFlags = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/feature-flags');
      if (!response.ok) throw new Error('Failed to fetch feature flags');
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const updateFeatureFlag = async (flagName: string, enabled: boolean) => {
    try {
      setUpdating(flagName);
      const response = await fetch('/api/admin/feature-flags/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flagName, enabled })
      });

      if (!response.ok) throw new Error('Failed to update feature flag');
      
      // Refresh the data
      await fetchFeatureFlags();
      
      // Show success message
      alert(`Feature flag "${flagName}" ${enabled ? 'enabled' : 'disabled'} successfully`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setUpdating(null);
    }
  };

  const disableAll403Endpoints = async () => {
    const endpointsToDisable = [
      'ENABLE_UPCOMING_MATCHES_API',
      'ENABLE_LIVE_MATCHES_API', 
      'ENABLE_RECENT_MATCHES_API',
      'ENABLE_MATCH_COMMENTARY',
      'ENABLE_HISTORICAL_DATA',
      'ENABLE_OVERS_DATA'
    ];

    for (const endpoint of endpointsToDisable) {
      await updateFeatureFlag(endpoint, false);
    }
  };

  useEffect(() => {
    fetchFeatureFlags();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 sm:p-8">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-emerald-500"></div>
        <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-300">Loading feature flags...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="text-red-300 font-semibold text-base sm:text-lg mb-2">Error</h3>
        <p className="text-red-400 text-sm sm:text-base mb-4">{error}</p>
        <button 
          onClick={fetchFeatureFlags}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const getToggleColor = (enabled: boolean) => {
    return enabled 
      ? 'bg-green-600 border-green-600' 
      : 'bg-gray-300 border-gray-300';
  };

  const getCategoryColor = (flagName: string) => {
    if (flagName.includes('API')) return 'border-l-red-500';
    if (flagName.includes('COMMENTARY') || flagName.includes('HISTORICAL') || flagName.includes('OVERS')) return 'border-l-yellow-500';
    return 'border-l-blue-500';
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-100">Feature Flags Manager</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={fetchFeatureFlags}
            className="group px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button
            onClick={disableAll403Endpoints}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Disable 403 Endpoints
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-yellow-900/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-yellow-300 font-bold text-base sm:text-lg mb-2 sm:mb-3 flex items-center">
          <span className="text-lg sm:text-xl mr-2">⚠️</span> API Subscription Issues
        </h3>
        <p className="text-yellow-200 text-xs sm:text-sm mb-4">
          If you're getting 403 "Forbidden" errors, your RapidAPI subscription may not include certain endpoints. 
          Disable problematic features to use cached data instead.
        </p>
        <button
          onClick={disableAll403Endpoints}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Quick Fix: Disable All API-Dependent Features
        </button>
      </div>

      {/* Feature Flags List */}
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-700/50">
          <h3 className="text-base sm:text-lg font-bold text-gray-100">Feature Flags</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Enable or disable specific features to manage API usage</p>
        </div>

        <div className="divide-y divide-slate-700/50">
          {data.features.map((feature) => (
            <div key={feature.name} className={`p-4 sm:p-6 border-l-4 ${getCategoryColor(feature.name)} hover:bg-slate-700/30 transition-colors duration-200`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-100 truncate">{feature.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2">{feature.description}</p>
                  {feature.name.includes('API') && !feature.enabled && (
                    <span className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-900/40 text-emerald-300 mt-2 border border-emerald-500/30">
                      ✓ Using cached data
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 sm:ml-4">
                  <button
                    onClick={() => updateFeatureFlag(feature.name, !feature.enabled)}
                    disabled={updating === feature.name}
                    className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${getToggleColor(feature.enabled)} shadow-lg`}
                  >
                    <span
                      className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                        feature.enabled ? 'translate-x-6 sm:translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  {updating === feature.name && (
                    <div className="inline-block">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Rate Limits</h3>
          <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
            <p className="text-gray-300"><strong className="text-emerald-400">Per Minute:</strong> {data.rateLimits.MAX_REQUESTS_PER_MINUTE}</p>
            <p className="text-gray-300"><strong className="text-emerald-400">Per Hour:</strong> {data.rateLimits.MAX_REQUESTS_PER_HOUR}</p>
            <p className="text-gray-300"><strong className="text-emerald-400">Retry Delay:</strong> {data.rateLimits.RETRY_DELAY_MS}ms</p>
            <p className="text-gray-300"><strong className="text-emerald-400">Max Retries:</strong> {data.rateLimits.MAX_RETRIES}</p>
          </div>
        </div>

        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Status</h3>
          <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
            <p className="text-gray-300"><strong className="text-emerald-400">Total Features:</strong> {data.features.length}</p>
            <p className="text-gray-300"><strong className="text-emerald-400">Enabled:</strong> <span className="text-green-400">{data.features.filter(f => f.enabled).length}</span></p>
            <p className="text-gray-300"><strong className="text-emerald-400">Disabled:</strong> <span className="text-red-400">{data.features.filter(f => !f.enabled).length}</span></p>
            <p className="text-gray-300"><strong className="text-emerald-400">Last Updated:</strong> {new Date(data.lastUpdated).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureFlagsManager;