import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavItemType } from '../../types';
import { LogoIcon, GenerateIcon, EditIcon, GalleryIcon, SubscriptionIcon, SettingsIcon, XIcon } from '../icons';

interface SidebarProps {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const navItems: NavItemType[] = [
  { name: 'Generate', path: '/app/generate', icon: GenerateIcon },
  { name: 'Edit', path: '/app/edit', icon: EditIcon },
  { name: 'My Library', path: '/app/gallery', icon: GalleryIcon },
  { name: 'Subscription', path: '/app/subscription', icon: SubscriptionIcon },
  { name: 'Settings', path: '/app/settings', icon: SettingsIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setCollapsed, isMobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleMobileNavClick = () => {
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col justify-between p-4 h-full">
      <div>
        <div className={`flex items-center mb-10 space-x-2 ${isCollapsed && !isMobileOpen ? 'justify-center' : ''}`}>
          <LogoIcon className="h-8 w-8 text-brand-yellow flex-shrink-0" />
          {(!isCollapsed || isMobileOpen) && <span className="text-xl font-bold text-white">Nano Banana</span>}
           <button onClick={() => setMobileOpen(false)} className="lg:hidden ml-auto text-white">
             <XIcon className="h-6 w-6" />
           </button>
        </div>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleMobileNavClick}
              className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-brand-yellow text-brand-dark'
                  : 'text-brand-text hover:bg-brand-gray hover:text-white'
              } ${isCollapsed && !isMobileOpen ? 'justify-center' : ''}`}
            >
              <item.icon className="h-6 w-6 flex-shrink-0" />
              {(!isCollapsed || isMobileOpen) && <span className="ml-4 font-semibold">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <button 
        onClick={() => setCollapsed(!isCollapsed)} 
        className={`hidden lg:flex items-center w-full py-3 px-4 rounded-lg text-brand-text hover:bg-brand-gray hover:text-white transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
        {!isCollapsed && <span className="ml-4 font-semibold">Collapse</span>}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div
        className={`fixed lg:hidden top-0 left-0 h-full bg-brand-gray-dark z-50 transition-transform duration-300 ease-in-out w-64 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col transition-all duration-300 ease-in-out bg-brand-gray-dark ${isCollapsed ? 'w-24' : 'w-64'}`}>
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;