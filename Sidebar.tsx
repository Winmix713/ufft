import React from 'react';
import { X, Home, Calendar, Trophy, Star, BarChart2, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside 
      className={`
        bg-[#121212] w-64 fixed md:static top-0 bottom-0 left-0 z-30
        transform transition-transform duration-300 ease-in-out shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col h-full
      `}
      aria-label="Main navigation"
    >
      {/* Close button - mobile only */}
      <button 
        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={toggleSidebar}
        aria-label="Close navigation menu"
      >
        <X size={24} />
      </button>
      
      {/* Navigation items */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <a 
              href="#" 
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
              aria-current="page"
            >
              <Home className="mr-3 text-[#00ff87]" size={20} />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
            >
              <Calendar className="mr-3 text-[#00ff87]" size={20} />
              <span>Upcoming Events</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
            >
              <Trophy className="mr-3 text-[#00ff87]" size={20} />
              <span>Competitions</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
            >
              <Star className="mr-3 text-[#00ff87]" size={20} />
              <span>Favorites</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
            >
              <BarChart2 className="mr-3 text-[#00ff87]" size={20} />
              <span>Statistics</span>
            </a>
          </li>
        </ul>
        
        <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Sports
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <span>Football</span>
                <span className="ml-auto bg-[#2a2a2a] text-xs px-2 py-1 rounded-full">24</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <span>Basketball</span>
                <span className="ml-auto bg-[#2a2a2a] text-xs px-2 py-1 rounded-full">18</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <span>Tennis</span>
                <span className="ml-auto bg-[#2a2a2a] text-xs px-2 py-1 rounded-full">12</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <span>Ice Hockey</span>
                <span className="ml-auto bg-[#2a2a2a] text-xs px-2 py-1 rounded-full">8</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors duration-300"
              >
                <span>Baseball</span>
                <span className="ml-auto bg-[#2a2a2a] text-xs px-2 py-1 rounded-full">6</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Bottom links */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <ul className="space-y-2">
          <li>
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-gray-400 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors duration-300"
            >
              <Settings className="mr-3" size={18} />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-gray-400 rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors duration-300"
            >
              <HelpCircle className="mr-3" size={18} />
              <span>Help & Support</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;