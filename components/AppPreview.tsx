import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

const AppPreview: React.FC = () => {
  return (
    <div className="sticky top-24">
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-gray-800 border-[10px] border-gray-900 rounded-[40px] shadow-2xl aspect-[9/19.5] p-1.5">
                <div className="bg-slate-50 h-full w-full rounded-[32px] p-4 space-y-4 overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="w-1/3 h-2 bg-slate-200 rounded-full"></div>
                        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    </div>

                    {/* Image Placeholder */}
                    <div className="relative w-full aspect-video bg-slate-200 rounded-xl flex items-center justify-center">
                        <div className="w-16 h-16 bg-slate-300 rounded-full opacity-50"></div>
                        <div className="absolute w-24 h-16 bg-slate-300 rounded-lg opacity-50 -translate-x-4"></div>
                    </div>
                    
                    {/* Content Placeholders */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-lg flex-shrink-0 flex items-center justify-center text-slate-400">
                           <CodeIcon />
                        </div>
                        <div className="w-full space-y-2">
                            <div className="h-3 bg-slate-200 rounded-full"></div>
                            <div className="h-3 bg-slate-200 rounded-full w-3/4"></div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
                        <div className="h-2 bg-slate-200 rounded-full w-1/2"></div>
                         <div className="h-2 bg-slate-200 rounded-full"></div>
                         <div className="h-2 bg-slate-200 rounded-full"></div>
                         <div className="h-2 bg-slate-200 rounded-full w-5/6"></div>
                    </div>

                     <div className="h-10 bg-indigo-200 rounded-lg"></div>

                     <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
                         <div className="h-2 bg-slate-200 rounded-full"></div>
                         <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default AppPreview;