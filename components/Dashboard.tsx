import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { PlusIcon } from './icons/PlusIcon';
import AppCard from './AppCard';
import { View, AppData } from '../App';

interface DashboardProps {
  apps: AppData[];
  onNavigate: (view: View, app?: AppData) => void;
  onDeleteApp: (appId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ apps, onNavigate, onDeleteApp }) => {
  return (
    <div className="w-full max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Web to apk Dashboard</h1>
        <p className="text-slate-500 mt-2">Manage apps, settings, and tools easily from here.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
            <SearchIcon />
          </div>
          <input
            type="search"
            placeholder="Search App"
            className="block w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
        <button
          onClick={() => onNavigate('createApp')}
          className="flex items-center justify-center gap-2 w-full sm:w-auto py-3 px-6 border border-transparent rounded-lg shadow-lg text-md font-semibold text-white bg-[#4338CA] hover:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4338CA] transition-all duration-300"
        >
          <div className="w-5 h-5"><PlusIcon /></div>
          <span>Create New App</span>
        </button>
      </div>
      
      <div className="border-b border-slate-200 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <a href="#" className="whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-lg text-indigo-600 border-indigo-500" aria-current="page">
            My Applications
          </a>
          <a href="#" className="whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-lg text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300">
            Collaborators
          </a>
          <a href="#" className="whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-lg text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300">
            Account
          </a>
        </nav>
      </div>

      <div className="space-y-6">
        {apps.map(app => <AppCard key={app.id} app={app} onNavigate={onNavigate} onDeleteApp={onDeleteApp} />)}
      </div>
    </div>
  );
};

export default Dashboard;