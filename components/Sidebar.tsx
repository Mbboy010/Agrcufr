import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Sprout, Bug, TrendingUp, MessageSquareText, Menu, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const links = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/crops', icon: <Sprout size={20} />, label: 'My Crops' },
    { to: '/pest-control', icon: <Bug size={20} />, label: 'Pest & Disease ID' },
    { to: '/market', icon: <TrendingUp size={20} />, label: 'Market Insights' },
    { to: '/chat', icon: <MessageSquareText size={20} />, label: 'AI Agronomist' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-agri-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto`}>
        <div className="flex items-center justify-between p-6 border-b border-agri-800">
          <div className="flex items-center space-x-2">
            <Sprout className="text-agri-300" size={32} />
            <span className="text-xl font-bold tracking-tight">AgriSmart AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)} // Close on mobile click
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-agri-700 text-white shadow-md' 
                    : 'text-agri-100 hover:bg-agri-800 hover:text-white'
                }`
              }
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-agri-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-agri-700 flex items-center justify-center text-agri-200 font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-agri-300">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
