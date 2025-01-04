import React, { useState } from 'react';
import { getRandomStocks, getStockPrice } from '../lib/finnhub';
import { supabase } from '../lib/supabase';
import { Shuffle } from 'lucide-react';

interface RandomStockSelectorProps {
  onStocksAdded: () => void;
}

export function RandomStockSelector({ onStocksAdded }: RandomStockSelectorProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomSelection = async () => {
    setIsLoading(true);
    try {
      const symbols = await getRandomStocks();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      for (const symbol of symbols) {
        const price = await getStockPrice(symbol);
        await supabase.from('stocks').insert({
          symbol,
          name: symbol, // Using symbol as name for simplicity
          quantity: 1,
          purchase_price: price,
          current_price: price,
          user_id: user.id
        });
      }

      onStocksAdded();
    } catch (error) {
      console.error('Error adding random stocks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRandomSelection}
      disabled={isLoading}
      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
    >
      <Shuffle className="w-5 h-5 mr-2" />
      {isLoading ? 'Adding Stocks...' : 'Add Random Stocks'}
    </button>
  );
}