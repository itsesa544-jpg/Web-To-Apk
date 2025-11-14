import React from 'react';

const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <div className="w-14 h-7 bg-slate-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-indigo-400 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
    </label>
);

interface IntegrationCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({ icon, title, subtitle, description, enabled, onToggle }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
            <div className="flex flex-col items-center text-center">
                <div className="h-16 mb-4 flex items-center justify-center text-indigo-600">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                    {title} {subtitle && <span className="font-medium text-slate-500">{subtitle}</span>}
                </h3>
                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                    {description}
                </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                <p className={`text-sm font-semibold ${enabled ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {enabled ? 'Currently Enabled' : 'Currently Disabled'}
                </p>
                <ToggleSwitch checked={enabled} onChange={onToggle} />
            </div>
        </div>
    );
};