import React from 'react';
import { motion } from 'framer-motion';
import { Skull } from 'lucide-react';

interface ToxicButtonProps {
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export const ToxicButton: React.FC<ToxicButtonProps> = ({ onClick, isLoading, disabled }) => {
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
        w-full py-4 px-6 mt-6 
        font-bold text-white text-xl tracking-wider uppercase
        bg-error border-2 border-transparent
        shadow-[0_0_20px_#ef444455]
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:shadow-[0_0_40px_#ef4444] hover:animate-shake hover:border-white
        flex items-center justify-center gap-3
        ${isLoading ? 'cursor-wait' : ''}
      `}
        >
            {isLoading ? (
                <span className="flex items-center animate-pulse">
                    <Skull className="mr-2 w-6 h-6 animate-spin" />
                    INITIALIZING DESTRUCTION...
                </span>
            ) : (
                <>
                    <Skull className="w-6 h-6" />
                    DESTROY MY CAREER 🔥
                    <Skull className="w-6 h-6" />
                </>
            )}
        </motion.button>
    );
};
