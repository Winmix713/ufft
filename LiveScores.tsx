import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight } from 'lucide-react';

interface LiveScore {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  homeImg: string;
  awayImg: string;
}

// Mock data for live scores
const mockLiveScores: LiveScore[] = [
  {
    id: 'ls1',
    league: 'Premier League',
    homeTeam: 'Liverpool',
    awayTeam: 'Man City',
    homeScore: 2,
    awayScore: 2,
    time: '67\'',
    homeImg: 'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=32&h=32&auto=format&fit=crop',
    awayImg: 'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=32&h=32&auto=format&fit=crop'
  },
  {
    id: 'ls2',
    league: 'Serie A',
    homeTeam: 'Juventus',
    awayTeam: 'Inter',
    homeScore: 0,
    awayScore: 1,
    time: '34\'',
    homeImg: 'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=32&h=32&auto=format&fit=crop',
    awayImg: 'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=32&h=32&auto=format&fit=crop'
  },
  {
    id: 'ls3',
    league: 'La Liga',
    homeTeam: 'Atletico Madrid',
    awayTeam: 'Sevilla',
    homeScore: 3,
    awayScore: 0,
    time: '78\'',
    homeImg: 'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=32&h=32&auto=format&fit=crop',
    awayImg: 'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=32&h=32&auto=format&fit=crop'
  }
];

const LiveScores: React.FC = () => {
  const [liveScores, setLiveScores] = useState<LiveScore[]>(mockLiveScores);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveScores(prevScores => 
        prevScores.map(score => {
          // Randomly update time or score
          const random = Math.random();
          if (random < 0.15) {
            // Update score (15% chance)
            const scoreUpdate = Math.random() < 0.5 ? 'home' : 'away';
            return {
              ...score,
              homeScore: scoreUpdate === 'home' ? score.homeScore + 1 : score.homeScore,
              awayScore: scoreUpdate === 'away' ? score.awayScore + 1 : score.awayScore
            };
          } else {
            // Update time
            const currentTime = parseInt(score.time.replace('\'', ''));
            const newTime = currentTime < 90 ? currentTime + 1 : 90;
            return {
              ...score,
              time: `${newTime}\'`
            };
          }
        })
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="bg-[#1e1e1e] rounded-lg overflow-hidden" aria-labelledby="live-scores-heading">
      <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center">
        <h2 id="live-scores-heading" className="text-xl font-bold">Live Scores</h2>
        <a 
          href="#" 
          className="text-[#00ff87] flex items-center text-sm hover:underline"
          aria-label="View all live scores"
        >
          View All <ChevronRight size={16} />
        </a>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {liveScores.map((score) => (
            <div 
              key={score.id} 
              className="bg-[#252525] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{score.league}</span>
                <div className="flex items-center">
                  <Clock size={14} className="text-[#00ff87] mr-1" />
                  <span className="text-sm text-[#00ff87]">{score.time}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center flex-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-[#2a2a2a] flex-shrink-0">
                    <img 
                      src={score.homeImg} 
                      alt={score.homeTeam} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="font-medium truncate">{score.homeTeam}</span>
                </div>
                
                <div className="flex items-center mx-4 font-bold">
                  <span className="text-xl min-w-[1.5rem] text-center">{score.homeScore}</span>
                  <span className="mx-1">-</span>
                  <span className="text-xl min-w-[1.5rem] text-center">{score.awayScore}</span>
                </div>
                
                <div className="flex items-center flex-1 justify-end">
                  <span className="font-medium truncate">{score.awayTeam}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden ml-2 bg-[#2a2a2a] flex-shrink-0">
                    <img 
                      src={score.awayImg} 
                      alt={score.awayTeam} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveScores;