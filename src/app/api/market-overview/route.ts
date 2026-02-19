import { NextResponse } from 'next/server';
import { getStockQuote, isIndianMarketOpen } from '@/lib/finance';

const OVERVIEW_SYMBOLS = [
    { symbol: 'SBIN.NS', label: 'SBIN' },
    { symbol: 'HDFCBANK.NS', label: 'HDFCBANK' },
    { symbol: 'RELIANCE.NS', label: 'RELIANCE' },
    { symbol: 'TCS.NS', label: 'TCS' },
    { symbol: 'INFY.NS', label: 'INFY' },
    { symbol: 'ICICIBANK.NS', label: 'ICICIBANK' },
    { symbol: 'AXISBANK.NS', label: 'AXISBANK' },
    { symbol: 'WIPRO.NS', label: 'WIPRO' },
    { symbol: 'BHARTIARTL.NS', label: 'BHARTIARTL' },
];

export async function GET() {
    try {
        const quotes = await Promise.all(
            OVERVIEW_SYMBOLS.map(async (item) => {
                const quote = await getStockQuote(item.symbol);
                // For change percent, we need a bit more data usually, 
                // but let's see if we can derive it or get a slightly better quote
                return {
                    symbol: item.label,
                    currentPrice: quote.regularMarketPrice,
                    changePercent: quote.regularMarketChangePercent?.toFixed(2) || '0.00',
                    trend: (quote.regularMarketChangePercent || 0) >= 0 ? 'up' : 'down'
                };
            })
        );

        return NextResponse.json({
            quotes,
            marketStatus: isIndianMarketOpen() ? 'open' : 'closed'
        });
    } catch (error) {
        console.error('Market Overview API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch market overview' }, { status: 500 });
    }
}
