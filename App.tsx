import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import PestControl from './pages/PestControl';
import Chat from './pages/Chat';
import Market from './pages/Market';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 font-bold text-agri-800">
              <span>AgriSmart AI</span>
            </div>
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
              <Menu size={24} />
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/crops" element={<Crops />} />
                <Route path="/pest-control" element={<PestControl />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/market" element={<Market />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
