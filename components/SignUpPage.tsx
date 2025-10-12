import React from 'react';
import InfoCard from './InfoCard';
import LogoIcon from './LogoIcon';

interface SignUpPageProps {
    onSignUp: () => void;
    onSwitchToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onSwitchToLogin }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignUp();
    };

    return (
        <InfoCard className="max-w-md w-full">
            <div className="text-center mb-8">
                <LogoIcon className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white">Create Account</h2>
                <p className="text-slate-400">Get started with WEATHER CHECKER</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        className="mt-1 block w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00aaff]"
                        placeholder="Jane Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        className="mt-1 block w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00aaff]"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        required
                        className="mt-1 block w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00aaff]"
                        placeholder="••••••••"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-[#00aaff] text-white font-semibold rounded-full px-6 py-3 transition-all duration-300 btn-glow"
                >
                    Sign Up
                </button>
            </form>
            <p className="text-center text-sm text-slate-400 mt-6">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="font-semibold text-[#00aaff] hover:underline">
                    Sign in
                </button>
            </p>
        </InfoCard>
    );
};

export default SignUpPage;