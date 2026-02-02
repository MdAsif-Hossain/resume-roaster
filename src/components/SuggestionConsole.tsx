import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle, Globe, FileText, AlertCircle } from 'lucide-react';

interface Suggestion {
    title: string;
    content: string;
}

interface SuggestionConsoleProps {
    suggestions?: Suggestion[];
    isLoading: boolean;
}

export const SuggestionConsole: React.FC<SuggestionConsoleProps> = ({ suggestions, isLoading }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden shadow-2xl flex flex-col font-sans"
        >
            {/* Header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-600">
                <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-yellow-400" />
                    <span className="text-xs text-slate-300 font-mono">career_fixer.sh</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                        <Globe className="animate-spin duration-3000" size={32} />
                        <p className="text-sm font-mono animate-pulse">Searching for a miracle...</p>
                    </div>
                ) : suggestions && suggestions.length > 0 ? (
                    <div className="space-y-6">
                        <div className="text-green-400 font-mono text-sm border-b border-slate-700 pb-2 mb-4">
                            <span className="mr-2">✓</span>
                            <span>SOLUTION FOUND. EXECUTE IMMEDIATELY.</span>
                        </div>

                        {suggestions.map((suggestion, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-800/50 p-4 rounded border-l-4 border-yellow-500"
                            >
                                <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold text-sm uppercase tracking-wider">
                                    {getIconForTitle(suggestion.title)}
                                    {suggestion.title}
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {suggestion.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                        <FileText size={48} className="mb-4" />
                        <p className="font-mono text-sm">NO CONSTRUCTIVE INPUT DATA</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Helper to choose icons
const getIconForTitle = (title: string) => {
    if (title.includes('Visa')) return <Globe size={14} />;
    if (title.includes('Format')) return <FileText size={14} />;
    if (title.includes('Skill')) return <AlertCircle size={14} />;
    return <CheckCircle size={14} />;
};
