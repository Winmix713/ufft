import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

// Mock user account data
const mockUserAccount = {
  balance: 250.75,
  pendingBets: 3,
  recentActivity: [
    { id: 'a1', type: 'deposit', amount: 100, date: '2025-04-10T14:32:00Z', status: 'completed' },
    { id: 'a2', type: 'win', amount: 45.50, date: '2025-04-09T18:15:00Z', status: 'completed' },
    { id: 'a3', type: 'bet', amount: -20, date: '2025-04-09T12:45:00Z', status: 'pending' }
  ]
};

const UserAccountSummary: React.FC = () => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <section className="bg-[#1e1e1e] rounded-lg overflow-hidden" aria-labelledby="account-summary-heading">
      <div className="p-4 border-b border-[#2a2a2a]">
        <h2 id="account-summary-heading" className="text-xl font-bold">Account Summary</h2>
      </div>
      
      <div className="p-4">
        {/* Balance */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#252525] rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Available Balance</span>
            <Wallet size={20} className="text-[#00ff87]" />
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            {formatCurrency(mockUserAccount.balance)}
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 bg-[#00ff87] text-[#121212] font-medium py-2 rounded-lg hover:bg-[#00cc6a] transition-colors duration-300">
              Deposit
            </button>
            <button className="flex-1 bg-[#2a2a2a] text-white py-2 rounded-lg hover:bg-[#3a3a3a] transition-colors duration-300">
              Withdraw
            </button>
          </div>
        </div>
        
        {/* Pending bets */}
        <div className="bg-[#252525] rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <span>Pending Bets</span>
            <span className="bg-[#2a2a2a] px-2 py-1 rounded text-sm">
              {mockUserAccount.pendingBets}
            </span>
          </div>
        </div>
        
        {/* Recent activity */}
        <div>
          <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
          <ul className="space-y-3">
            {mockUserAccount.recentActivity.map((activity) => (
              <li 
                key={activity.id} 
                className="flex items-center justify-between bg-[#252525] p-3 rounded-lg"
              >
                <div className="flex items-center">
                  {activity.type === 'deposit' && (
                    <div className="bg-green-500/20 p-2 rounded-full mr-3">
                      <ArrowDownRight size={16} className="text-green-500" />
                    </div>
                  )}
                  {activity.type === 'win' && (
                    <div className="bg-green-500/20 p-2 rounded-full mr-3">
                      <ArrowDownRight size={16} className="text-green-500" />
                    </div>
                  )}
                  {activity.type === 'bet' && (
                    <div className="bg-orange-500/20 p-2 rounded-full mr-3">
                      <ArrowUpRight size={16} className="text-orange-500" />
                    </div>
                  )}
                  
                  <div>
                    <p className="font-medium capitalize">{activity.type}</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock size={12} className="mr-1" />
                      <span>{formatDate(activity.date)}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`font-bold ${
                  activity.amount > 0 ? 'text-green-500' : 'text-orange-500'
                }`}>
                  {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserAccountSummary;