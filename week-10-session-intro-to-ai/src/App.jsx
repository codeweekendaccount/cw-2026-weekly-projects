import { useState } from "react";
import OpenAI from "openai";
import "./App.css";

const SAMPLE_TICKERS = ["TSLA", "AAPL", "META"];

function getDateString(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

function formatPrice(value) {
  if (typeof value !== "number") {
    return "not available";
  }

  return `$${value.toFixed(2)}`;
}

function createFallbackReport(stockData) {
  const reports = stockData.map((stock) => {
    const firstPrice = stock.prices[0]?.c;
    const lastPrice = stock.prices.at(-1)?.c;

    if (!firstPrice || !lastPrice) {
      return `${stock.ticker}: Massive returned ${stock.resultsCount || 0} price rows, but there is not enough data for a clear recommendation.`;
    }

    const change = lastPrice - firstPrice;
    const changePercent = (change / firstPrice) * 100;
    const direction = change >= 0 ? "up" : "down";
    const recommendation = Math.abs(changePercent) < 1 ? "hold" : change > 0 ? "hold" : "watch";

    return `${stock.ticker}: The price moved ${direction} from ${formatPrice(firstPrice)} to ${formatPrice(lastPrice)} (${changePercent.toFixed(2)}%). Simple recommendation: ${recommendation}.`;
  });

  return `Demo fallback report\n\n${reports.join("\n\n")}\n\nOpenRouter is rate-limited right now, so this report was made from the fetched Massive data without AI.`;
}

export default function App() {
  const [tickerInput, setTickerInput] = useState("");
  const [tickers, setTickers] = useState([]);
  const [report, setReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function addTicker(event) {
    event.preventDefault();

    const cleanTicker = tickerInput.trim().toUpperCase();

    if (cleanTicker.length < 2) {
      setError("Please enter a stock ticker, like TSLA.");
      return;
    }

    if (tickers.includes(cleanTicker)) {
      setError(`${cleanTicker} is already in your list.`);
      setTickerInput("");
      return;
    }

    setTickers((currentTickers) => [...currentTickers, cleanTicker]);
    setTickerInput("");
    setError("");
    setReport("");
  }

  function removeTicker(tickerToRemove) {
    setTickers((currentTickers) =>
      currentTickers.filter((ticker) => ticker !== tickerToRemove),
    );
  }

  function useSampleTickers() {
    setTickers(SAMPLE_TICKERS);
    setTickerInput("");
    setError("");
    setReport("");
  }

  async function fetchStockData() {
    if (tickers.length === 0) {
      setError("Add at least one ticker before generating a report.");
      return;
    }

    const apiKey = import.meta.env.VITE_MASSIVE_API_KEY;

    if (!apiKey) {
      setError("Missing VITE_MASSIVE_API_KEY. Add it to your .env file.");
      return;
    }

    setIsLoading(true);
    setError("");
    setReport("");

    try {
      const startDate = getDateString(7);
      const endDate = getDateString(1);

      const stockData = await Promise.all(
        tickers.map(async (ticker) => {
          const url = `https://api.massive.com/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&apiKey=${apiKey}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Massive could not load data for ${ticker}.`);
          }

          const data = await response.json();

          return {
            ticker,
            resultsCount: data.resultsCount,
            prices: data.results ?? [],
          };
        }),
      );

      await fetchReport(stockData);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching stock data.");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchReport(data) {
    console.log("Stock data ready for AI:", data);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
      dangerouslyAllowBrowser: true,
      defaultHeaders: {
        "HTTP-Referer": window.location.origin,
        "X-OpenRouter-Title": "CodeWeekend Stock Report App",
      },
    });

    const messages = [
      {
        role: "system",
        content:
          "You are a financial analyst. Write short, clear stock reports for beginner investors. Use simple English.",
      },
      {
        role: "user",
        content: `
Here is stock data from Massive.com:
${JSON.stringify(data)}

Write a short report with:
1. What happened
2. One simple reason
3. A buy, hold, or sell recommendation

Keep it under 120 words.
`,
      },
    ];

    try {
      const response = await openai.chat.completions.create({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages,
        max_tokens: 180,
        temperature: 0.3,
      });

      setReport(response.choices[0].message.content);
    } catch (err) {
      const isRateLimit =
        err.status === 429 || err.message?.toLowerCase().includes("429");

      if (isRateLimit) {
        console.warn("OpenRouter rate limit reached. Showing fallback report.", err);
        setReport(createFallbackReport(data));
        return;
      }

      throw err;
    }
  }

  return (
    <main className="app">
      <section className="header">
        <h1>Stock Report Generator</h1>
        <p>
          Add stock tickers, fetch real market data, then turn the numbers into
          a clear AI report.
        </p>
      </section>

      <section className="dashboard" aria-label="Stock report workspace">
        <div className="card">
          <h2>1. Add tickers</h2>
          <p className="hint">Use short stock codes like TSLA, AAPL, or META.</p>

          <form onSubmit={addTicker}>
            <label htmlFor="ticker">Stock ticker</label>
            <input
              id="ticker"
              type="text"
              placeholder="TSLA"
              value={tickerInput}
              onChange={(event) => setTickerInput(event.target.value)}
            />
            <button type="submit">Add ticker</button>
          </form>

          <button className="secondary-button" type="button" onClick={useSampleTickers}>
            Use sample tickers
          </button>

          <div className="ticker-list" aria-label="Selected tickers">
            {tickers.length === 0 ? (
              <p className="empty-text">No tickers yet.</p>
            ) : (
              tickers.map((ticker) => (
                <button
                  className="ticker-chip"
                  key={ticker}
                  type="button"
                  onClick={() => removeTicker(ticker)}
                  aria-label={`Remove ${ticker}`}
                >
                  {ticker}
                  <span aria-hidden="true">x</span>
                </button>
              ))
            )}
          </div>

          <button
            className="main-button"
            type="button"
            onClick={fetchStockData}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Report"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="card">
          <h2>2. AI report</h2>
          <p className="hint">The final report will appear here.</p>

          <div className="report-box">
            {isLoading && (
              <p className="loading-message">Reading market data...</p>
            )}

            {!isLoading && report && <p className="report-text">{report}</p>}

            {!isLoading && !report && (
              <div className="empty-state">
                <p>Your AI report is waiting.</p>
                <span>Fetch stock data first, then live-code the AI call.</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
