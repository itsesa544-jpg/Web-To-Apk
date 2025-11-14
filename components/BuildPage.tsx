import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { RecaptchaIcon } from './icons/RecaptchaIcon';
import { AndroidLargeIcon } from './icons/AndroidLargeIcon';
import { QrCodePlaceholder } from './icons/QrCodePlaceholder';
import { AppData } from '../App';

// A base64 representation of a tiny, valid zip file. APKs are zip-based, so this serves as a realistic binary placeholder.
const DUMMY_APK_BASE64 = 'UEsDBAoAAAAAAACk31ZTAAAAAAAAAAAAAAAABgANTUVUQS1JTkYvAwBQSwcIAAAAAACAAAAAAAAAAFBLAwQKAAAAAAAAlN9WUwAAAAAAAAAAAAAAAA8ADU1FVEEtSU5GL01BTklGRVNULk1GUEsHCAAAAAACAAAAAAAAAFBLAQIUAAoAAAAAAACk31ZTAAAAAAAAAAAAAAAABgAAAAAAAAABACAAAAAAAAAATUVUQS1JTkYvCgAAAAAAAACU31ZTAAAAAAAAAAAAAAAADwAAAAAAAAABACAAAACCAAAAAE1FVEEtSU5GL01BTklGRVNULk1GUEsFBgAAAAACAAIAfgAAAAIAAAAAAA==';

const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

interface BuildPageProps {
    app: AppData;
}

const RecaptchaPlaceholder = () => (
    <div className="flex items-center justify-between p-2 bg-slate-100 border border-slate-200 rounded-md">
        <div className="flex items-center">
            <input type="checkbox" id="recaptcha" className="h-7 w-7 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="recaptcha" className="ml-3 text-sm text-slate-800 cursor-pointer">I'm not a robot</label>
        </div>
        <div className="text-center">
            <div className="w-8 h-8 mx-auto text-blue-800">
                <RecaptchaIcon />
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">reCAPTCHA</p>
            <p className="text-[8px] text-slate-500 leading-tight">Privacy - Terms</p>
        </div>
    </div>
);

