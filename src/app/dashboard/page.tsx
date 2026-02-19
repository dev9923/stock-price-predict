'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, RefreshCw, AlertCircle, TrendingUp, Newspaper, LogOut, ArrowRight, Clock, Zap, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import StockChart from '@/components/StockChart';
import PredictionPanel from '@/components/PredictionPanel';
import NewsFeed from '@/components/NewsFeed';
import { StockData } from '@/types/stock';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PremiumGate from '@/components/ui/PremiumGate';
import { subscriptionService } from '@/services/subscriptionService';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const querySymbol = searchParams.get('symbol');

  const [symbol, setSymbol] = useState(querySymbol || 'SBIN.NS');
  const [inputSymbol, setInputSymbol] = useState(querySymbol || 'SBIN.NS');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check auth
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
    }
  }, [router]);

  // Sync with query param if it changes
  useEffect(() => {
    if (querySymbol && querySymbol !== symbol) {
      setSymbol(querySymbol);
      setInputSymbol(querySymbol);
    }
  }, [querySymbol, symbol]);

  // Handle live search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputSymbol.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const res = await fetch(`/api/stock/search?q=${inputSymbol}`);
        const data = await res.json();
        if (data.quotes) {
          setSuggestions(data.quotes);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [inputSymbol]);

  useEffect(() => {
    if (user) {
      fetchData(symbol);
    }
  }, [symbol, user]);

  const fetchData = async (sym: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stock?symbol=${sym}`);
      if (!res.ok) throw new Error('Failed to fetch stock data');
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (err) {
      console.error(err);
      setError('Could not load data. Please check the symbol and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputSymbol.trim()) {
      setSymbol(inputSymbol.toUpperCase().trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setInputSymbol(suggestion.symbol);
    setSymbol(suggestion.symbol);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-100">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Banking Terminal
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-gray-500 font-medium">Market Analysis for <span className="text-blue-600">Premium User</span></p>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
                  <ShieldCheck className="text-green-500" size={12} />
                  <span className="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-tighter">Identity Verified</span>
                </div>
                {data && (
                  <div className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${data.marketStatus === 'open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${data.marketStatus === 'open' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                    Market {data.marketStatus}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800/50">
              <Globe size={12} className="text-blue-500" /> NSE/BSE + Google Cloud Data Sync
            </div>
            <div className="relative flex-1 md:w-96">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={inputSymbol}
                  onChange={(e) => setInputSymbol(e.target.value)}
                  onFocus={() => inputSymbol.length >= 2 && setShowSuggestions(true)}
                  placeholder="Search (e.g. SBIN, RELIANCE)..."
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 font-medium shadow-inner"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <button
                  type="submit"
                  className="absolute right-3 top-2.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-100"
                >
                  Search
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <>
                  <div
                    className="fixed inset-0 z-40" // Increased z-index for overlay
                    onClick={() => setShowSuggestions(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto ring-1 ring-black/5 dark:ring-white/5"> {/* Increased z-index for dropdown */}
                    {loadingSuggestions ? (
                      <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center">
                        <RefreshCw className="animate-spin text-blue-600 mb-3" size={24} />
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Searching...</p>
                      </div>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(s)}
                          className="w-full flex items-center justify-between p-4 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0 text-left group"
                        >
                          <div className="flex flex-col">
                            <span className="font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors tracking-tight">{s.symbol}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px] font-medium">{s.name}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-800/50">{s.exch}</span>
                            <span className="text-[9px] text-gray-400 mt-1.5 uppercase font-bold tracking-tighter">{s.type}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No matching assets found</p>
                        <p className="text-[10px] text-gray-500 mt-1">Try a different symbol or exchange code</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Status / Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 font-bold">
            <AlertCircle size={24} />
            {error}
          </div>
        )}

        {loading && !data && (
          <div className="flex flex-col justify-center items-center h-96 space-y-4">
            <RefreshCw className="animate-spin text-blue-600" size={48} />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Synchronizing Data...</p>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-700">

            {/* Main Chart Section (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Prediction Summary Cards */}
              <PremiumGate feature="AI Prediction Engine: Institutional forecast for the next 5 days">
                <PredictionPanel prediction={data.prediction} currentPrice={data.history[data.history.length - 1]?.close || 0} currencySymbol={data.currencySymbol} />
              </PremiumGate>

              {/* Main Chart */}
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{data.symbol} <span className="text-sm font-normal text-gray-400">({data.exchangeName})</span> Performance</h3>
                    <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">Historical OHLCV + AI Trend Forecast</p>
                  </div>
                </div>
                <div className="p-0">
                  <StockChart data={data.history} prediction={data.prediction} symbol={data.symbol} currencySymbol={data.currencySymbol} />
                </div>
              </div>

              {/* Technical Indicators Summary */}
              <PremiumGate feature="Advanced Technical Oscillators: Live RSI, SMA, and MACD divergence signals">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'RSI (14)', value: data.indicators.rsi?.toFixed(2) || 'N/A', color: (data.indicators.rsi > 70 ? 'text-red-500' : data.indicators.rsi < 30 ? 'text-green-500' : 'text-blue-600') },
                    { label: 'SMA (50)', value: `${data.currencySymbol}${data.indicators.sma50?.toFixed(2) || 'N/A'}`, color: 'text-gray-900 dark:text-white' },
                    { label: 'MACD Signal', value: data.indicators.macd?.MACD?.toFixed(2) || 'N/A', color: ((data.indicators.macd?.MACD ?? 0) > 0 ? 'text-green-600' : 'text-red-500') },
                    { label: 'Vol (Daily)', value: `${(data.history[data.history.length - 1]?.volume / 1000000).toFixed(1)}M`, color: 'text-gray-900 dark:text-white' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm text-center group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest">{stat.label}</p>
                      <p className={`text-2xl font-black ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </PremiumGate>
            </div>

            {/* Sidebar: News & Details (1/3 width) */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-8 shadow-xl shadow-gray-200/50 dark:shadow-none">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <Newspaper className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  Sector News
                </h3>
                <NewsFeed news={data.news} />
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[32px] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-lg font-bold mb-4 relative z-10 flex items-center gap-2">
                  <Zap size={18} className="fill-white" /> AI Methodology
                </h3>
                <p className="text-sm text-blue-100 leading-relaxed mb-6 relative z-10">
                  Our neural ensemble integrates cross-exchange data from <b>NSE, BSE, and Google Finance</b>.
                  Predictions are calculated using volume-weighted regression with EMA-RSI divergence checks.
                </p>
                <Link href="/methodology" className="flex items-center gap-2 text-white font-bold text-sm hover:underline relative z-10 font-sans">
                  Read Whitepaper <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center"><RefreshCw className="animate-spin text-blue-600" size={48} /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
