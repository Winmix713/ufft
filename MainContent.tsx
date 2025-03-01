import React, { useState, useEffect } from 'react';
import LiveScores from './LiveScores';
import MatchUpdates from './MatchUpdates';
import PopularBets from './PopularBets';
import UserAccountSummary from './UserAccountSummary';
import StatisticsWidget from './StatisticsWidget';
import { AlertTriangle } from 'lucide-react';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-700 text-center">
          <AlertTriangle className="mx-auto mb-2 text-red-500" size={32} />
          <h3 className="text-xl font-bold text-red-500 mb-2">Something went wrong</h3>
          <p className="text-gray-300">
            We're having trouble loading this component. Please try refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading skeleton component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-4 h-48">
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 mb-3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-3"></div>
          <div className="h-8 bg-gray-700 rounded w-1/4 mt-6"></div>
        </div>
      ))}
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <SkeletonLoader />
      </main>
    );
  }
  
  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <ErrorBoundary>
            <MatchUpdates />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <LiveScores />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <PopularBets />
          </ErrorBoundary>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <ErrorBoundary>
            <UserAccountSummary />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <StatisticsWidget />
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
};

export default MainContent;