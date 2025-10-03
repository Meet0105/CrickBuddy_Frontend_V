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
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading feature flags...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchFeatureFlags}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Feature Flags Manager</h2>
        <div className="flex space-x-3">
          <button
            onClick={fetchFeatureFlags}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
          <button
            onClick={disableAll403Endpoints}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Disable 403 Endpoints
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-yellow-800 font-medium mb-2">⚠️ API Subscription Issues</h3>
        <p className="text-yellow-700 text-sm mb-3">
          If you're getting 403 "Forbidden" errors, your RapidAPI subscription may not include certain endpoints. 
          Disable problematic features to use cached data instead.
        </p>
        <button
          onClick={disableAll403Endpoints}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
        >
          Quick Fix: Disable All API-Dependent Features
        </button>
      </div>

      {/* Feature Flags List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Feature Flags</h3>
          <p className="text-sm text-gray-600">Enable or disable specific features to manage API usage</p>
        </div>

        <div className="divide-y divide-gray-200">
          {data.features.map((feature) => (
            <div key={feature.name} className={`p-6 border-l-4 ${getCategoryColor(feature.name)}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{feature.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  {feature.name.includes('API') && !feature.enabled && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                      Using cached data
                    </span>
                  )}
                </div>
                
                <div className="ml-4">
                  <button
                    onClick={() => updateFeatureFlag(feature.name, !feature.enabled)}
                    disabled={updating === feature.name}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${getToggleColor(feature.enabled)}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        feature.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  {updating === feature.name && (
                    <div className="ml-2 inline-block">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limits</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Per Minute:</strong> {data.rateLimits.MAX_REQUESTS_PER_MINUTE}</p>
            <p><strong>Per Hour:</strong> {data.rateLimits.MAX_REQUESTS_PER_HOUR}</p>
            <p><strong>Retry Delay:</strong> {data.rateLimits.RETRY_DELAY_MS}ms</p>
            <p><strong>Max Retries:</strong> {data.rateLimits.MAX_RETRIES}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Total Features:</strong> {data.features.length}</p>
            <p><strong>Enabled:</strong> {data.features.filter(f => f.enabled).length}</p>
            <p><strong>Disabled:</strong> {data.features.filter(f => !f.enabled).length}</p>
            <p><strong>Last Updated:</strong> {new Date(data.lastUpdated).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureFlagsManager;