'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, TrendingUp, Crown, Brain, Sun, Moon, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(storedUser);

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userSubscription');
        setUser(null);
        router.push('/login');
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'About', path: '/about' },
        { name: 'Methodology', path: '/methodology' },
        { name: 'Results', path: '/results' },
        { name: 'Contact', path: '/contact' },
    ];

    const isHome = pathname === '/';
    const textColor = (scrolled || !isHome)
        ? 'text-gray-900 dark:text-white'
        : (theme === 'light' ? 'text-gray-900' : 'text-white');

    const linkColor = (itemPath: string) => {
        const isActive = pathname === itemPath;
        if (scrolled || !isHome) {
            return isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400';
        }
        if (theme === 'light') {
            return isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600';
        }
        return isActive ? 'text-white' : 'text-white/80 hover:text-white';
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${(scrolled || !isHome) ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <span className={`text-xl font-extrabold tracking-tight ${textColor}`}>
                                StockSage Pro
                            </span>
                            <div className="text-xs text-blue-600 font-medium font-bold uppercase tracking-wider">AI Trading Platform</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`font-bold text-sm transition-colors duration-200 ${linkColor(item.path)}`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-xl transition-all duration-200 ${(scrolled || !isHome) ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800' : (theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10')}`}
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 ${(scrolled || !isHome) ? 'text-gray-900 dark:text-white' : (theme === 'light' ? 'text-gray-900 border-gray-200 bg-gray-50' : 'text-white bg-transparent border-white/20')}`}>
                                    <User size={16} />
                                    <span className="text-sm font-bold">{user}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className={`p-2 rounded-xl transition-all duration-200 ${(scrolled || !isHome) ? 'text-red-500 hover:bg-red-50' : (theme === 'light' ? 'text-red-500 hover:bg-red-50' : 'text-white/80 hover:bg-white/10')}`}
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                                <Link
                                    href="/pricing"
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl shadow-blue-200 dark:shadow-none"
                                >
                                    <Crown className="h-4 w-4" />
                                    <span className="font-black italic">Upgrade</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className={`font-black text-sm transition-colors duration-200 ${(scrolled || !isHome) ? 'text-gray-900 dark:text-white hover:text-blue-600' : (theme === 'light' ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-white/80')}`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-xl shadow-blue-200 text-sm font-black"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${(scrolled || !isHome) ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : (theme === 'light' ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10')
                            }`}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block py-3 px-4 rounded-lg font-medium transition-colors ${pathname === item.path
                                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                            : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800 mt-2 pt-4">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Theme</span>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                                >
                                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                </button>
                            </div>

                            {user ? (
                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase">Logged in as</p>
                                            <p className="text-sm font-black text-gray-900 dark:text-white">{user}</p>
                                        </div>
                                    </div>

                                    <Link
                                        href="/pricing"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center space-x-2 px-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
                                    >
                                        <Crown className="h-4 w-4" />
                                        <span className="font-bold">Upgrade to Premium</span>
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border-2 border-red-100 dark:border-red-900/30 text-red-600 font-bold hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center py-4 px-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