const BuildForm = ({ app, onBuild, versionCode, setVersionCode, versionName, setVersionName }) => (
    <div className="w-full max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
        <img src={app.iconUrl} alt="App Logo" className="w-24 h-24 rounded-3xl mx-auto shadow-md object-cover" />
        <h1 className="text-2xl font-bold text-slate-800 mt-4">{app.name}</h1>
        <p className="text-sm text-slate-500 mt-1 truncate">Created for {app.url}</p>

        <form onSubmit={(e) => { e.preventDefault(); onBuild(); }} className="mt-8 text-left space-y-6">
            <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">Version Details</h2>
            
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-3xl font-bold text-indigo-600 bg-indigo-100 rounded-lg flex items-center justify-center">#</div>
                <div className="flex-grow">
                    <label htmlFor="versionCode" className="block text-sm font-semibold text-slate-600 mb-1">Numeric Version code.</label>
                    <p className="text-xs text-slate-400 mb-2">Example: 1, 2, 5 etc.</p>
                </div>
                 <input type="number" id="versionCode" value={versionCode} onChange={(e) => setVersionCode(e.target.value)} className="block w-24 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center" />
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 text-3xl font-bold text-indigo-600 bg-indigo-100 rounded-lg flex items-center justify-center">#</div>
                <div className="flex-grow">
                     <label htmlFor="versionName" className="block text-sm font-semibold text-slate-600 mb-1">Version label. Example:</label>
                     <p className="text-xs text-slate-400 mb-2">1.0, 2.5, 5.1 etc.</p>
                </div>
                <input type="text" id="versionName" value={versionName} onChange={(e) => setVersionName(e.target.value)} className="block w-24 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center" />
            </div>

            <RecaptchaPlaceholder />

            <p className="text-xs text-slate-500 text-center px-2 !my-4">
                <strong>Note:</strong> This tool generates a basic test package (APK) for previewing your website. It is not a store-ready application.
            </p>

            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-[#4338CA] hover:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4338CA] transition-all duration-300">
                Build the App
            </button>
        </form>
    </div>
);


const BuildDownloadPage = ({ app, releaseNotes, versionName }: { app: AppData, releaseNotes: string, versionName: string }) => {
    const [isDownloadingApk, setIsDownloadingApk] = useState(false);

    const handleDownloadApk = () => {
        if (isDownloadingApk) return;
        setIsDownloadingApk(true);

        setTimeout(() => {
            const sanitizedAppName = app.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const fileName = `${sanitizedAppName}_v${versionName || '1.0'}.apk`;
            
            const blob = base64ToBlob(DUMMY_APK_BASE64, 'application/vnd.android.package-archive');
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setIsDownloadingApk(false);
        }, 1500); // 1.5 second delay
    };

    return (
        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Your App is Ready</h1>
          
          <div className="bg-amber-50 border-l-4 border-amber-400 text-amber-800 p-4 rounded-r-lg mb-8 flex items-start gap-4 shadow-sm">
            <img src="https://i.ibb.co/wYyV2Q0/info-illustration.png" alt="Warning Illustration" className="w-20 h-auto object-contain" />
            <div>
                <p className="text-sm">
                    Installing an app from direct APK file will show a 'Google Play Protect' or virus detection warning. This warning is default by Android OS and will be gone when published to Google Play Store.
                </p>
            </div>
          </div>
    
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">What's New</h2>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8">
                <p className="text-slate-600 text-sm whitespace-pre-wrap">{releaseNotes}</p>
            </div>
    
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Download App</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <AndroidLargeIcon />
                    <div>
                        <h3 className="font-bold text-slate-800">Download APK</h3>
                        <p className="text-sm text-slate-500">Android Application Package</p>
                        <p className="text-xs text-slate-400 mt-1">Generated Just Now</p>
                    </div>
                </div>
                <button 
                    onClick={handleDownloadApk}
                    disabled={isDownloadingApk}
                    className="w-32 h-11 flex justify-center items-center py-2 px-5 border border-transparent rounded-lg font-semibold text-white bg-[#4338CA] hover:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400 disabled:cursor-wait"
                >
                     {isDownloadingApk ? (
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : 'Download'}
                </button>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <AndroidLargeIcon />
                    <div>
                        <h3 className="font-bold text-slate-800">Download AAB</h3>
                        <p className="text-sm text-slate-500">Android App Bundle</p>
                    </div>
                </div>
                <button disabled className="py-2 px-5 rounded-lg font-semibold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors opacity-60 cursor-not-allowed">
                    Upgrade Plan
                </button>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <div className="p-4 bg-white inline-block rounded-lg shadow-md border border-slate-100">
                <QrCodePlaceholder />
            </div>
            <p className="text-slate-500 mt-4 text-sm">Scan to get the APK file download URL</p>
          </div>
        </div>
    );
};


const BuildPage: React.FC<BuildPageProps> = ({ app }) => {
    const [buildState, setBuildState] = useState<'form' | 'building' | 'ready'>('form');
    const [releaseNotes, setReleaseNotes] = useState('');
    const [versionCode, setVersionCode] = useState('1');
    const [versionName, setVersionName] = useState('1.0');

    const handleBuild = async () => {
        setBuildState('building');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate a short and friendly "What's New" section for version ${versionName} of an app. The app name is "${app.name}" and it's based on the website "${app.url}". Keep it under 50 words and format it as a simple paragraph. Be creative and enthusiastic.`
            });
            setReleaseNotes(response.text);
        } catch (error) {
            console.error("Error generating release notes:", error);
            setReleaseNotes("This version includes initial setup, bug fixes, and performance improvements to enhance your experience.");
        } finally {
            setBuildState('ready');
        }
    };

    if (buildState === 'building') {
        return (
             <div className="text-center p-10">
                <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-slate-600 font-semibold text-lg">Building your app...</p>
                <p className="text-slate-500">Generating release notes and compiling assets. This may take a few moments.</p>
             </div>
        );
    }

    if (buildState === 'ready') {
        return <BuildDownloadPage app={app} releaseNotes={releaseNotes} versionName={versionName} />;
    }

    return <BuildForm app={app} onBuild={handleBuild} versionCode={versionCode} setVersionCode={setVersionCode} versionName={versionName} setVersionName={setVersionName} />;
};

export default BuildPage;
