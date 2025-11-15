import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc, orderBy, serverTimestamp } from 'firebase/firestore';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateAppForm from './components/CreateAppForm';
import SettingsPage from './components/SettingsPage';
import BuildPage from './components/BuildPage';
import LoginPage from './LoginPage';

export type View = 'dashboard' | 'createApp' | 'settings' | 'build';

export interface AppData {
  id: string; // Firestore IDs are strings
  iconUrl: string;
  name: string;
  platform: string;
  url:string;
  expiresIn: number;
  createdAt?: any; // for ordering
}

const App: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [apps, setApps] = useState<AppData[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setIsDataLoading(true);
      const q = query(collection(db, 'users', currentUser.uid, 'apps'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const appsData: AppData[] = [];
        querySnapshot.forEach((doc) => {
          appsData.push({ id: doc.id, ...doc.data() } as AppData);
        });
        setApps(appsData);
        setIsDataLoading(false);
      }, (error) => {
        console.error("Error fetching apps: ", error);
        setIsDataLoading(false);
      });

      return () => unsubscribe();
    } else {
      setApps([]);
      setSelectedApp(null);
      setIsDataLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isDataLoading && apps.length > 0 && !selectedApp) {
      setSelectedApp(apps[0]);
    }
    if (!isDataLoading && apps.length === 0) {
        setSelectedApp(null);
    }
  }, [apps, isDataLoading, selectedApp]);
  
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
      setSelectedApp(apps[0]);
    }
  };

  const handleCreateApp = async (newAppData: { websiteAddress: string; appName: string; platform: string; }) => {
    if (!currentUser) return;

    let iconUrl = 'https://i.ibb.co/6wm001Q/img-to-link.png';
    try {
        const url = new URL(newAppData.websiteAddress);
        iconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
    } catch (error) {
        console.warn("Could not parse URL for favicon, using default.", error);
    }

    const newApp = {
      iconUrl: iconUrl,
      name: newAppData.appName,
      platform: `${newAppData.platform} Application`,
      url: newAppData.websiteAddress,
      expiresIn: 30,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'users', currentUser.uid, 'apps'), newApp);
    setSelectedApp({ ...newApp, id: docRef.id });
    setActiveView('build');
  };

  const handleDeleteApp = async (appId: string) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'apps', appId));
  };

  const handleUpdateApp = async (updatedApp: AppData) => {
    if (!currentUser) return;
    const appRef = doc(db, 'users', currentUser.uid, 'apps', updatedApp.id);
    const { id, ...appDataToUpdate } = updatedApp;
    await updateDoc(appRef, appDataToUpdate);
    setSelectedApp(updatedApp);
  };

  if (loading || (currentUser && isDataLoading)) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
           <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      );
  }

  if (!currentUser) {
      return <LoginPage />;
  }

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
                    <p className="text-slate-500 mt-2">Please create or select an app to build.</p>
                     <button 
                        onClick={() => handleNavigate('createApp')} 
                        className="mt-6 py-2 px-6 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                        Create an App
                    </button>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
