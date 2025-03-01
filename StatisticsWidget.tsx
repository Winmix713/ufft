import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, ChevronDown } from 'lucide-react';

// Mock statistics data
interface StatData {
  label: string;
  value: number;
  change: number;
}

const mockStats = {
  bets: [
    { label: 'Win Rate', value: 62, change: 5 },
    { label: 'Avg. Odds', value: 2.15, change: -0.3 },
    { label: 'ROI', value: 18, change: 2 }
  ],
  sports: {
    football: 45,
    basketball: 30,
    tennis: 15,
    other: 10
  }
};

const StatisticsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'distribution'>('performance');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  // Generate random data for the chart
  const chartData = useMemo(() => {
    const data = [];
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 12;
    const labels = timeRange === 'year' ? 
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] :
      Array.from({ length: days }, (_, i) => (i + 1).toString());
    
    for (let i = 0; i < days; i++) {
      data.push({
        label: labels[i],
        value: Math.floor(Math.random() * 100)
      });
    }
    return data;
  }, [timeRange]);
  
  // Find max value for scaling
  const maxValue = useMemo(() => {
    return Math.max(...chartData.map(item => item.value));
  }, [chartData]);
  
  return (
    <section className="bg-[#1e1e1e] rounded-lg overflow-hidden" aria-labelledby="statistics-heading">
      <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center">
        <h2 id="statistics-heading" className="text-xl font-bold flex items-center">
          <BarChart className="mr-2 text-[#00ff87]" size={20} />
          Statistics
        </h2>
        
        {/* Time range dropdown */}
        <div className="relative">
          <button 
            className="flex items-center text-sm bg-[#252525] px-3 py-1.5 rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : 'This Year'}
            <ChevronDown size={16} className="ml-1" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-[#252525] rounded-lg shadow-lg z-10 py-1">
              <button 
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#2a2a2a] transition-colors duration-300 ${timeRange === 'week' ? 'text-[#00ff87]' : 'text-white'}`}
                onClick={() => {
                  setTimeRange('week');
                  setIsDropdownOpen(false);
                }}
              >
                This Week
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#2a2a2a] transition-colors duration-300 ${timeRange === 'month' ? 'text-[#00ff87]' : 'text-white'}`}
                onClick={() => {
                  setTimeRange('month');
                  setIsDropdownOpen(false);
                }}
              >
                This Month
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#2a2a2a] transition-colors duration-300 ${timeRange === 'year' ? 'text-[#00ff87]' : 'text-white'}`}
                onClick={() => {
                  setTimeRange('year');
                  setIsDropdownOpen(false);
                }}
              >
                This Year
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-[#2a2a2a]">
        <button
          className={`flex-1 py-3 font-medium transition-colors duration-300 ${
            activeTab === 'performance' 
              ? 'text-[#00ff87] border-b-2 border-[#00ff87]' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('performance')}
          aria-pressed={activeTab === 'performance'}
        >
          Performance
        </button>
        <button
          className={`flex-1 py-3 font-medium transition-colors duration-300 ${
            activeTab === 'distribution' 
              ? 'text-[#00ff87] border-b-2 border-[#00ff87]' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('distribution')}
          aria-pressed={activeTab === 'distribution'}
        >
          Distribution
        </button>
      </div>
      
      <div className="p-4">
        {activeTab === 'performance' ? (
          <>
            {/* Key stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {mockStats.bets.map((stat, index) => (
                <div key={index} className="bg-[#252525] p-3 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <div className="flex items-end">
                    <span className="text-xl font-bold mr-2">
                      {typeof stat.value === 'number' && stat.label.includes('Rate') || stat.label.includes('ROI') 
                        ? `${stat.value}%` 
                        : stat.value}
                    </span>
                    <span className={`text-xs ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change > 0 ? '+' : ''}{stat.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chart */}
            <div className="bg-[#252525] p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-4">Betting Performance</h3>
              <div className="h-40 flex items-end space-x-1">
                {chartData.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex-1 flex flex-col items-center"
                  >
                    <div 
                      className="w-full bg-[#00ff87] hover:bg-[#00cc6a] transition-colors duration-300 rounded-t"
                      style={{ 
                        height: `${(item.value / maxValue) * 100}%`,
                        minHeight: '4px'
                      }}
                      aria-label={`${item.label}: ${item.value}`}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Sports distribution */}
            <div className="bg-[#252525] p-4 rounded-lg mb-4">
              <h3 className="text-sm font-medium mb-4">Betting by Sport</h3>
              <div className="space-y-3">
                {Object.entries(mockStats.sports).map(([sport, percentage]) => (
                  <div key={sport}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{sport}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-[#1a1a1a] rounded-full h-2.5">
                      <div 
                        className="bg-[#00ff87] h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                        aria-label={`${sport}: ${percentage}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recommendation */}
            <div className="bg-gradient-to-r from-[#252525] to-[#1e1e1e] p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Betting Recommendation</h3>
              <p className="text-gray-300 text-sm">
                Based on your betting history, you have a higher win rate on basketball games. 
                Consider focusing more on this sport for better returns.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default StatisticsWidget;