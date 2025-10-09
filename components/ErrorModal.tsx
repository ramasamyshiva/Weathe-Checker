import React from 'react';
import InfoCard from './InfoCard';

interface ErrorModalProps {
  message: string;
  onRetry: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onRetry }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <InfoCard className="max-w-md w-full !border-red-500/50">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-4 text-2xl font-bold text-white">Oops! Something went wrong.</h3>
          <p className="mt-2 text-red-300 bg-red-500/20 px-4 py-2 rounded-md font-mono text-sm">{message}</p>
          
          <div className="mt-6 text-left text-slate-400 space-y-2">
            <p className="font-semibold text-slate-200">Here are a few things to check:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Is your internet connection stable?</li>
              <li>Did you enter a valid location?</li>
              <li>Is the Gemini API key configured correctly?</li>
            </ul>
          </div>

          <div className="mt-8">
            <button 
              onClick={onRetry}
              className="w-full bg-[#00aaff] text-white font-semibold rounded-full px-6 py-3 transition-all duration-300 btn-glow"
            >
              Try Again
            </button>
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default React.memo(ErrorModal);