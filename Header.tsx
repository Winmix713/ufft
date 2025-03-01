import React, { useState } from 'react';
import { Search, Bell, User, Menu, X, Ticket } from 'lucide-react';
import { useBetting } from '../context/BettingContext';

interface HeaderProps {
  toggleBettingSlip: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleBettingSlip }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useBetting();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="bg-[#121212] sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-[#00ff87] font-bold text-2xl flex items-center">
              <Ticket className="mr-2" size={28} />
              <span className="hidden sm:inline">BetMaster</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-[#00ff87] transition-colors duration-300">Sports</a>
            <a href="#" className="text-white hover:text-[#00ff87] transition-colors duration-300">Live</a>
            <a href="#" className="text-white hover:text-[#00ff87] transition-colors duration-300">Casino</a>
            <a href="#" className="text-white hover:text-[#00ff87] transition-colors duration-300">Promotions</a>
          </nav>
          
          {/* Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#2a2a2a] text-white rounded-full py-2 pl-10 pr-4 w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-[#00ff87]"
                aria-label="Search events"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            {/* Betting slip button (mobile) */}
            <button 
              onClick={toggleBettingSlip}
              className="relative bg-[#2a2a2a] p-2 rounded-full hover:bg-[#3a3a3a] transition-colors duration-300"
              aria-label="Open betting slip"
            >
              <Ticket size={20} className="text-[#00ff87]" />
              {state.bets.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.bets.length}
                </span>
              )}
            </button>
            
            {/* Notifications */}
            <button 
              className="relative bg-[#2a2a2a] p-2 rounded-full hover:bg-[#3a3a3a] transition-colors duration-300"
              aria-label="View notifications"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* User Profile */}
            <button 
              className="bg-[#2a2a2a] p-2 rounded-full hover:bg-[#3a3a3a] transition-colors duration-300"
              aria-label="View profile"
            >
              <User size={20} />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden bg-[#2a2a2a] p-2 rounded-full hover:bg-[#3a3a3a] transition-colors duration-300"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-[#2a2a2a] animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-[#00ff87] transition-colors duration-300">Sports</a>
              <a href="#" className="text-white hover:text-[#00ff87] transition-colors duration-300">Live</a>
              <a href="#" className="text-white hover:text-[#00ff87] transition-colors duration-300">Casino</a>
              <a href="#" className="text-white hover:text-[#00ff87] transition-colors duration-300">Promotions</a>
              
              {/* Mobile Search */}
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#2a2a2a] text-white rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#00ff87]"
                  aria-label="Search events"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;