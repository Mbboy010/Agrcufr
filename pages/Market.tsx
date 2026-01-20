import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { MarketData } from '../types';

const MOCK_MARKET_DATA: MarketData[] = [
  {
    crop: 'Corn',
    price: 6.75,
    unit: 'bu',
    trend: 'up',
    history: [
      { month: 'Jan', price: 5.50 },
      { month: 'Feb', price: 5.80 },
      { month: 'Mar', price: 6.10 },
      { month: 'Apr', price: 5.95 },
      { month: 'May', price: 6.40 },
      { month: 'Jun', price: 6.75 },
    ]
  },
  {
    crop: 'Soybeans',
    price: 14.20,
    unit: 'bu',
    trend: 'down',
    history: [
      { month: 'Jan', price: 15.00 },
      { month: 'Feb', price: 14.90 },
      { month: 'Mar', price: 14.60 },
      { month: 'Apr', price: 14.80 },
      { month: 'May', price: 14.40 },
      { month: 'Jun', price: 14.20 },
    ]
  },
  {
    crop: 'Wheat',
    price: 8.10,
    unit: 'bu',
    trend: 'stable',
    history: [
      { month: 'Jan', price: 7.90 },
      { month: 'Feb', price: 8.00 },
      { month: 'Mar', price: 8.15 },
      { month: 'Apr', price: 8.10 },
      { month: 'May', price: 8.05 },
      { month: 'Jun', price: 8.10 },
    ]
  }
];

const Market: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<MarketData>(MOCK_MARKET_DATA[0]);
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    // Reset insight when crop changes
    setInsight('');
  }, [selectedCrop]);

  const generateInsight = async () => {
    setLoadingInsight(true);
    const text = await GeminiService.generateMarketInsight(
      selectedCrop.crop, 
      selectedCrop.price, 
      selectedCrop.trend
    );
    setInsight(text);
    setLoadingInsight(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Market Insights</h1>
        <p className="text-gray-600">Real-time commodity prices and AI-driven market analysis.</p>
      </header>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_MARKET_DATA.map((data) => (
          <div 
            key={data.crop}
            onClick={() => setSelectedCrop(data)}
            className={`p-6 rounded-xl border cursor-pointer transition-all ${
              selectedCrop.crop === data.crop 
                ? 'bg-agri-50 border-agri-500 shadow-md ring-1 ring-agri-500' 
                : 'bg-white border-gray-100 hover:border-agri-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-700">{data.crop}</h3>
                <p className="text-2xl font-bold mt-1">${data.price.toFixed(2)}</p>
                <span className="text-xs text-gray-400">per {data.unit}</span>
              </div>
              <div className={`p-2 rounded-full ${
                data.trend === 'up' ? 'bg-green-100 text-green-600' :
                data.trend === 'down' ? 'bg-red-100 text-red-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {data.trend === 'up' && <TrendingUp size={20} />}
                {data.trend === 'down' && <TrendingDown size={20} />}
                {data.trend === 'stable' && <Minus size={20} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">{selectedCrop.crop} Price History (6 Months)</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedCrop.history}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#059669" 
                  strokeWidth={3} 
                  dot={{r: 4, fill: '#059669', strokeWidth: 2, stroke: '#fff'}}
                  activeDot={{r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 flex flex-col">
          <div className="flex items-center space-x-2 mb-4 text-indigo-800">
            <Sparkles size={20} />
            <h2 className="font-bold">AI Market Analyst</h2>
          </div>
          
          <div className="flex-1 bg-white/60 rounded-lg p-4 text-sm text-gray-700 leading-relaxed shadow-inner">
             {insight ? (
               <p className="animate-in fade-in duration-500">{insight}</p>
             ) : (
               <p className="text-gray-400 italic">Select a crop and ask for analysis to see AI predictions and context.</p>
             )}
          </div>

          <button 
            onClick={generateInsight}
            disabled={loadingInsight}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors flex justify-center items-center space-x-2"
          >
            {loadingInsight ? (
              <span className="animate-pulse">Analyzing...</span>
            ) : (
              <>
                 <span>Analyze {selectedCrop.crop} Trends</span>
                 <Sparkles size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Market;
