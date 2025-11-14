import React, { useState, useEffect, useRef } from 'react';
import { AndroidIcon } from './icons/AndroidIcon';
import { MoreIcon } from './icons/MoreIcon';
import { TrashIcon } from './icons/TrashIcon';
import { View, AppData } from '../App';

interface AppCardProps {
  app: AppData;
  onNavigate: (view: View, app: AppData) => void;
  onDeleteApp: (appId: number) => void;
}

const DeleteConfirmationModal = ({ appName, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold text-slate-800">Confirm Deletion</h2>
            <p className="text-slate-500 mt-2">
                Are you sure you want to delete <strong className="text-slate-700">{appName}</strong>? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
                <button onClick={onCancel} className="py-2 px-4 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                    Cancel
                </button>
                <button onClick={onConfirm} className="py-2 px-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                    Delete
                </button>
            </div>
        </div>
    </div>
);


const AppCard: React.FC<AppCardProps> = ({ app, onNavigate, onDeleteApp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    onDeleteApp(app.id);
    setIsDeleteConfirmOpen(false);
  }

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
        <div className="flex items-start gap-5">
          <img src={app.iconUrl} alt={`${app.name} logo`} className="w-16 h-16 rounded-xl object-cover shadow-md" />
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-slate-800">{app.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-4 text-green-500"><AndroidIcon /></div>
              <p className="text-sm text-slate-500">{app.platform}</p>
            </div>
          </div>
          <div className="relative" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-400 hover:text-slate-600 p-2 rounded-full" aria-label="More options">
              <MoreIcon />
            </button>
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-10 py-1">
                <button onClick={handleDeleteClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
                    <TrashIcon />
                    <span>Delete App</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500 truncate">
          App is created for {app.url}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
          <p className="text-md font-medium text-slate-700">Expires in <span className="font-bold">{app.expiresIn} Days</span></p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('settings', app)} className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Edit</button>
            <button onClick={() => onNavigate('build', app)} className="py-2 px-5 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Build</button>
          </div>
        </div>
      </div>
      {isDeleteConfirmOpen && (
        <DeleteConfirmationModal 
            appName={app.name} 
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </>
  );
};

export default AppCard;