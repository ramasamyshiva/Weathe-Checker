import React, { useState, useCallback } from 'react';
import InfoCard from './InfoCard';
import { WeatherData } from '../types';
import { askGeminiAboutWeather } from '../services/geminiService';

interface AskGeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
  weatherData: WeatherData;
}

const AskGeminiModal: React.FC<AskGeminiModalProps> = ({ isOpen, onClose, weatherData }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestions = [
    "What should I wear today?",
    "Is it a good day for a walk?",
    "Will I need an umbrella?",
    "How will the wind affect my commute?",
  ];

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
        setQuestion('');
        setResponse('');
        setError(null);
    }, 300);
  }, [onClose]);

  const handleSubmit = useCallback(async (currentQuestion: string) => {
    if (!currentQuestion.trim() || !weatherData) return;

    setIsLoading(true);
    setError(null);
    setResponse('');
    setQuestion(currentQuestion);

    try {
      const result = await askGeminiAboutWeather(currentQuestion, weatherData);
      setResponse(result);
    } catch (err) {
      setError((err as Error).message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [weatherData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <InfoCard className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-sky-400 to-blue-600 text-white rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a.75.75 0 01.75.75V6h-1.5V3.25A.75.75 0 0112 2.5zM7.757 7.757a.75.75 0 011.06 0l1.44 1.44a.75.75 0 01-1.06 1.06l-1.44-1.44a.75.75 0 010-1.06zm8.486 0a.75.75 0 010 1.06l-1.44 1.44a.75.75 0 01-1.06-1.06l1.44-1.44a.75.75 0 011.06 0zM12 11.25a.75.75 0 01.75.75v2.5h-1.5v-2.5a.75.75 0 01.75-.75zM18 12a.75.75 0 01.75.75v1.5h-2.5v-1.5A.75.75 0 0118 12zm-5.692-2.243a.75.75 0 011.06 0l1.94 1.94a.75.75 0 11-1.06 1.06l-1.94-1.94a.75.75 0 010-1.06zM6 12a.75.75 0 01.75-.75h1.5v2.5H6.75A.75.75 0 016 12zm3.308 3.707a.75.75 0 010 1.06l-1.94 1.94a.75.75 0 11-1.06-1.06l1.94-1.94a.75.75 0 011.06 0zM12 18a.75.75 0 01.75.75v2.25h-1.5V18.75A.75.75 0 0112 18zm3.75-2.25a.75.75 0 011.06 0l1.44 1.44a.75.75 0 01-1.06 1.06l-1.44-1.44a.75.75 0 010-1.06z" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Ask Gemini</h2>
              <p className="text-slate-400">Ask about the weather in <span className="text-[#00aaff] font-semibold">{weatherData.location}</span></p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="mt-6 space-y-4">
            <div className="bg-white/5 p-4 rounded-lg min-h-[80px] flex items-center justify-center">
                {isLoading ? (
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-slate-300"></div>
                        <span>Gemini is thinking...</span>
                    </div>
                ) : error ? (
                    <p className="text-red-400 text-center">{error}</p>
                ) : response ? (
                    <p className="text-slate-200">{response}</p>
                ) : (
                    <p className="text-slate-400">Ask a question or try a suggestion below.</p>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {suggestions.map(s => (
                    <button key={s} onClick={() => handleSubmit(s)} className="px-3 py-1 bg-white/10 text-slate-300 rounded-full text-sm hover:bg-white/20 transition-colors">
                        {s}
                    </button>
                ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(question); }} className="flex gap-2">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., Is it safe to fly a kite?"
                    className="flex-grow bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00aaff] transition-all"
                />
                <button type="submit" disabled={isLoading || !question.trim()} className="p-3 rounded-full bg-[#00aaff] hover:bg-sky-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                </button>
            </form>
        </div>
      </InfoCard>
    </div>
  );
};

export default AskGeminiModal;
