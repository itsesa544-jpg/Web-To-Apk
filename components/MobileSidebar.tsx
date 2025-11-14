import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { CloseIcon } from './icons/CloseIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import { BuildDownloadIcon } from './icons/BuildDownloadIcon';
import { AppInfoIcon } from './icons/AppInfoIcon';
import { CustomizationIcon } from './icons/CustomizationIcon';
import { AdvancedSettingsIcon } from './icons/AdvancedSettingsIcon';
import { IntegrationModulesIcon } from './icons/IntegrationModulesIcon';
import { View } from '../App';
import { SettingsView } from './SettingsPage';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (view: View) => void;
    activeSettingsView: SettingsView;
    onSettingsNavigate: (view: SettingsView) => void;
}

const NavItem = ({ icon, label, active = false, onClick }) => (
    <li>
        <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                active ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
        >
            <div className="w-6 h-6 mr-4">{icon}</div>
            <span className="font-semibold">{label}</span>
        </a>
    </li>
);

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, onNavigate, activeSettingsView, onSettingsNavigate }) => {
    const handleSettingsNavigation = (view: SettingsView) => {
        onSettingsNavigate(view);
        onClose();
    };
    
    const handleMainNavigation = (view: View) => {
        onNavigate(view);
        onClose();
    }

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            <aside 
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-10 h-10 mr-2">
                           <LogoIcon />
                        </div>
                        <span className="font-bold text-2xl text-slate-800">Web to apk</span>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Close menu">
                        <CloseIcon />
                    </button>
                </div>

                <nav className="p-5">
                    <ul className="space-y-2">
                        <NavItem icon={<DashboardIcon />} label="Dashboard" onClick={() => handleMainNavigation('dashboard')} />
                        <NavItem icon={<BuildDownloadIcon />} label="Build & Download" onClick={() => handleMainNavigation('build')} />
                    </ul>

                    <hr className="my-6 border-slate-200" />
                    
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">App Settings</h3>

                    <ul className="space-y-2">
                        <NavItem icon={<AppInfoIcon />} label="App Info" active={activeSettingsView === 'appInfo'} onClick={() => handleSettingsNavigation('appInfo')} />
                        <NavItem icon={<CustomizationIcon />} label="Customization" active={activeSettingsView === 'customization'} onClick={() => handleSettingsNavigation('customization')} />
                        <NavItem icon={<AdvancedSettingsIcon />} label="Advanced Settings" active={activeSettingsView === 'advancedSettings'} onClick={() => handleSettingsNavigation('advancedSettings')} />
                        <NavItem icon={<IntegrationModulesIcon />} label="Integration Modules" active={activeSettingsView === 'integrations'} onClick={() => handleSettingsNavigation('integrations')} />
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default MobileSidebar;