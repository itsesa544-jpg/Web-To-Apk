import React from 'react';
import { AdvancedSettingsIconSolid } from './icons/AdvancedSettingsIconSolid';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-md font-bold text-slate-700 mb-4 pb-2 border-b border-slate-200">{children}</h3>
);

const SelectInput: React.FC<{ label: string; description?: string, children: React.ReactNode }> = ({ label, description, children }) => (
    <div>
        <label className="block text-sm font-semibold text-slate-600">{label}</label>
        {description && <p className="text-xs text-slate-400 mt-1 mb-2">{description}</p>}
        <div className="relative">
            <select className="appearance-none block w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500">
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    </div>
);

const TextInput: React.FC<{ label: string; description?: string; defaultValue: string }> = ({ label, description, defaultValue }) => (
     <div>
        <label className="block text-sm font-semibold text-slate-600">{label}</label>
        {description && <p className="text-xs text-slate-400 mt-1 mb-2">{description}</p>}
        <input 
            type="text" 
            defaultValue={defaultValue}
            className="block w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
    </div>
);

const TextAreaInput: React.FC<{ label: string; description?: string; placeholder: string, rows?: number }> = ({ label, description, placeholder, rows = 5 }) => (
    <div>
       <label className="block text-sm font-semibold text-slate-600">{label}</label>
        <textarea 
            rows={rows}
            className="block w-full px-3 py-2 mt-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder={placeholder}
        ></textarea>
        {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
   </div>
);


const AdvancedSettingsForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Advanced settings form submitted');
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 w-full max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                    <AdvancedSettingsIconSolid />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Advanced Settings</h2>
                    <p className="text-sm text-slate-500 mt-1">Configure various advanced settings of the App</p>
                </div>
            </div>
            <div className="border-t border-slate-200 pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <section className="space-y-4">
                        <SelectInput label="Allow Content Zooming?">
                            <option>No</option>
                            <option>Yes</option>
                        </SelectInput>
                        <SelectInput label="Allow Text Selection?">
                            <option>Yes</option>
                            <option>No</option>
                        </SelectInput>
                        <SelectInput label="Disallow Screenshot or Screen recording?">
                             <option>No</option>
                             <option>Yes</option>
                        </SelectInput>
                        <SelectInput label="Enable Resource Caching?" description="Cache helps to load the App Faster. But changes in website will take time to be effective in the app.">
                            <option>Yes</option>
                            <option>No</option>
                        </SelectInput>
                         <TextInput label="Custom User Agent" defaultValue="Mozilla/5.0 (Linux; Android; K) App{VERSI" description="User agent helps to identify which of your site users are using app. Also, site's have Google Sign-in, must provide a mobile browser user agent to be used from the app." />
                        <SelectInput label="Allow Opening Popup Window?" description="Enable to allow the app to open popup window. This is necessary for some sites having popup related functionality.">
                            <option>Yes</option>
                            <option>No</option>
                        </SelectInput>
                        <SelectInput label="Allow Background Audio Playing?" description="Enable to allow the app to play audio even if the app is paused or minimized. Use this setting carefully as YouTube video's audio will also play in background which can make the app rejected in Google Play Store.">
                            <option>No</option>
                            <option>Yes</option>
                        </SelectInput>
                        <SelectInput label="Play Audio with Controls in Notification?" >
                            <option>No</option>
                            <option>Yes</option>
                        </SelectInput>
                        <SelectInput label="Allow In-App File Downloading?" description="Enable to automatically download files inside the app without opening device's browser. This will ask users to provide read and write permission to device storage.">
                            <option>Yes</option>
                            <option>No</option>
                        </SelectInput>
                    </section>
                    
                    <section className="space-y-4">
                        <SectionTitle>Device Access</SectionTitle>
                        <SelectInput label="Access Device's Camera?" description="Enable to access device's camera inside the app. It's required if website needs real time user's camera frame i.e. for video meeting. This will ask users to provide permission to access device camera.">
                            <option>No</option>
                            <option>Yes</option>
                        </SelectInput>
                        <SelectInput label="Access Device's Microphone?" description="Enable to access device's microphone inside the app. It's required if website needs real time user's microphone audio i.e. for video meeting with voice. This will ask users to provide permission to access device microphone.">
                            <option>No</option>
                            <option>Yes</option>
                        </SelectInput>
                        <SelectInput label="Access Device's Location?" description="Enable to access device's location inside the app. It's required if website needs real time user's location data i.e. for displaying current location in a map. This will ask users to provide permission to access device location.">
                            <option>No</option>
                            <option>Yes</option>
                        </SelectInput>
                    </section>

                    <section className="space-y-4">
                        <SectionTitle>URL Management</SectionTitle>
                        <TextAreaInput 
                            label="Allowed URLs to view inside app" 
                            placeholder={"example1.com\nexample2.com/specific-path"}
                            description="Enter each URL or domain or part of the url in each line. Urls containing those texts will be allowed to open in the app. Keep empty to allow loading all URLs in the app."
                        />
                         <TextAreaInput 
                            label="Disallowed URLs to view inside app"
                            placeholder={"instagram.com\nlinkedin.com\nwhatsapp.com\nwa.me"}
                            description="Enter each URL or domain or part of the url in each line. Urls containing those texts will be disallowed to open in the app. They will be opened via device default browser/app."
                        />
                    </section>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdvancedSettingsForm;