import React from 'react';
import { motion } from 'framer-motion';

interface JobInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const JobInput: React.FC<JobInputProps> = ({ value, onChange }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full"
        >
            <label className="block mb-2 text-sm font-mono text-zinc-400">
                JOB DESCRIPTION (The job you won't get)
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={8}
                className="block p-4 w-full text-sm text-zinc-100 bg-black/50 rounded-lg border border-zinc-700 
        focus:ring-2 focus:ring-error focus:border-error placeholder-zinc-600 font-mono resize-none
        transition-all duration-300 focus:shadow-[0_0_15px_#ef444455]"
                placeholder="Paste the job description here so we can see exactly why you are unqualified..."
            ></textarea>
        </motion.div>
    );
};
