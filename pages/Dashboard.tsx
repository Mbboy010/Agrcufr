import React from 'react';
import { Sun, CloudRain, Wind, Droplets, ArrowUpRight, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Farm Overview</h1>
        <p className="text-gray-600">Welcome back, John. Here's what's happening on your farm today.</p>
      </header>

      {/* Weather Widget */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg md:col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 font-medium">Current Weather</p>
              <h2 className="text-4xl font-bold mt-2">72°F</h2>
              <p className="mt-1">Partly Cloudy</p>
            </div>
            <Sun className="text-yellow-300 w-16 h-16 animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-blue-400">
            <div className="flex items-center space-x-2">
              <Wind size={18} className="text-blue-200" />
              <span className="text-sm font-medium">8 mph</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets size={18} className="text-blue-200" />
              <span className="text-sm font-medium">45% Hum</span>
            </div>
            <div className="flex items-center space-x-2">
              <CloudRain size={18} className="text-blue-200" />
              <span className="text-sm font-medium">10% Rain</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 md:col-span-2 flex flex-col justify-between">
           <div>
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Tasks Due</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="w-5 h-5 rounded border-2 border-agri-500 flex items-center justify-center"></div>
                  <span className="text-gray-700">Irrigate Corn Field B</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                   <div className="w-5 h-5 rounded border-2 border-red-400 flex items-center justify-center"></div>
                  <span className="text-gray-700">Check Soybean monitors</span>
                </div>
              </div>
           </div>
           <button className="text-agri-600 text-sm font-medium hover:underline mt-4 text-left">View all tasks →</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">Expected Yield</h3>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">+12% vs LY</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">4,250 <span className="text-base font-normal text-gray-500">tons</span></p>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-agri-500 w-3/4"></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">75% to annual goal</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">Equipment Health</h3>
            <CheckCircle className="text-agri-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">94% <span className="text-base font-normal text-gray-500">operational</span></p>
          <p className="text-sm text-gray-600 mt-2">1 tractor due for maintenance</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">Alerts</h3>
            <AlertTriangle className="text-orange-500" size={20} />
          </div>
          <div className="space-y-3">
             <div className="flex items-start space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-orange-500"></div>
                <p className="text-sm text-gray-700">Frost warning for tomorrow morning.</p>
             </div>
             <div className="flex items-start space-x-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
                <p className="text-sm text-gray-700">Market price drop for Wheat detected.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
