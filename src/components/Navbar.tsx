
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Code, 
  Activity, 
  Database, 
  BarChart, 
  Bot, 
  Box
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Code },
    { path: '/visualizer', label: 'Visualizer', icon: Activity },
    { path: '/data-structures', label: 'Data Structures', icon: Database },
    { path: '/complexity', label: 'Complexity', icon: BarChart },
    { path: '/ai-mentor', label: 'AI Mentor', icon: Bot },
    { path: '/3d-visualizer', label: '3D Visualizer', icon: Box },
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DSA Master
            </span>
          </div>
          
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  location.pathname === path
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
