import React from 'react';
import { useBetting } from '../context/BettingContext';
import { TrendingUp, ChevronRight } from 'lucide-react';

interface PopularBet {
  id: string;
  event: string;
  selection: string;
  odds: number;
  category: string;
  popularity: number; // 1-100
}

// Mock data for popular bets
const mockPopularBets: PopularBet[] = [
  {
    id: 'pb1',
    event: 'Man United vs Tottenham',
    selection: 'Both Teams to Score',
    odds: 1.85,
    category: 'Football',
    popularity: 92
  },
  {
    id: 'pb2',
    event: 'Lakers vs Warriors',
    selection: 'Warriors to Win',
    odds: 2.10,
    category: 'Basketball',
    popularity: 88
  },
  {
    id: 'pb3',
    event: 'Djokovic vs Nadal',
    selection: 'Djokovic to Win',
    odds: 1.75,
    category: 'Tennis',
    popularity: 85
  },
  {
    id: 'pb4',
    event: 'Liverpool vs Arsenal',
    selection: 'Over 2.5 Goals',
    odds: 1.65,
    category: 'Football',
    popularity: 82
  },
  {
    id: 'pb5',
    event: 'Tyson vs Jones',
    selection: 'Fight to go the Distance',
    odds: 2.50,
    category: 'Boxing',
    popularity: 78
  },
  {
    id: 'pb6',
    event: 'Celtics vs Nets',
    selection: 'Celtics -4.5',
    odds: 1.90,
    category: 'Basketball',
    popularity: 75
  }
];

const PopularBets: React.FC = () => {
  const { addBet } = useBetting();
  
  // Handle adding a bet
  const handleAddBet = (bet: PopularBet) => {
    addBet({
      id: bet.id,
      event: bet.event,
      selection: bet.selection,
      odds: bet.odds
    });
  };
  
  return (
    <section className="bg-[#1e1e1e] rounded-lg overflow-hidden" aria-labelledby="popular-bets-heading">
      <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center">
        <h2 id="popular-bets-heading" className="text-xl font-bold">Popular Bets</h2>
        <a 
          href="#" 
          className="text-[#00ff87] flex items-center text-sm hover:underline"
          aria-label="View all popular bets"
        >
          View All <ChevronRight size={16} />
        </a>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPopularBets.map((bet) => (
            <div 
              key={bet.id} 
              className="bg-[#252525] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{bet.category}</span>
                <div className="flex items-center">
                  <TrendingUp size={14} className="text-[#00ff87] mr-1" />
                  <span className="text-sm text-[#00ff87]">{bet.popularity}%</span>
                </div>
              </div>
              
              <p className="font-medium mb-1">{bet.event}</p>
              <p className="text-sm text-gray-300 mb-3">{bet.selection}</p>
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#00ff87]">{bet.odds.toFixed(2)}</span>
                <button
                  onClick={() => handleAddBet(bet)}
                  className="bg-[#2a2a2a] hover:bg-[#3a3a3a] px-3 py-1 rounded text-sm transition-colors duration-300"
                  aria-label={`Add ${bet.selection} to betting slip`}
                >
                  Add to Slip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBets;