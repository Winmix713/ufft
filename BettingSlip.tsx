import React, { useState } from 'react';
import { X, Trash2, AlertCircle } from 'lucide-react';
import { useBetting } from '../context/BettingContext';

interface BettingSlipProps {
  isOpen: boolean;
  toggleBettingSlip: () => void;
}

const BettingSlip: React.FC<BettingSlipProps> = ({ isOpen, toggleBettingSlip }) => {
  const { state, removeBet, updateStake, clearSlip } = useBetting();
  const [betType, setBetType] = useState<'single' | 'accumulator'>('single');
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <div 
      className={`
        fixed md:static inset-y-0 right-0 w-full md:w-80 bg-[#121212] shadow-lg z-30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        flex flex-col h-full
      `}
      aria-label="Betting slip"
    >
      {/* Header */}
      <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between">
        <h2 className="text-lg font-bold">Betting Slip</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={clearSlip}
            className="text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="Clear betting slip"
            disabled={state.bets.length === 0}
          >
            <Trash2 size={18} />
          </button>
          <button 
            className="md:hidden text-gray-400 hover:text-white transition-colors duration-300"
            onClick={toggleBettingSlip}
            aria-label="Close betting slip"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Bet type selector */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <div className="flex rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-2 text-center transition-colors duration-300 ${
              betType === 'single' 
                ? 'bg-[#00ff87] text-[#121212] font-medium' 
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
            onClick={() => setBetType('single')}
            aria-pressed={betType === 'single'}
          >
            Singles
          </button>
          <button
            className={`flex-1 py-2 text-center transition-colors duration-300 ${
              betType === 'accumulator' 
                ? 'bg-[#00ff87] text-[#121212] font-medium' 
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
            onClick={() => setBetType('accumulator')}
            aria-pressed={betType === 'accumulator'}
          >
            Accumulator
          </button>
        </div>
      </div>
      
      {/* Bets list */}
      <div className="flex-1 overflow-y-auto p-4">
        {state.bets.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <AlertCircle className="mx-auto mb-2" size={24} />
            <p>Your betting slip is empty</p>
            <p className="text-sm mt-1">Add selections to place bets</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {state.bets.map((bet) => (
              <li 
                key={bet.id} 
                className="bg-[#1e1e1e] rounded-lg p-3 relative"
              >
                <button
                  onClick={() => removeBet(bet.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={`Remove ${bet.selection} from betting slip`}
                >
                  <X size={16} />
                </button>
                
                <div className="mb-2">
                  <p className="text-sm text-gray-400">{bet.event}</p>
                  <p className="font-medium">{bet.selection}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#00ff87] font-bold">{bet.odds.toFixed(2)}</span>
                  
                  <div className="w-24">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={bet.stake || ''}
                      onChange={(e) => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[#00ff87]"
                      placeholder="Stake"
                      aria-label={`Stake amount for ${bet.selection}`}
                    />
                  </div>
                </div>
                
                {bet.stake && bet.stake > 0 && (
                  <div className="mt-2 text-right text-sm text-gray-300">
                    Potential return: <span className="text-[#00ff87]">{formatCurrency(bet.stake * bet.odds)}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Summary and place bet */}
      <div className="p-4 border-t border-[#2a2a2a] bg-[#1a1a1a]">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Stake:</span>
            <span>{formatCurrency(state.totalStake)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Potential Returns:</span>
            <span className="text-[#00ff87] font-bold">
              {formatCurrency(state.potentialWinnings)}
            </span>
          </div>
        </div>
        
        <button
          className="w-full py-3 bg-[#00ff87] text-[#121212] font-bold rounded-lg hover:bg-[#00cc6a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={state.bets.length === 0 || state.totalStake <= 0}
        >
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default BettingSlip;