import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { updateStockPrices } from '../lib/finnhub';
import type { Stock, PortfolioMetrics } from '../types';

export function useStocks(isAuthenticated: boolean) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    totalValue: 0,
    totalGainLoss: 0,
    topPerformer: null,
    worstPerformer: null,
  });

  const fetchStocks = async () => {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stocks:', error);
      return;
    }

    setStocks(data || []);
  };

  const calculateMetrics = () => {
    if (stocks.length === 0) {
      setMetrics({
        totalValue: 0,
        totalGainLoss: 0,
        topPerformer: null,
        worstPerformer: null,
      });
      return;
    }

    const totalValue = stocks.reduce(
      (sum, stock) => sum + stock.current_price * stock.quantity,
      0
    );

    const totalGainLoss = stocks.reduce(
      (sum, stock) =>
        sum + (stock.current_price - stock.purchase_price) * stock.quantity,
      0
    );

    const performanceList = stocks.map(stock => ({
      ...stock,
      performance: (stock.current_price - stock.purchase_price) / stock.purchase_price,
    }));

    const topPerformer = performanceList.reduce((a, b) =>
      a.performance > b.performance ? a : b
    );

    const worstPerformer = performanceList.reduce((a, b) =>
      a.performance < b.performance ? a : b
    );

    setMetrics({
      totalValue,
      totalGainLoss,
      topPerformer,
      worstPerformer,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStocks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    calculateMetrics();
  }, [stocks]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateInterval = setInterval(() => {
      updateStockPrices().then(() => fetchStocks());
    }, 60000);

    return () => clearInterval(updateInterval);
  }, [isAuthenticated]);

  return { stocks, metrics, fetchStocks };
}