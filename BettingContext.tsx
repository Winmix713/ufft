import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types
export interface Bet {
  id: string;
  event: string;
  selection: string;
  odds: number;
  stake?: number;
}

interface BettingState {
  bets: Bet[];
  totalStake: number;
  potentialWinnings: number;
}

type BettingAction = 
  | { type: 'ADD_BET'; payload: Bet }
  | { type: 'REMOVE_BET'; payload: string }
  | { type: 'UPDATE_STAKE'; payload: { id: string; stake: number } }
  | { type: 'CLEAR_SLIP' };

interface BettingContextType {
  state: BettingState;
  addBet: (bet: Bet) => void;
  removeBet: (id: string) => void;
  updateStake: (id: string, stake: number) => void;
  clearSlip: () => void;
}

// Create context
const BettingContext = createContext<BettingContextType | undefined>(undefined);

// Reducer function
const bettingReducer = (state: BettingState, action: BettingAction): BettingState => {
  switch (action.type) {
    case 'ADD_BET':
      // Don't add if already exists
      if (state.bets.some(bet => bet.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        bets: [...state.bets, action.payload],
        // Recalculate totals
        ...calculateTotals([...state.bets, action.payload])
      };
    
    case 'REMOVE_BET':
      const updatedBets = state.bets.filter(bet => bet.id !== action.payload);
      return {
        ...state,
        bets: updatedBets,
        // Recalculate totals
        ...calculateTotals(updatedBets)
      };
    
    case 'UPDATE_STAKE':
      const updatedBetsWithStake = state.bets.map(bet => 
        bet.id === action.payload.id 
          ? { ...bet, stake: action.payload.stake } 
          : bet
      );
      return {
        ...state,
        bets: updatedBetsWithStake,
        // Recalculate totals
        ...calculateTotals(updatedBetsWithStake)
      };
    
    case 'CLEAR_SLIP':
      return {
        bets: [],
        totalStake: 0,
        potentialWinnings: 0
      };
    
    default:
      return state;
  }
};

// Helper function to calculate totals
const calculateTotals = (bets: Bet[]) => {
  const totalStake = bets.reduce((sum, bet) => sum + (bet.stake || 0), 0);
  
  // Calculate potential winnings (multiply all odds together for accumulator)
  let potentialWinnings = 0;
  if (bets.length > 0 && bets.every(bet => bet.stake !== undefined)) {
    const totalOdds = bets.reduce((product, bet) => product * bet.odds, 1);
    potentialWinnings = totalStake * totalOdds;
  }
  
  return { totalStake, potentialWinnings };
};

// Provider component
export const BettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bettingReducer, {
    bets: [],
    totalStake: 0,
    potentialWinnings: 0
  });
  
  // Actions
  const addBet = (bet: Bet) => {
    dispatch({ type: 'ADD_BET', payload: bet });
  };
  
  const removeBet = (id: string) => {
    dispatch({ type: 'REMOVE_BET', payload: id });
  };
  
  const updateStake = (id: string, stake: number) => {
    dispatch({ type: 'UPDATE_STAKE', payload: { id, stake } });
  };
  
  const clearSlip = () => {
    dispatch({ type: 'CLEAR_SLIP' });
  };
  
  return (
    <BettingContext.Provider value={{ state, addBet, removeBet, updateStake, clearSlip }}>
      {children}
    </BettingContext.Provider>
  );
};

// Custom hook for using the context
export const useBetting = () => {
  const context = useContext(BettingContext);
  if (context === undefined) {
    throw new Error('useBetting must be used within a BettingProvider');
  }
  return context;
};