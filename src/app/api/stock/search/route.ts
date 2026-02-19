import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ quotes: [] });
    }

    try {
        // Yahoo Finance Search/Autocomplete API
        const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=10&newsCount=0&lang=en-US&region=IN`;

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Search failed');

        const data = await res.json();

        // Filter for NSE/BSE stocks mainly, but allow others
        const quotes = (data.quotes || [])
            .filter((q: any) => q.quoteType === 'EQUITY')
            .map((q: any) => ({
                symbol: q.symbol,
                name: q.shortname || q.longname,
                exch: q.exchDisp,
                type: q.typeDisp
            }));

        return NextResponse.json({ quotes });
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
