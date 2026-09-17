// Centralized API Configuration for iTopper Frontend
// All API endpoints across the application use this single source of truth.

const RAW_API_URL = import.meta.env.VITE_API_URL || 'https://itopperbackend.vercel.app';

// Ensure trailing slashes are removed to avoid double slashes in request paths
export const API_BASE_URL = RAW_API_URL.replace(/\/+$/, '');

/**
 * Constructs a clean API URL for any given path or endpoint
 * @param {string} endpoint - Path like '/api/courses' or 'api/auth/login'
 * @returns {string} - Full absolute URL e.g. 'https://itopperbackend.vercel.app/api/courses'
 */
export const getApiUrl = (endpoint = '') => {
  if (!endpoint) return API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default API_BASE_URL;
