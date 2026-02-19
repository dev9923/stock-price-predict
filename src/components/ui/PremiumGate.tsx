'use client';

import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { subscriptionService } from '@/services/subscriptionService';

interface PremiumGateProps {
    children: React.ReactNode;
    feature: string;
}

export default function PremiumGate({ children, feature }: PremiumGateProps) {
    const [mounted, setMounted] = React.useState(false);
    const [user, setUser] = React.useState<string | null>(null);

    React.useEffect(() => {
        setMounted(true);
        setUser(localStorage.getItem('user'));
    }, []);

    // Check real subscription status
    const isPremium = mounted ? subscriptionService.hasPremiumAccess() : false;

    if (isPremium) {
        return <>{children}</>;
    }

    return (
        <div className="relative group">
            <div className="filter blur-[4px] pointer-events-none opacity-50 grayscale transition-all group-hover:blur-[6px]">
                {children}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/5 rounded-2xl backdrop-blur-[2px] transition-all">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] shadow-2xl border border-blue-100 dark:border-gray-800 max-w-sm text-center transform transition-all hover:scale-[1.02]">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200 dark:shadow-none">
                        <Lock className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">Institutional Access Required</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">{feature}</p>

                    {user ? (
                        <Link
                            href="/pricing"
                            className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none"
                        >
                            Upgrade to Premium
                        </Link>
                    ) : (
                        <div className="space-y-3">
                            <Link
                                href="/login"
                                className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                            >
                                Login to Unlock
                            </Link>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New here? <Link href="/signup" className="text-blue-600 hover:underline">Create Account</Link></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
