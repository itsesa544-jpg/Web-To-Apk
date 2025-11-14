import React from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { UserIcon } from './icons/UserIcon';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button className="text-gray-500 hover:text-gray-800" onClick={onMenuClick} aria-label="Open menu">
            <MenuIcon />
          </button>
          <div className="flex items-center">
            <button className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <UserIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
