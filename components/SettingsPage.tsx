import React, { useState } from 'react';
import Header from './Header';
import MobileSidebar from './MobileSidebar';
import IntegrationSettings from './IntegrationSettings';
import AppPreview from './AppPreview';
import { View, AppData } from '../App';
import AppInfoForm from './AppInfoForm';
import CustomizationForm from './CustomizationForm';
import AdvancedSettingsForm from './AdvancedSettingsForm';

export type SettingsView = 'integrations' | 'appInfo' | 'customization' | 'advancedSettings';

interface SettingsPageProps {
    app: AppData;
    onNavigate: (view: View) => void;
    onUpdateApp: (app: AppData) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ app, onNavigate, onUpdateApp }) => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [activeSettingsView, setActiveSettingsView] = useState<SettingsView>('appInfo');

    const renderContent = () => {
        switch (activeSettingsView) {
            case 'integrations':
                return <IntegrationSettings />;
            case 'appInfo':
                return <AppInfoForm app={app} onUpdateApp={onUpdateApp} />;
            case 'customization':
                return <CustomizationForm />;
            case 'advancedSettings':
                return <AdvancedSettingsForm />;
            default:
                return <AppInfoForm app={app} onUpdateApp={onUpdateApp} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header onMenuClick={() => setMobileSidebarOpen(true)} />
            <MobileSidebar 
                isOpen={isMobileSidebarOpen} 
                onClose={() => setMobileSidebarOpen(false)} 
                onNavigate={onNavigate}
                activeSettingsView={activeSettingsView}
                onSettingsNavigate={setActiveSettingsView}
            />
            <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {renderContent()}
                    </div>
                    <div className="hidden lg:block">
                        <AppPreview />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;