import React, { useState, useEffect } from 'react';
import { useBetting } from '../context/BettingContext';
import { Clock, AlertCircle } from 'lucide-react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  league: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

// Mock data for real-time match updates
const mockMatches: Match[] = [
  {
    id: 'm1',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeScore: 2,
    awayScore: 1,
    time: '75\'',
    status: 'live',
    league: 'Premier League',
    odds: { home: 2.1, draw: 3.5, away: 3.2 }
  },
  {
    id: 'm2',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    homeScore: 1,
    awayScore: 1,
    time: '54\'',
    status: 'live',
    league: 'La Liga',
    odds: { home: 2.4, draw: 3.2, away: 2.8 }
  },
  {
    id: 'm3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Dortmund',
    homeScore: 3,
    awayScore: 0,
    time: '82\'',
    status: 'live',
    league: 'Bundesliga',
    odds: { home: 1.5, draw: 4.5, away: 5.5 }
  },
  {
    id: 'm4',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    homeScore: 0,
    awayScore: 0,
    time: '19:45',
    status: 'upcoming',
    league: 'Ligue 1',
    odds: { home: 1.7, draw: 3.8, away: 4.2 }
  }
];

const MatchUpdates: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming'>('live');
  const { addBet } = useBetting();
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prevMatches => 
        prevMatches.map(match => {
          if (match.status === 'live') {
            // Randomly update time or score
            const random = Math.random();
            if (random < 0.2) {
              // Update score (20% chance)
              const scoreUpdate = Math.random() < 0.5 ? 'home' : 'away';
              return {
                ...match,
                homeScore: scoreUpdate === 'home' ? match.homeScore + 1 : match.homeScore,
                awayScore: scoreUpdate === 'away' ? match.awayScore + 1 : match.awayScore
              };
            } else {
              // Update time
              const currentTime = parseInt(match.time.replace('\'', ''));
              const newTime = currentTime < 90 ? currentTime + 1 : 90;
              return {
                ...match,
                time: `${newTime}\'`
              };
            }
          }
          return match;
        })
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle adding a bet
  const handleAddBet = (match: Match, selection: 'home' | 'draw' | 'away') => {
    const selectionMap = {
      home: `${match.homeTeam} to win`,
      draw: 'Draw',
      away: `${match.awayTeam} to win`
    };
    
    addBet({
      id: `${match.id}-${selection}`,
      event: `${match.homeTeam} vs ${match.awayTeam}`,
      selection: selectionMap[selection],
      odds: match.odds[selection]
    });
  };
  
  const filteredMatches = matches.filter(match => match.status === activeTab);
  
  return (
    <section className="bg-[#1e1e1e] rounded-lg overflow-hidden" aria-labelledby="match-updates-heading">
      <div className="p-4 border-b border-[#2a2a2a]">
        <h2 id="match-updates-heading" className="text-xl font-bold">Match Updates</h2>
        
        {/* Tabs */}
        <div className="flex mt-4 border-b border-[#2a2a2a]">
          <button
            className={`pb-2 px-4 font-medium transition-colors duration-300 ${
              activeTab === 'live' 
                ? 'text-[#00ff87] border-b-2 border-[#00ff87]' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('live')}
            aria-pressed={activeTab === 'live'}
          >
            Live
          </button>
          <button
            className={`pb-2 px-4 font-medium transition-colors duration-300 ${
              activeTab === 'upcoming' 
                ? 'text-[#00ff87] border-b-2 border-[#00ff87]' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('upcoming')}
            aria-pressed={activeTab === 'upcoming'}
          >
            Upcoming
          </button>
        </div>
      </div>
      
      {/* Match list */}
      <div className="p-4">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <AlertCircle className="mx-auto mb-2" size={24} />
            <p>No {activeTab} matches available</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredMatches.map((match) => (
              <li 
                key={match.id} 
                className="bg-[#252525] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">{match.league}</span>
                  <div className="flex items-center">
                    <Clock size={14} className="text-[#00ff87] mr-1" />
                    <span className={`text-sm ${match.status === 'live' ? 'text-[#00ff87]' : 'text-gray-400'}`}>
                      {match.time}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-1">
                    <p className="font-medium">{match.homeTeam}</p>
                  </div>
                  
                  {match.status === 'live' && (
                    <div className="flex items-center mx-4">
                      <span className="text-xl font-bold">{match.homeScore}</span>
                      <span className="mx-1">-</span>
                      <span className="text-xl font-bold">{match.awayScore}</span>
                    </div>
                  )}
                  
                  <div className="flex-1 text-right">
                    <p className="font-medium">{match.awayTeam}</p>
                  </div>
                </div>
                
                {/* Betting options */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className="bg-[#2a2a2a] hover:bg-[#3a3a3a] py-2 rounded transition-colors duration-300 flex flex-col items-center"
                    onClick={() => handleAddBet(match, 'home')}
                    aria-label={`Bet on ${match.homeTeam} to win with odds ${match.odds.home}`}
                  >
                    <span className="text-xs text-gray-400">1</span>
                    <span className="font-bold text-[#00ff87]">{match.odds.home.toFixed(2)}</span>
                  </button>
                  
                  <button
                    className="bg-[#2a2a2a] hover:bg-[#3a3a3a] py-2 rounded transition-colors duration-300 flex flex-col items-center"
                    onClick={() => handleAddBet(match, 'draw')}
                    aria-label={`Bet on draw with odds ${match.odds.draw}`}
                  >
                    <span className="text-xs text-gray-400">X</span>
                    <span className="font-bold text-[#00ff87]">{match.odds.draw.toFixed(2)}</span>
                  </button>
                  
                  <button
                    className="bg-[#2a2a2a] hover:bg-[#3a3a3a] py-2 rounded transition-colors duration-300 flex flex-col items-center"
                    onClick={() => handleAddBet(match, 'away')}
                    aria-label={`Bet on ${match.awayTeam} to win with odds ${match.odds.away}`}
                  >
                    <span className="text-xs text-gray-400">2</span>
                    <span className="font-bold text-[#00ff87]">{match.odds.away.toFixed(2)}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MatchUpdates;