import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { StockList } from './components/StockList';
import { StockForm } from './components/StockForm';
import { AuthForm } from './components/AuthForm';
import { RandomStockSelector } from './components/RandomStockSelector';
import { useAuth } from './hooks/useAuth';
import { useStocks } from './hooks/useStocks';
import { supabase } from './lib/supabase';
import type { Stock } from './types';
import { PlusCircle } from 'lucide-react';

export default function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { stocks, metrics, fetchStocks } = useStocks(isAuthenticated);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (stockData: Partial<Stock>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (selectedStock) {
      await supabase
        .from('stocks')
        .update(stockData)
        .eq('id', selectedStock.id);
    } else {
      await supabase
        .from('stocks')
        .insert([{ ...stockData, user_id: user.id }]);
    }

    setSelectedStock(null);
    setShowForm(false);
    fetchStocks();
  };

  const handleDelete = async (id: string) => {
    await supabase
      .from('stocks')
      .delete()
      .eq('id', id);
    fetchStocks();
  };

  const handleSell = async (stock: Stock) => {
    const profit = (stock.current_price - stock.purchase_price) * stock.quantity;
    alert(`Stock sold! Profit/Loss: $${profit.toFixed(2)}`);
    await handleDelete(stock.id);
  };

  if (!isAuthenticated) {
    return <AuthForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Tracker</h1>
          <div className="flex space-x-4">
            <RandomStockSelector onStocksAdded={fetchStocks} />
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Stock
            </button>
          </div>
        </div>

        <Dashboard stocks={stocks} metrics={metrics} />

        {showForm && (
          <div className="mb-8">
            <StockForm
              stock={selectedStock || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setSelectedStock(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        <StockList
          stocks={stocks}
          onEdit={(stock) => {
            setSelectedStock(stock);
            setShowForm(true);
          }}
          onDelete={handleDelete}
          onSell={handleSell}
        />
      </div>
    </div>
  );
}