export interface StockDataPoint {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    source: string;
}

export interface Indicators {
    rsi: number;
    sma50: number;
    sma200: number;
    macd: { MACD?: number; signal?: number; histogram?: number } | undefined;
}

export interface PredictionResult {
    nextDay: number;
    next5Days: number[];
    trend: 'up' | 'down' | 'neutral';
    confidence: number;
}

export interface StockData {
    symbol: string;
    currency: string;
    currencySymbol: string;
    exchangeName: string;
    quote: any;
    history: StockDataPoint[];
    indicators: Indicators;
    prediction: PredictionResult;
    news: NewsItem[];
    marketStatus: 'open' | 'closed';
}
