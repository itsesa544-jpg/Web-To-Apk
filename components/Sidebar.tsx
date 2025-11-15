import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { HomeIcon } from './icons/HomeIcon';
import { PlusIcon } from './icons/PlusIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { ChatIcon } from './icons/ChatIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { View, AppData } from '../App';
import { BuildDownloadIcon } from './icons/BuildDownloadIcon';
import { useAuth } from '../AuthContext';
import { logout } from '../firebase';


const NavItem = ({ icon, label, active = false, special = false, onClick = () => {} }) => (
  <li>
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center h-14 w-14 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4338CA] ${
        active
          ? 'bg-[#4338CA] text-white shadow-lg'
          : special
          ? 'bg-[#FEE2E2] text-[#DC2626]'
          : 'text-gray-400 hover:bg-slate-100'
      }`}
    >
      <div className="w-7 h-7">{icon}</div>
    </button>
  </li>
);

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View, app?: AppData) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const { currentUser } = useAuth();
  
  return (
    <aside className="bg-white w-24 flex flex-col items-center py-8 shadow-lg z-10">
        <div className="w-10 h-10 mb-12">
            <a href="#" aria-label="App Logo" onClick={(e) => { e.preventDefault(); onNavigate('dashboard');}}><LogoIcon /></a>
        </div>
        <nav className="flex-grow">
            <ul className="space-y-6">
                <NavItem icon={<HomeIcon />} label="Home" active={activeView === 'dashboard'} onClick={() => onNavigate('dashboard')} />
                <NavItem icon={<PlusIcon />} label="Create New App" active={activeView === 'createApp'} onClick={() => onNavigate('createApp')} />
                <NavItem icon={<BuildDownloadIcon />} label="Build & Download" active={activeView === 'build'} onClick={() => onNavigate('build')} />
                <NavItem icon={<SettingsIcon />} label="Settings" active={activeView === 'settings'} onClick={() => onNavigate('settings')} />
            </ul>
        </nav>
        <div className="space-y-6 flex flex-col items-center">
             {currentUser && (
                  <img
                    src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'U')}&background=random&color=fff`}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full border-2 border-slate-200"
                    title={currentUser.displayName || 'User'}
                  />
                )}
            <NavItem icon={<ChatIcon />} label="Support Chat" />
            <NavItem icon={<LogoutIcon />} label="Logout" special onClick={logout} />
        </div>
    </aside>
  );
};

export default Sidebar;