import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react'; // Added icons

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault(); // Standard form behavior
        if (login(email, password)) {
            setEmail('');
            setPassword('');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-10 w-full max-w-md border border-gray-100">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg shadow-blue-200">
                        R
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">Please enter your details to sign in.</p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                placeholder="name@company.com"
                                required
                                autoComplete='email'
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-gray-800 font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-gray-800 font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2 mt-4"
                    >
                        Sign In
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Demo Credentials Footer */}
                <div className="mt-10 pt-8 border-t border-gray-50">
                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50">
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 text-center">Demo Access</p>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-blue-700 font-semibold">abc@gmail.com</span>
                            <span className="text-blue-300">|</span>
                            <span className="text-blue-700 font-semibold">abc12</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
