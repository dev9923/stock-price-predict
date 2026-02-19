import { NextResponse } from 'next/server';
import { getStockHistory, getStockQuote, getStockNews, calculatePrediction, calculateIndicators, isIndianMarketOpen } from '@/lib/finance'; // Adjust import based on your lib structure

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'SBIN.NS';

    try {
        const [history, quote, news] = await Promise.all([
            getStockHistory(symbol),
            getStockQuote(symbol),
            getStockNews(symbol),
        ]);

        // Merge latest quote into history for "Today" accuracy
        const todayStr = new Date().toISOString().split('T')[0];
        if (history.length > 0) {
            const lastPoint = history[history.length - 1];
            if (lastPoint.date === todayStr) {
                // Update today's candle with live price if it exists
                lastPoint.close = quote.regularMarketPrice || lastPoint.close;
            } else if (quote.regularMarketPrice > 0) {
                // Append today's live point if missing
                history.push({
                    date: todayStr,
                    open: quote.regularMarketPrice,
                    high: quote.regularMarketPrice,
                    low: quote.regularMarketPrice,
                    close: quote.regularMarketPrice,
                    volume: 0
                });
            }
        }

        const indicators = calculateIndicators(history);
        const prediction = calculatePrediction(history, quote.regularMarketPrice);
        const marketStatus = isIndianMarketOpen() ? 'open' : 'closed';

        const currency = quote.currency || 'INR';
        const currencySymbol = (currency === 'INR' || symbol.endsWith('.NS') || symbol.endsWith('.BO')) ? '₹' : (quote.currency === 'USD' ? '$' : '₹');
        const exchangeName = quote.exchangeName || (symbol.endsWith('.NS') ? 'NSE' : (symbol.endsWith('.BO') ? 'BSE' : 'Market'));

        return NextResponse.json({
            symbol: quote.symbol || symbol,
            currency,
            currencySymbol,
            exchangeName,
            marketStatus,
            quote,
            history,
            indicators,
            prediction,
            news,
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
