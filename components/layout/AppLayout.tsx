import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MenuIcon } from '../icons';
import { useAuth } from '../../AuthContext';

const pageTitles: { [key: string]: string } = {
  '/app/generate': 'AI Image Generation',
  '/app/edit': 'AI Image Editor',
  '/app/gallery': 'My Gallery',
  '/app/subscription': 'Subscription',
  '/app/settings': 'Settings',
};

const AppLayout: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentPageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="flex h-screen bg-brand-dark font-sans">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        isMobileOpen={isMobileNavOpen}
        setMobileOpen={setMobileNavOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 border-b border-brand-gray bg-brand-dark text-white">
            <div className='flex items-center space-x-2'>
                <button
                    className="p-2 rounded-full hover:bg-brand-gray lg:hidden"
                    onClick={() => setMobileNavOpen(true)}
                    aria-label="Open navigation"
                >
                    <MenuIcon className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-bold">{currentPageTitle}</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="p-2 rounded-full hover:bg-brand-gray hidden sm:block">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <button className="p-2 rounded-full hover:bg-brand-gray relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                <div className="relative">
                    <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2">
                        <img className="h-8 w-8 rounded-full" src={user?.profile.avatar_url || 'https://i.pravatar.cc/40'} alt="User avatar" />
                        <span className="hidden md:block font-semibold">{user?.profile.display_name}</span>
                    </button>
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-brand-gray-dark rounded-md shadow-lg py-1 z-10">
                            <a href="#/app/settings" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-brand-gray">Settings</a>
                            <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-brand-gray">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
