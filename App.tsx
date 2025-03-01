import React, { useState, useMemo } from 'react';
import { BettingProvider } from './context/BettingContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import BettingSlip from './components/BettingSlip';
import { Menu } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bettingSlipOpen, setBettingSlipOpen] = useState(false);

  // Memoize the toggle functions to prevent unnecessary re-renders
  const toggleSidebar = useMemo(() => () => setSidebarOpen(prev => !prev), []);
  const toggleBettingSlip = useMemo(() => () => setBettingSlipOpen(prev => !prev), []);

  return (
    <BettingProvider>
      <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-white">
        <Header toggleBettingSlip={toggleBettingSlip} />
        
        <div className="flex flex-1 relative">
          {/* Mobile sidebar toggle */}
          <button 
            className="md:hidden fixed bottom-4 left-4 z-50 bg-[#00ff87] text-[#1a1a1a] p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} />
          </button>
          
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          
          {/* Main content */}
          <MainContent />
          
          {/* Betting slip - fixed on mobile, sidebar on desktop */}
          <BettingSlip isOpen={bettingSlipOpen} toggleBettingSlip={toggleBettingSlip} />
        </div>
        
        <Footer />
      </div>
    </BettingProvider>
  );
}

export default App;