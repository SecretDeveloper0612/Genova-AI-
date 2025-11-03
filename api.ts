import { User, Plan, GalleryItem, Job, Asset } from './types';

// In a real app, this would be an environment variable
const API_BASE_URL = '/api'; 

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || `API error: ${response.statusText}`);
  }

  if (response.status === 204) { // No Content
    return;
  }
  
  return response.json();
}

// Auth
export const login = (email: string, password: string): Promise<{ token: string }> => 
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

// User
export const getMe = (): Promise<User> => apiFetch('/me');
export const updateProfile = (profileData: { display_name?: string; email?: string }): Promise<User> =>
  apiFetch('/me/profile', { method: 'PUT', body: JSON.stringify(profileData) });

// Generation and Editing
export const createGenerationJob = (params: { prompt: string, negative_prompt?: string, params: object }): Promise<Job> =>
  apiFetch('/generate', { method: 'POST', body: JSON.stringify(params) });
  
export const createEditJob = (params: { input_asset_id: string, edit_type: string, params: object }): Promise<Job> =>
  apiFetch('/edit', { method: 'POST', body: JSON.stringify(params) });

export const uploadAsset = (file: File): Promise<{ asset_id: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    return apiFetch('/upload', {
        method: 'POST',
        body: formData,
        headers: {
            // Let the browser set the content-type for multipart/form-data
            'Content-Type': undefined, 
        }
    });
};

export const getJob = (jobId: string): Promise<Job> => apiFetch(`/jobs/${jobId}`);
export const getAsset = (assetId: string): Promise<Asset> => apiFetch(`/assets/${assetId}`);

// Gallery
export const getGallery = (): Promise<GalleryItem[]> => apiFetch('/gallery/mine');

// Billing
export const getPlans = (): Promise<Plan[]> => apiFetch('/billing/plans');
