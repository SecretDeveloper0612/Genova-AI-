import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import * as api from '../api';

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.profile.display_name);
      setEmail(user.email);
    }
  }, [user]);
  
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const updatedUser = await api.updateProfile({ display_name: displayName, email });
      updateUser(updatedUser);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow"></div>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Settings</h1>

      <div className="space-y-12">
        {/* Profile Settings */}
        <form onSubmit={handleProfileSave} className="bg-brand-gray-dark p-4 sm:p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 border-b border-brand-gray pb-4">Profile</h2>
          {successMessage && <div className="mb-4 p-3 rounded-lg bg-green-500/20 text-green-300">{successMessage}</div>}
          {errorMessage && <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-300">{errorMessage}</div>}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-full sm:w-1/4 text-brand-text mb-2 sm:mb-0">Name</label>
              <input 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full sm:w-3/4 bg-brand-gray p-2 rounded-lg border border-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-yellow" 
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="w-full sm:w-1/4 text-brand-text mb-2 sm:mb-0">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-3/4 bg-brand-gray p-2 rounded-lg border border-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-yellow" 
              />
            </div>
            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-brand-yellow text-brand-dark font-bold py-2 px-6 rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>

        {/* Notification Settings */}
        <div className="bg-brand-gray-dark p-4 sm:p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 border-b border-brand-gray pb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-brand-text">Email Notifications</span>
               <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                <div className="w-11 h-6 bg-brand-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-yellow"></div>
              </label>
            </div>
             <div className="flex items-center justify-between">
              <span className="text-brand-text">Weekly Newsletter</span>
               <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"/>
                <div className="w-11 h-6 bg-brand-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-yellow"></div>
              </label>
            </div>
          </div>
        </div>
        
         {/* Danger Zone */}
        <div className="bg-brand-gray-dark p-4 sm:p-6 rounded-2xl border border-red-500/50">
          <h2 className="text-2xl font-semibold mb-2 text-red-400">Danger Zone</h2>
           <p className="text-brand-text mb-6">These actions are permanent and cannot be undone.</p>
           <button className="w-full sm:w-auto bg-red-600/80 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
