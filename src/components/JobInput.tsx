import React from 'react';
import { motion } from 'framer-motion';

interface JobInputProps {
    jobDescription: string;
    onJobDescriptionChange: (value: string) => void;
    targetCountry: string;
    onTargetCountryChange: (value: string) => void;
    currentLocation: string;
    onCurrentLocationChange: (value: string) => void;
}

export const JobInput: React.FC<JobInputProps> = ({
    jobDescription,
    onJobDescriptionChange,
    targetCountry,
    onTargetCountryChange,
    currentLocation,
    onCurrentLocationChange
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Target Country */}
                <div>
                    <label className="block mb-2 text-sm font-mono text-zinc-400">
                        Where is this job?
                    </label>
                    <select
                        value={targetCountry}
                        onChange={(e) => onTargetCountryChange(e.target.value)}
                        className="block w-full p-3 text-sm text-zinc-100 bg-black/50 rounded-lg border border-zinc-700 
                        focus:ring-2 focus:ring-terminal focus:border-terminal font-mono transition-all duration-300"
                    >
                        <option value="Global/Remote">Global/Remote 🌍</option>
                        <option value="USA">USA 🇺🇸</option>
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="Germany">Germany 🇩🇪</option>
                        <option value="Canada">Canada 🇨🇦</option>
                        <option value="Europe (EU)">Europe (EU) 🇪🇺</option>
                        <option value="India">India 🇮🇳</option>
                        <option value="Bangladesh">Bangladesh 🇧🇩</option>
                    </select>
                </div>

                {/* Current Location */}
                <div>
                    <label className="block mb-2 text-sm font-mono text-zinc-400">
                        Where are you now?
                    </label>
                    <select
                        value={currentLocation}
                        onChange={(e) => onCurrentLocationChange(e.target.value)}
                        className="block w-full p-3 text-sm text-zinc-100 bg-black/50 rounded-lg border border-zinc-700 
                        focus:ring-2 focus:ring-error focus:border-error font-mono transition-all duration-300"
                    >
                        <option value="">Select Location</option>
                        <option value="Bangladesh">Bangladesh 🇧🇩</option>
                        <option value="India">India 🇮🇳</option>
                        <option value="USA">USA 🇺🇸</option>
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="Canada">Canada 🇨🇦</option>
                        <option value="Germany">Germany 🇩🇪</option>
                        <option value="Europe (EU)">Europe (EU) 🇪🇺</option>
                        <option value="Australia">Australia 🇦🇺</option>
                        <option value="Other">Other 🌍</option>
                    </select>
                </div>
            </div>

            <label className="block mb-2 text-sm font-mono text-zinc-400">
                JOB DESCRIPTION (The job you won't get)
            </label>
            <textarea
                value={jobDescription}
                onChange={(e) => onJobDescriptionChange(e.target.value)}
                rows={6}
                className="block p-4 w-full text-sm text-zinc-100 bg-black/50 rounded-lg border border-zinc-700 
        focus:ring-2 focus:ring-error focus:border-error placeholder-zinc-600 font-mono resize-none
        transition-all duration-300 focus:shadow-[0_0_15px_#ef444455]"
                placeholder="Paste the job description here so we can see exactly why you are unqualified..."
            ></textarea>
        </motion.div>
    );
};
