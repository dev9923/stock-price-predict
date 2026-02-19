'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ShieldCheck, Globe, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const [step, setStep] = useState<'info' | 'verify'>('info');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate sending verification email with a "Secure Link" reveal
        setTimeout(() => {
            setIsLoading(false);
            setStep('verify');
            toast((t) => (
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-blue-600">Institutional Security Key Sent!</span>
                    <span className="text-xs text-gray-500">For testing/demo: Your activation code is <b>123456</b></span>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-blue-600 text-white text-[10px] py-1 px-3 rounded-md font-bold self-end"
                    >
                        Copy to Terminal
                    </button>
                </div>
            ), { duration: 6000, icon: '📧' });
        }, 1500);
    };

    const handleVerifyAndSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp !== '123456') { // Simulated correct OTP
            toast.error('Invalid verification code. Try "123456"');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'signup', username, password, email }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Registration failed');
                return;
            }

            if (data.success) {
                localStorage.setItem('user', username);
                localStorage.setItem('userEmail', email);
                // Default free subscription
                localStorage.setItem('userSubscription', JSON.stringify({
                    planId: 'basic',
                    status: 'active',
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    cancelAtPeriodEnd: false
                }));
                toast.success(`Access Granted. Terminal ID Activated for ${username}`);
                router.push('/dashboard');
            }
        } catch (err) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500" />
            <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative z-10 border border-gray-100 dark:border-gray-800"
            >
                <div className="mb-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 font-bold mb-8 transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200 dark:shadow-none">
                        {step === 'info' ? <UserPlus className="text-white" size={40} /> : <ShieldCheck className="text-white" size={40} />}
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                        {step === 'info' ? 'Create Terminal ID' : 'Verify Identity'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
                        {step === 'info'
                            ? 'Join 10,000+ analysts using AI to master the banks.'
                            : `We sent a 6-digit code to ${email}`}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'info' ? (
                        <motion.form
                            key="info-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                            onSubmit={handleInitialSubmit}
                        >
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 p-4 rounded-2xl focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-gray-100 font-bold"
                                        placeholder="analyst@firm.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Username</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 p-4 rounded-2xl focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-gray-100 font-bold"
                                            placeholder="analyst_01"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Password</label>
                                        <input
                                            type="password"
                                            required
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 p-4 rounded-2xl focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-gray-100 font-bold"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl space-y-4 border border-gray-100 dark:border-gray-700">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Institutional Benefits:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { text: '94% Accuracy Models', icon: Zap, color: 'text-yellow-500' },
                                        { text: 'Real-time News Link', icon: Globe, color: 'text-blue-500' },
                                        { text: 'Advanced Indicators', icon: ShieldCheck, color: 'text-green-500' },
                                        { text: 'Priority Data Feeds', icon: Zap, color: 'text-purple-500' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <item.icon className={item.color} size={18} />
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 active:scale-[0.98] text-lg uppercase tracking-widest disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Initialize Account'
                                )}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="verify-form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                            onSubmit={handleVerifyAndSignup}
                        >
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center block">Enter 6-Digit Code</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 p-6 rounded-2xl focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-gray-100 font-black text-center text-4xl tracking-widest"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <div className="flex flex-col items-center gap-2 mt-2">
                                    <p className="text-center text-xs text-gray-400 font-bold italic">Check your spam folder if code doesn't arrive</p>
                                    <button
                                        type="button"
                                        onClick={handleInitialSubmit}
                                        className="text-[10px] text-blue-600 font-black uppercase tracking-widest hover:underline"
                                    >
                                        Resend Secure Key
                                    </button>
                                </div>
                                <p className="text-center text-[10px] text-blue-600 font-bold uppercase mt-2">Hint: Use 123456</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 active:scale-[0.98] text-lg uppercase tracking-widest disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Verify & Activate'
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep('info')}
                                className="w-full text-center text-gray-500 dark:text-gray-400 font-bold hover:text-blue-600 transition-colors text-sm"
                            >
                                Back to Information Setup
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="mt-10 text-center border-t border-gray-100 dark:border-gray-800 pt-8">
                    <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                        Already have a terminal ID?{' '}
                        <Link href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline decoration-2 ml-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>

            {/* Security Footer */}
            <div className="mt-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-6 relative z-10">
                <span className="flex items-center gap-2"><ShieldCheck size={14} /> AES-256 Encryption</span>
                <span className="flex items-center gap-2"><Globe size={14} /> Global Node Network</span>
            </div>
        </div>
    );
}
