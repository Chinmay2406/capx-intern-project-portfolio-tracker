import { supabase } from './supabase';

const FINNHUB_API_KEY = 'cn7mhqpr01qjd6u5ctg0cn7mhqpr01qjd6u5ctgg';

export async function getStockPrice(symbol: string): Promise<number> {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    return data.c || 0; // Current price
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return 0;
  }
}

export async function getRandomStocks(): Promise<string[]> {
  const stockPool = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META',
    'NVDA', 'TSLA', 'JPM', 'V', 'WMT'
  ];
  
  // Randomly select 5 stocks
  const selectedStocks = [];
  const poolCopy = [...stockPool];
  
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * poolCopy.length);
    selectedStocks.push(poolCopy[randomIndex]);
    poolCopy.splice(randomIndex, 1);
  }
  
  return selectedStocks;
}

export async function updateStockPrices() {
  const { data: stocks, error } = await supabase
    .from('stocks')
    .select('*');

  if (error || !stocks) {
    console.error('Error fetching stocks:', error);
    return;
  }

  for (const stock of stocks) {
    const currentPrice = await getStockPrice(stock.symbol);
    if (currentPrice > 0) {
      await supabase
        .from('stocks')
        .update({ current_price: currentPrice })
        .eq('id', stock.id);
    }
  }
}