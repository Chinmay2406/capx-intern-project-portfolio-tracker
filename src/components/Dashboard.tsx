import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import type { Stock, PortfolioMetrics } from '../types';

interface DashboardProps {
  stocks: Stock[];
  metrics: PortfolioMetrics;
}

export function Dashboard({ stocks, metrics }: DashboardProps) {
  const chartData = stocks.map(stock => ({
    name: stock.symbol,
    value: stock.current_price * stock.quantity,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Total Value</h3>
          <DollarSign className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-2xl font-bold mt-2">${metrics.totalValue.toFixed(2)}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Total Gain/Loss</h3>
          {metrics.totalGainLoss >= 0 ? (
            <TrendingUp className="w-6 h-6 text-green-500" />
          ) : (
            <TrendingDown className="w-6 h-6 text-red-500" />
          )}
        </div>
        <p className={`text-2xl font-bold mt-2 ${
          metrics.totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          ${Math.abs(metrics.totalGainLoss).toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Portfolio Distribution</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}