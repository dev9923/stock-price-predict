'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Login failed');
                return;
            }

            if (data.success) {
                localStorage.setItem('user', username);

                // Prioritize subscription from backend, fallback to logic
                let subscription = data.subscription;

                if (!subscription) {
                    subscription = username.toLowerCase() === 'admin' ? {
                        planId: 'enterprise',
                        status: 'active',
                        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                        cancelAtPeriodEnd: false
                    } : {
                        planId: 'basic',
                        status: 'active',
                        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                        cancelAtPeriodEnd: false
                    };
                }

                localStorage.setItem('userSubscription', JSON.stringify(subscription));

                const planName = subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1);
                toast.success(`Welcome back, ${username}! ${planName} Access Granted.`);
                router.push('/dashboard');
            }
        } catch (err) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
            {/* Visual Side */}
            <div className="hidden md:flex md:w-1/2 bg-gray-900 relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-800/20 z-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1611974717482-580ce4247501?q=80&w=2670&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center space-y-8"
                >
                    <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/20 ring-4 ring-white/10">
                        <TrendingUp className="text-white" size={48} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            StockSage <span className="text-blue-500">Pro</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-sm mx-auto leading-relaxed">
                            Access institutional-grade AI models trained on over two decades of banking market volatility.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-8">
                        {[
                            { label: 'Verified AI', icon: ShieldCheck },
                            { label: 'Real-time Feed', icon: TrendingUp }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                                <item.icon className="text-blue-400 mx-auto mb-2" size={24} />
                                <span className="text-white text-sm font-bold">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-950 relative transition-colors duration-300">
                <div className="w-full max-w-md space-y-10 relative z-10">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Login To Terminal</h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Enter your credentials to access the forecasting suite.</p>
                        </motion.div>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-6">
                            <div className="group space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest ml-1">Username</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-5 rounded-2xl focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800"
                                    placeholder="admin"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="group space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest ml-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-5 rounded-2xl focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 bg-transparent" />
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-white">Remember session</span>
                            </label>
                            <a href="#" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700">Lost Key?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gray-900 dark:bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-black dark:hover:bg-blue-700 transition-all shadow-xl hover:shadow-gray-200 dark:hover:shadow-none flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    <span>Authorize Access</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            New analyst?{' '}
                            <Link href="/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline decoration-2">
                                Create Terminal ID
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-50" />
            </div>
        </div>
    );
}
