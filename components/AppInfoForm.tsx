import React, { useState, useEffect } from 'react';
import { InfoIconSolid } from './icons/InfoIconSolid';
import { AppData } from '../App';

interface AppInfoFormProps {
    app: AppData;
    onUpdateApp: (app: AppData) => void;
}

const AppInfoForm: React.FC<AppInfoFormProps> = ({ app, onUpdateApp }) => {
  const [logoPreviewUrl, setLogoPreviewUrl] = useState(app.iconUrl);
  const [appName, setAppName] = useState(app.name);
  const [websiteAddress, setWebsiteAddress] = useState(app.url);
  const [packageName, setPackageName] = useState(`app.${app.name.replace(/\s+/g, '').toLowerCase()}.app`);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLogoPreviewUrl(app.iconUrl);
    setAppName(app.name);
    setWebsiteAddress(app.url);
    setPackageName(`app.${app.name.replace(/\s+/g, '').toLowerCase()}.app`);
  }, [app]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedApp: AppData = {
        ...app,
        name: appName,
        url: websiteAddress,
        iconUrl: logoPreviewUrl,
        // In a real app, package name might need more complex handling
    };
    onUpdateApp(updatedApp);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 w-full max-w-2xl mx-auto">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
          <InfoIconSolid />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">App Information</h2>
          <p className="text-sm text-slate-500 mt-1">General base settings of the application</p>
        </div>
      </div>
      <div className="border-t border-slate-200 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="websiteAddress" className="block text-sm font-semibold text-slate-600 mb-2">
              Website Address
            </label>
            <input
              type="url"
              id="websiteAddress"
              value={websiteAddress}
              onChange={(e) => setWebsiteAddress(e.target.value)}
              required
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="appName" className="block text-sm font-semibold text-slate-600 mb-2">
              App Name
            </label>
            <input
              type="text"
              id="appName"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              required
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="appLogo" className="block text-sm font-semibold text-slate-600 mb-2">
              App Logo
            </label>
            <div className="flex items-center justify-between w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 text-sm">Best Image Size is 512x512</span>
                <div className="flex items-center gap-3">
                    <img src={logoPreviewUrl} alt="App Logo Preview" className="w-9 h-9 rounded-md object-cover" />
                    <label htmlFor="appLogoInput" className="cursor-pointer text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                        Choose Logo
                    </label>
                    <input type="file" id="appLogoInput" className="hidden" onChange={handleLogoChange} accept="image/*" />
                </div>
            </div>
          </div>
          <div>
            <label htmlFor="packageName" className="block text-sm font-semibold text-slate-600 mb-2">
              Android Package Name
            </label>
            <input
              type="text"
              id="packageName"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              required
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaved}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white transition-all duration-300 ${
                isSaved 
                ? 'bg-green-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isSaved ? (
                <>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Saved!
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppInfoForm;