'use client';

import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // We don't have this, use simple div
import { StockDataPoint, PredictionResult } from '@/types/stock';
import dayjs from 'dayjs';

import { useTheme } from '@/components/ThemeProvider';

interface StockChartProps {
    data: StockDataPoint[];
    prediction: PredictionResult;
    symbol: string;
    currencySymbol?: string;
}

export default function StockChart({ data, prediction, symbol, currencySymbol = '₹' }: StockChartProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Safety check for empty data
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400">
                No chart data available to display
            </div>
        );
    }

    // Prepare chart data
    // Combine history + future prediction
    const lastDate = dayjs(data[data.length - 1].date);

    const formattedHistory = data.map((d, i) => ({
        date: dayjs(d.date).format('MMM DD'),
        fullDate: d.date,
        close: d.close,
        prediction: i === data.length - 1 ? d.close : null,
    }));

    const formattedPrediction = prediction.next5Days.map((val, i) => {
        const nextDate = lastDate.add(i + 1, 'day');
        return {
            date: nextDate.format('MMM DD'),
            fullDate: nextDate.toISOString(),
            close: null,
            prediction: val,
        };
    });

    const chartData = [...formattedHistory, ...formattedPrediction];

    return (
        <div className="w-full h-[500px] p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                    {symbol} <span className="text-sm font-normal text-gray-400">Price History & Forecast</span>
                </h2>
                <div className="flex gap-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Actual</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-500 rounded-full border border-dashed border-white"></div> Prediction</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                    <defs>
                        <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke={isDark ? "#64748b" : "#94a3b8"}
                        tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        minTickGap={30}
                    />
                    <YAxis
                        stroke={isDark ? "#64748b" : "#94a3b8"}
                        tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#0f172a' : '#fff',
                            border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
                            borderRadius: '12px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
                        labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                        formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 'Price']}
                    />

                    {/* Historical Data Area */}
                    <Area
                        type="monotone"
                        dataKey="close"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorClose)"
                        isAnimationActive={true}
                    />

                    {/* Prediction Line (Dashed) */}
                    <Line
                        type="monotone"
                        dataKey="prediction"
                        stroke="#a855f7"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4, fill: '#a855f7', strokeWidth: 2, stroke: '#fff' }}
                        isAnimationActive={true}
                        connectNulls
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
