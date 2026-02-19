'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw, CheckCircle2, ArrowRight, Loader2, CreditCard } from 'lucide-react';
import { subscriptionService } from '@/services/subscriptionService';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'verifying' | 'qr' | 'processing' | 'success'>('verifying');
    const [planData, setPlanData] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    const UPI_ID = "9258039923@paytm";
    const MERCHANT_NAME = "StockSage Pro";

    useEffect(() => {
        setMounted(true);
        const data = searchParams.get('data');
        if (data) {
            try {
                const decoded = JSON.parse(atob(data));
                setPlanData(decoded);

                // Transition to QR code state after initial auth
                setTimeout(() => setStatus('qr'), 1500);
            } catch (e) {
                console.error('Invalid payment data');
                router.push('/pricing');
            }
        } else {
            router.push('/pricing');
        }
    }, [searchParams, router]);

    const upiUri = planData ? `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${planData.amount}&cu=INR&tn=Subscription for ${planData.planName}` : '';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUri)}`;

    const handleConfirmation = async () => {
        setStatus('processing');

        // Simulate background verification
        const success = await subscriptionService.processPayment(planData);
        if (success) {
            setTimeout(() => setStatus('success'), 3000);
        }
    };

    if (!mounted) {
        return <div className="max-w-xl mx-auto px-4 py-16 text-center animate-pulse">
            <Loader2 className="animate-spin text-blue-600 mx-auto" size={48} />
        </div>;
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
            <div className="bg-white dark:bg-gray-900 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-blue-100/50 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden transition-all duration-500">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-50 dark:bg-purple-900/10 rounded-full -ml-16 -mb-16 blur-2xl" />

                {status === 'verifying' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8 relative z-10 py-10"
                    >
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mx-auto">
                            <ShieldCheck className="text-blue-600 dark:text-blue-400" size={40} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Securing Connection</h2>
                            <p className="text-gray-500 font-medium">Connecting to PayTM Secure Gateway...</p>
                        </div>
                        <Loader2 className="animate-spin text-blue-600 mx-auto" size={32} />
                    </motion.div>
                )}

                {status === 'qr' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 relative z-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-left">
                                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Payable Amount</p>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white">₹{planData?.amount?.toLocaleString()}</h2>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl">
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase text-right">Plan</p>
                                <p className="text-sm font-black text-blue-600 dark:text-blue-400 text-right">{planData?.planName}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-inner border-2 border-dashed border-gray-100 dark:border-gray-800 mx-auto w-fit">
                            <img src={qrUrl} alt="UPI QR Code" className="w-[200px] h-[200px] rounded-xl" />
                        </div>

                        <div className="space-y-3">
                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs italic">ptm</div>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{UPI_ID}</span>
                                </div>
                                <span className="text-[10px] font-bold text-green-600 uppercase">Verified</span>
                            </div>

                            <p className="text-xs text-gray-500 font-medium">Scan QR using any UPI app like Google Pay, PhonePe, or PayTM</p>
                        </div>

                        <div className="pt-4 grid grid-cols-1 gap-3">
                            <a
                                href={upiUri}
                                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                            >
                                Pay via UPI App
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <button
                                onClick={handleConfirmation}
                                className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-4 rounded-2xl font-black text-lg transition-all border-2 border-transparent hover:border-blue-600"
                            >
                                I have completed the payment
                            </button>
                        </div>
                    </motion.div>
                )}

                {status === 'processing' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8 relative z-10 py-10"
                    >
                        <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30">
                            <RefreshCw className="text-white animate-spin" size={48} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Verifying Transaction</h2>
                            <p className="text-gray-500 font-medium italic">Our neural network is double-checking your payment token...</p>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                            />
                        </div>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8 relative z-10"
                    >
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-200">
                            <CheckCircle2 className="text-white" size={56} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Access Granted</h2>
                            <p className="text-green-600 font-bold uppercase tracking-widest text-sm">₹{planData?.amount} Received - {planData?.planName} Activated</p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 text-left border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-500 text-xs font-bold uppercase">Subscriber</span>
                                <span className="text-gray-900 dark:text-white font-black text-sm">{localStorage.getItem('user') || 'StockTrader_99'}</span>
                            </div>
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-500 text-xs font-bold uppercase">To Merchant</span>
                                <span className="text-gray-900 dark:text-white font-black text-sm">{UPI_ID}</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                <span className="text-gray-900 dark:text-white font-black">Total Charged</span>
                                <span className="text-blue-600 dark:text-blue-400 font-black text-2xl">₹{planData?.amount?.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                        >
                            Back to Dashboard
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-1 pt-24">
                <Suspense fallback={
                    <div className="flex justify-center items-center h-96">
                        <RefreshCw className="animate-spin text-blue-600" size={48} />
                    </div>
                }>
                    <PaymentContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
