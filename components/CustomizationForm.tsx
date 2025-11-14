import React from 'react';
import { CustomizationIconSolid } from './icons/CustomizationIconSolid';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-md font-bold text-slate-700 mb-4 pb-2 border-b border-slate-200">{children}</h3>
);

const ColorInput: React.FC<{ label: string; defaultValue: string }> = ({ label, defaultValue }) => (
    <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">{label}</label>
        <div className="flex items-center gap-2">
            <input 
                type="text" 
                defaultValue={defaultValue}
                className="block w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div style={{ backgroundColor: defaultValue }} className="w-8 h-9 rounded-md border border-slate-200 flex-shrink-0"></div>
            <button type="button" className="px-4 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Pick Color
            </button>
        </div>
    </div>
);

const SelectInput: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">{label}</label>
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

const TextInput: React.FC<{ label: string; defaultValue: string }> = ({ label, defaultValue }) => (
     <div>
        <label className="block text-sm font-semibold text-slate-600 mb-2">{label}</label>
        <input 
            type="text" 
            defaultValue={defaultValue}
            className="block w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
    </div>
);


const CustomizationForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Customization form submitted');
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 w-full max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                    <CustomizationIconSolid />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Style Customization</h2>
                    <p className="text-sm text-slate-500 mt-1">Configure various styles of the App</p>
                </div>
            </div>
            <div className="border-t border-slate-200 pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Status Bar Section */}
                    <section>
                        <SectionTitle>Status Bar</SectionTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <ColorInput label="Status Bar Background Color (Light Mode)" defaultValue="#ffffff" />
                            <ColorInput label="Status Bar Background Color (Dark Mode)" defaultValue="#000000" />
                            <SelectInput label="Status Bar Icon Color (Light Mode)">
                                <option>Dark</option>
                                <option>Light</option>
                            </SelectInput>
                            <SelectInput label="Status Bar Icon Color (Dark Mode)">
                                <option>Light</option>
                                <option>Dark</option>
                            </SelectInput>
                            <SelectInput label="App Orientation">
                                <option>Landscape & Portrait</option>
                                <option>Landscape Only</option>
                                <option>Portrait Only</option>
                            </SelectInput>
                             <SelectInput label="Fullscreen App">
                                <option>No</option>
                                <option>Yes</option>
                            </SelectInput>
                        </div>
                    </section>
                    
                     {/* App Background Section */}
                    <section>
                        <SectionTitle>App Background Color</SectionTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <ColorInput label="App Background Color (Light Mode)" defaultValue="#ffffff" />
                            <ColorInput label="App Background Color (Dark Mode)" defaultValue="#000000" />
                        </div>
                    </section>

                    {/* Circle Loader Section */}
                    <section>
                        <SectionTitle>Circle Loader</SectionTitle>
                        <div className="space-y-4">
                            <SelectInput label="Circle Loader Appearance">
                                <option>Show always on page load</option>
                                <option>Hide on page load</option>
                            </SelectInput>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Hide Circle Loader on Specific URLs</label>
                                <textarea 
                                    rows={4}
                                    className="block w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="example1.com&#10;example2.com/specific-path"
                                ></textarea>
                                <p className="text-xs text-slate-400 mt-1">Enter each URL or domain or part of the url in each line.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                <SelectInput label="Circle Loader Style">
                                    <option>Default Style</option>
                                    <option>Style 2</option>
                                </SelectInput>
                                <ColorInput label="Circle Loader Color (Light Mode)" defaultValue="#633AE5" />
                                <ColorInput label="Circle Loader Color (Dark Mode)" defaultValue="#633AE5" />
                                <ColorInput label="Circle Loader Background (Light Mode)" defaultValue="#ffffff" />
                                <ColorInput label="Circle Loader Background (Dark Mode)" defaultValue="#000000" />
                            </div>
                        </div>
                    </section>
                    
                    {/* ... Other sections will go here ... */}

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

export default CustomizationForm;
