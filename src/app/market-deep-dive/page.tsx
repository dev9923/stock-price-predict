'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    RefreshCw,
    Clock,
    Globe,
    Zap,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TICKERS = [
    'SBIN.NS', 'HDFCBANK.NS', 'RELIANCE.NS', 'TCS.NS', 'INFY.NS', 'TATAMOTORS.NS',
    'ICICIBANK.NS', 'AXISBANK.NS', 'KOTAKBANK.NS', 'ADANIENT.NS', 'BHARTIARTL.NS',
    'ITC.NS', 'HINDUNILVR.NS', 'LT.NS', 'BAJFINANCE.NS', 'MARUTI.NS', 'SUNPHARMA.NS',
    'TITAN.NS', 'ULTRACEMCO.NS', 'JSWSTEEL.NS', 'POWERGRID.NS', 'NTPC.NS', 'M&M.NS',
    'TATASTEEL.NS', 'WIPRO.NS', 'HCLTECH.NS', 'ASIANPAINT.NS', 'ONGC.NS', 'COALINDIA.NS',
    '500112.BO', '500180.BO', '532174.BO', '500325.BO', '532540.BO', '532215.BO'
];

export default function MarketDeepDive() {
    const [trendingStocks, setTrendingStocks] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [lastUpdated, setLastUpdated] = useState('');

    const fetchTrendingPrices = async () => {
        setLoading(true);
        try {
            const results = await Promise.all(
                TICKERS.map(async (symbol) => {
                    const res = await fetch(`/api/stock?symbol=${symbol}`);
                    const data = await res.json();
                    return {
                        symbol: data.symbol || symbol,
                        price: data.quote?.regularMarketPrice || 0,
                        change: data.quote?.regularMarketChangePercent || 0,
                        exchange: data.exchangeName || 'Market'
                    };
                })
            );
            setTrendingStocks(results.filter(s => s.price > 0));
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (error) {
            console.error("Failed to fetch trending prices:", error);
        } finally {
            setLoading(false);
        }
    };

    // Global Search Effect
    useEffect(() => {
        const performSearch = async () => {
            if (searchQuery.length < 2) {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            try {
                const res = await fetch(`/api/stock/search?q=${searchQuery}`);
                const data = await res.json();
                if (data.quotes) {
                    const priceResults = await Promise.all(
                        data.quotes.slice(0, 12).map(async (q: any) => {
                            try {
                                const pRes = await fetch(`/api/stock?symbol=${q.symbol}`);
                                const pData = await pRes.json();
                                return {
                                    symbol: q.symbol,
                                    name: q.name,
                                    price: pData.quote?.regularMarketPrice || 0,
                                    change: pData.quote?.regularMarketChangePercent || 0,
                                    exchange: q.exch || 'NSE/BSE'
                                };
                            } catch {
                                return { symbol: q.symbol, name: q.name, price: 0, change: 0, exchange: q.exch };
                            }
                        })
                    );
                    setSearchResults(priceResults.filter(s => s.price > 0));
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsSearching(false);
            }
        };

        const timer = setTimeout(performSearch, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        fetchTrendingPrices();
        const interval = setInterval(fetchTrendingPrices, 60000);
        return () => clearInterval(interval);
    }, []);

    const displayStocks = searchQuery.length >= 2 ? searchResults : trendingStocks;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-black text-xs uppercase tracking-widest mb-4 transition-colors">
                            <ArrowLeft size={16} /> Back to Terminal
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <Globe className="text-blue-600" size={32} /> Institutional Deep Dive
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Real-time OHLCV monitoring for 5000+ BSE & NSE assets.</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Feed Status</span>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${isSearching ? 'bg-blue-500' : 'bg-green-500'}`} />
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{isSearching ? 'Fetching Neural Data...' : 'Live Data Connected'}</span>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-gray-200 dark:bg-gray-800 mx-2" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Sync</span>
                            <span className="text-sm font-bold text-blue-600">{lastUpdated || '--:--:--'}</span>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="md:col-span-2 relative">
                        <input
                            type="text"
                            placeholder="Search 5,000+ Assets by Name or Symbol (e.g. Bank of Baroda, RELIANCE)..."
                            className="w-full bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-5 rounded-[2rem] focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-gray-100 font-bold shadow-lg shadow-gray-100/50 dark:shadow-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {isSearching ? <RefreshCw className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-600 animate-spin" size={24} /> : <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />}
                    </div>
                    <button
                        onClick={fetchTrendingPrices}
                        className="bg-blue-600 text-white font-black rounded-[2rem] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest"
                    >
                        <RefreshCw className={loading ? 'animate-spin' : ''} size={20} /> Force Sync
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading && displayStocks.length === 0 ? (
                        Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-[2.5rem] animate-pulse">
                                <div className="w-20 h-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4" />
                                <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-6" />
                                <div className="w-24 h-4 bg-gray-100 dark:bg-gray-800 rounded-full" />
                            </div>
                        ))
                    ) : (
                        displayStocks.map((s, i) => (
                            <Link
                                key={i}
                                href={`/dashboard?symbol=${s.symbol}`}
                                className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/20 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 text-[10px] font-black text-gray-400 uppercase tracking-tighter opacity-20 group-hover:opacity-100 group-hover:text-blue-500 transition-opacity">
                                    {s.exchange}
                                </div>
                                <div className={`w-12 h-12 ${searchQuery.length >= 2 ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200/50 dark:shadow-none`}>
                                    <BarChart3 size={24} />
                                </div>
                                <h3 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 truncate w-full px-2" title={s.name || s.symbol}>{s.name || s.symbol}</h3>
                                <p className="text-xs font-bold text-blue-600/60 mb-2">{s.symbol}</p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter">₹{Number(s.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${s.change >= 0 ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {s.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    {Math.abs(s.change).toFixed(2)}%
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {displayStocks.length === 0 && !loading && !isSearching && (
                    <div className="text-center py-32">
                        <Zap className="mx-auto text-gray-200 mb-6" size={64} />
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No Neural Match Found</h3>
                        <p className="text-gray-500 font-medium tracking-tight">The selected asset might be delisted or on a private exchange.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
