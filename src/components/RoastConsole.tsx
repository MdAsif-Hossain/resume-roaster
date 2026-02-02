import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, AlertTriangle } from 'lucide-react';

interface RoastResult {
    roast: string;
    missingKeywords: string[];
}

interface RoastConsoleProps {
    result: RoastResult | null;
    isLoading: boolean;
    loadingText: string;
}

export const RoastConsole: React.FC<RoastConsoleProps> = ({ result, isLoading, loadingText }) => {
    const [displayedRoast, setDisplayedRoast] = useState('');

    // Typewriter effect for roast text
    useEffect(() => {
        if (result?.roast) {
            let i = 0;
            setDisplayedRoast('');
            const interval = setInterval(() => {
                setDisplayedRoast((prev) => prev + result.roast.charAt(i));
                i++;
                if (i >= result.roast.length) clearInterval(interval);
            }, 20); // Speed of typewriter
            return () => clearInterval(interval);
        }
    }, [result]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full bg-black border-2 border-zinc-800 rounded-lg overflow-hidden shadow-2xl flex flex-col font-mono"
        >
            {/* Terminal Header */}
            <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-zinc-700">
                <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-zinc-400" />
                    <span className="text-xs text-zinc-400">roast_console.exe</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 flex-1 overflow-y-auto text-sm md:text-base leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
                {isLoading ? (
                    <div className="space-y-4">
                        <div className="flex items-center text-error animate-pulse">
                            <span className="mr-2">❯</span>
                            {loadingText.toUpperCase()}
                            <span className="animate-blink ml-1">_</span>
                        </div>
                        <div className="text-zinc-600 text-xs">
                            Analyzing failures...<br />
                            Calculating disappointment...<br />
                            Formatting insults...
                        </div>
                    </div>
                ) : result ? (
                    <div className="space-y-6">
                        <div className="text-terminal border-b border-zinc-800 pb-4 mb-4">
                            <span className="text-error mr-2">❯</span>
                            <span>ANALYSIS COMPLETE. STATUS: UNEMPLOYABLE.</span>
                        </div>

                        <div className="text-zinc-300 whitespace-pre-wrap">
                            {displayedRoast}
                        </div>

                        {/* Missing Keywords Section */}
                        {result.missingKeywords && result.missingKeywords.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="mt-8 border border-red-900/50 bg-red-950/10 p-4 rounded"
                            >
                                <div className="flex items-center gap-2 text-error mb-3 font-bold uppercase text-xs tracking-widest">
                                    <AlertTriangle size={16} />
                                    Missing Keywords (Why you failed):
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingKeywords.map((kw, i) => (
                                        <span key={i} className="px-2 py-1 bg-red-900/40 text-red-200 text-xs rounded border border-red-800">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        <div className="mt-8 text-zinc-600 animate-pulse">
                            <span className="mr-2">❯</span>
                            <span className="animate-blink">_</span>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-600 opacity-50">
                        <Terminal size={48} className="mb-4" />
                        <p>AWAITING INPUT...</p>
                        <p className="text-xs mt-2">Upload resume to initiate roast.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
