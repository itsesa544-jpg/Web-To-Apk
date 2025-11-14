import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateAppForm from './components/CreateAppForm';
import SettingsPage from './components/SettingsPage';
import BuildPage from './components/BuildPage';

export type View = 'dashboard' | 'createApp' | 'settings' | 'build';

export interface AppData {
  id: number;
  iconUrl: string;
  name: string;
  platform: string;
  url: string;
  expiresIn: number;
}

const initialApps: AppData[] = [
  {
    id: 1,
    iconUrl: 'https://i.ibb.co/6wm001Q/img-to-link.png', // Placeholder image
    name: 'Image to link convart',
    platform: 'Android Application',
    url: 'https://image-to-link-convatar....',
    expiresIn: 23,
  },
  {
    id: 2,
    iconUrl: 'https://i.ibb.co/k5zvwzD/innova.png', // Placeholder image
    name: 'Innova logistics wms',
    platform: 'Android Application',
    url: 'https://innovalogisticswm.verc...',
    expiresIn: 2,
  },
  {
    id: 3,
    iconUrl: 'https://i.ibb.co/k5zvwzD/innova.png', // Placeholder image
    name: 'Innova logistics wms',
    platform: 'Android Application',
    url: 'https://innovalogisticswm.verc...',
    expiresIn: 15,
  },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  
  const [apps, setApps] = useState<AppData[]>(() => {
    try {
      const savedApps = localStorage.getItem('web-to-apk-apps');
      return savedApps ? JSON.parse(savedApps) : initialApps;
    } catch (error) {
      console.error('Failed to parse apps from localStorage', error);
      return initialApps;
    }
  });

  const [selectedApp, setSelectedApp] = useState<AppData | null>(apps.length > 0 ? apps[0] : null);

  useEffect(() => {
    try {
      localStorage.setItem('web-to-apk-apps', JSON.stringify(apps));
    } catch (error) {
      console.error('Failed to save apps to localStorage', error);
    }
  }, [apps]);

  useEffect(() => {
    const isSelectedAppInList = selectedApp && apps.some(app => app.id === selectedApp.id);
    if (!isSelectedAppInList) {
        setSelectedApp(apps.length > 0 ? apps[0] : null);
    }
  }, [apps, selectedApp]);

  const handleNavigate = (view: View, app?: AppData) => {
    setActiveView(view);
    if (app) {
      setSelectedApp(app);
    } else if ((view === 'build' || view === 'settings') && !selectedApp && apps.length > 0) {
      // If navigating to a context-sensitive view without an app, default to the first one.
      setSelectedApp(apps[0]);
    }
  };

  const handleCreateApp = (newAppData: { websiteAddress: string; appName: string; platform: string; }) => {
    let iconUrl = 'https://i.ibb.co/6wm001Q/img-to-link.png'; // Default icon
    try {
        const url = new URL(newAppData.websiteAddress);
        iconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
    } catch (error) {
        console.warn("Could not parse URL for favicon, using default.", error);
    }

    const newApp: AppData = {
      id: Date.now(),
      iconUrl: iconUrl,
      name: newAppData.appName,
      platform: `${newAppData.platform} Application`,
      url: newAppData.websiteAddress,
      expiresIn: 30, // Default expiry
    };
    setApps(prevApps => [newApp, ...prevApps]);
    setSelectedApp(newApp);
    setActiveView('build');
  };

  const handleDeleteApp = (appId: number) => {
    setApps(prevApps => prevApps.filter(app => app.id !== appId));
  };

  const handleUpdateApp = (updatedApp: AppData) => {
    setApps(prevApps => prevApps.map(app => (app.id === updatedApp.id ? updatedApp : app)));
    setSelectedApp(updatedApp);
  };


  if (activeView === 'settings') {
     if (!selectedApp) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800">No App Selected</h2>
                    <p className="text-slate-500 mt-2">Please return to the dashboard and select an app to edit.</p>
                    <button 
                        onClick={() => handleNavigate('dashboard')} 
                        className="mt-6 py-2 px-6 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }
    return <SettingsPage key={selectedApp.id} app={selectedApp} onNavigate={handleNavigate} onUpdateApp={handleUpdateApp} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto flex justify-center">
        <div className="w-full max-w-4xl">
            {activeView === 'dashboard' && <Dashboard apps={apps} onNavigate={handleNavigate} onDeleteApp={handleDeleteApp} />}
            {activeView === 'createApp' && <CreateAppForm onAppCreate={handleCreateApp} />}
            {activeView === 'build' && selectedApp && <BuildPage key={selectedApp.id} app={selectedApp} />}
             {activeView === 'build' && !selectedApp && (
                <div className="p-8 text-center">
                    <h2 className="text-xl font-bold text-slate-800">No App Selected</h2>
                    <p className="text-slate-500 mt-2">Please return to the dashboard and select an app to build.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;