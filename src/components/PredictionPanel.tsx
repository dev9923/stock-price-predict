import { PredictionResult } from '@/types/stock';
import { ArrowUp, ArrowDown, Minus, Activity, ShieldCheck } from 'lucide-react';

export default function PredictionPanel({ prediction, currentPrice, currencySymbol = '₹' }: { prediction: PredictionResult; currentPrice: number; currencySymbol?: string }) {
    const { nextDay, trend, confidence } = prediction;

    const diff = nextDay - currentPrice;
    const percentChange = (diff / currentPrice) * 100;

    const isUp = trend === 'up';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-xl relative overflow-hidden group shadow-sm">
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-110 ${isUp ? 'bg-green-500' : 'bg-red-500'}`} />
                <h3 className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2">
                    <Activity size={16} /> Next Closing Probable
                </h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {currencySymbol}{nextDay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${isUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {diff > 0 ? '+' : ''}{percentChange.toFixed(2)}%
                    </span>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2">
                    {isUp ? <ArrowUp size={16} className="text-green-500" /> : <ArrowDown size={16} className="text-red-500" />}
                    Trend Forecast
                </h3>
                <p className={`text-2xl font-bold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {isUp ? 'Bullish' : 'Bearish'} Momentum
                </p>
                <p className="text-xs text-gray-500 mt-1">Based on Linear Regression & SMA</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-500" /> Model Confidence
                </h3>
                <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${Math.min(confidence * 100, 100)}%` }}
                        />
                    </div>
                    <span className="text-gray-900 dark:text-white font-bold text-sm">{(confidence * 100).toFixed(0)}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">R-Squared Fit</p>
            </div>
        </div>
    );
}
