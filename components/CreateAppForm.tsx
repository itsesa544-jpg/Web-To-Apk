import React, { useState, useEffect } from 'react';

interface CreateAppFormProps {
  onAppCreate: (data: { websiteAddress: string; appName: string; platform: string; }) => void;
}

const CreateAppForm: React.FC<CreateAppFormProps> = ({ onAppCreate }) => {
  const [websiteAddress, setWebsiteAddress] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [platform, setPlatform] = useState('Android');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (websiteAddress.startsWith('http://') || websiteAddress.startsWith('https://')) {
        setPreviewUrl(websiteAddress);
      } else {
        setPreviewUrl('');
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [websiteAddress]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!websiteAddress || !appName) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onAppCreate({ websiteAddress, appName, platform });
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-4xl font-bold text-slate-800 mb-10">Create New App</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="websiteAddress" className="block text-sm font-semibold text-slate-600 mb-2">
            Enter Website Address
          </label>
          <input
            type="url"
            id="websiteAddress"
            value={websiteAddress}
            onChange={(e) => setWebsiteAddress(e.target.value)}
            placeholder="https://example.com"
            required
            className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
        
        <div className="transition-all duration-300">
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Live Preview
          </label>
          <div className="w-full h-80 bg-slate-100 border-2 border-slate-200 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Website Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="text-center text-slate-400 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
                </svg>
                <p className="mt-2 text-sm">Enter a valid URL starting with https:// to see a preview.</p>
              </div>
            )}
          </div>
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
            placeholder="Enter Your App Name"
            required
            className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label htmlFor="appPlatform" className="block text-sm font-semibold text-slate-600 mb-2">
            App Platform
          </label>
          <div className="relative">
            <select
              id="appPlatform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              required
              className="appearance-none block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            >
              <option>Android</option>
              <option>iOS</option>
              <option>Web</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-[#4338CA] hover:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4338CA] disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
          >
            {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : 'Create App'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAppForm;
