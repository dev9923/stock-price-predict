# 🧠 Stock Price Predictor

**Stock Price Predictor** is an AI-powered full-stack web app that forecasts stock prices and trends using real-time data, technical indicators, and predictive modeling. Built with **React**, **TypeScript**, and **Framer Motion**, it showcases a modular architecture with premium feature gating and mock/live API support.

---

## 🚀 Features

* 📈 **Live Stock Widget** – Real-time price data with high/low, volume, trends
* 🤖 **Prediction Engine** – AI-predicted price, confidence, and analysis
* 🔐 **Premium Access Control** – Toggle access to gated features
* 🎨 **Responsive UI** – Tailwind CSS, animated with Framer Motion
* 🚀 **Fast Vite Bundler** – Instant development and production builds

---

## 🔧 Widgets

### 📈 LiveStockWidget

* Real-time pricing
* Daily high, low, volume
* Refreshes every 30s

### 🤖 PredictionWidget

* Uses AI model to predict stock price
* Displays price delta, percentage, and trend icon
* Includes confidence score and analysis
* Technical indicators: RSI, MACD, SMA20, SMA50
* Premium-gated

---

## 📅 API Mock/Live Integration

* `stockApi.ts` uses **mock data** by default
* Replace with live API (e.g., Alpha Vantage)

```ts
// Example integration
const response = await fetch(`https://api.example.com/predict?symbol=YESBANK&apikey=yourKey`);
```

* Add `.env` support with `import.meta.env.VITE_API_KEY`

---

## 🚧 Setup & Development

### 1. Clone the Repo

```
git clone https://github.com/dev9923/stock-price-predict.git
cd stock-price-predict
```

### 2. Install Dependencies

```
npm install
# or
yarn
```

### 3. Run Locally

```
npm run dev
```

Visit `http://localhost:3000` to see the live app.
