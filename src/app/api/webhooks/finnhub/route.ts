import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const secret = request.headers.get('x-finnhub-secret');
    const expectedSecret = process.env.FINNHUB_WEBHOOK_SECRET;

    // Verify webhook source
    if (secret !== expectedSecret) {
        console.error('Invalid Webhook Secret received from Finnhub');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const payload = await request.json();
        const { data, type } = payload;

        console.log(`[Finnhub Webhook] Received ${type} event:`, JSON.stringify(data, null, 2));

        // Process trade data
        if (type === 'trade') {
            data.forEach((trade: any) => {
                const { s: symbol, p: price, t: timestamp, v: volume } = trade;
                console.log(`[Trade Alert] ${symbol} traded at ₹${price} (Vol: ${volume}) at ${new Date(timestamp).toLocaleTimeString()}`);
            });
        }

        // Process news data
        if (type === 'news') {
            console.log(`[News Alert] Fresh news for ${data.length} assets received.`);
        }

        return NextResponse.json({ success: true, message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Support for Finnhub webhook validation (though they usually just expect 2xx on POST)
export async function GET() {
    return NextResponse.json({ status: 'active', provider: 'Finnhub' });
}
