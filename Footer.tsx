import React from 'react';
import { Shield, HelpCircle, AlertTriangle, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] text-gray-300 py-6 border-t border-[#2a2a2a]">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">About BetMaster</h3>
            <p className="text-sm text-gray-400 mb-4">
              BetMaster offers a premium sports betting experience with competitive odds, 
              live betting, and secure transactions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300">
                  Sports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300">
                  Live Betting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300">
                  Casino Games
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300">
                  Promotions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300">
                  Statistics
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300 flex items-center">
                  <HelpCircle size={16} className="mr-2" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300 flex items-center">
                  <AlertTriangle size={16} className="mr-2" />
                  Responsible Gambling
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300 flex items-center">
                  <Shield size={16} className="mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00ff87] transition-colors duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Payment Methods */}
          <div>
            <h3 className="text-white font-bold mb-4">Payment Methods</h3>
            <div className="grid grid-cols-3 gap-2">
              {['Visa', 'Mastercard', 'PayPal', 'Bitcoin', 'Apple Pay', 'Google Pay'].map((method, index) => (
                <div 
                  key={index} 
                  className="bg-[#1a1a1a] p-2 rounded text-xs text-center"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Responsible gambling message */}
        <div className="border-t border-[#2a2a2a] pt-6 mb-6">
          <div className="bg-[#1a1a1a] p-4 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-xs text-gray-400">
                <span className="block text-white text-sm mb-1">Gamble Responsibly</span>
                Gambling can be addictive. Please play responsibly. BetMaster promotes responsible gambling. 
                If you feel you may have a gambling problem, please seek help from professional organizations.
                You must be 18+ to use this service.
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2025 BetMaster. All rights reserved.</p>
          <p className="mt-1">Licensed and regulated by the Gaming Authority.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;