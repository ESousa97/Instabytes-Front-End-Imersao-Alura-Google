import React from 'react';
import {
  Camera,
  Bot,
  Search,
  Sun,
  Moon,
  Sparkles,
  Loader2
} from 'lucide-react';
import type { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  onFileUpload, 
  uploading 
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <Camera size={20} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 bg-clip-text text-transparent">
                InstaBytes
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Bot size={12} />
                Powered by AI
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative group">
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" 
              />
              <input
                type="text"
                placeholder="Buscar posts, usuários, hashtags..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
              title={darkMode ? 'Modo claro' : 'Modo escuro'}
            >
              {darkMode ? 
                <Sun size={20} className="text-yellow-500" /> : 
                <Moon size={20} className="text-gray-600 dark:text-gray-400" />
              }
            </button>
            
            {/* Upload Button */}
            <label
              htmlFor="file-upload"
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full cursor-pointer flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Sparkles 
                  size={18} 
                  className={`transition-transform ${uploading ? 'animate-spin' : 'group-hover:animate-spin'}`} 
                />
                <span className="font-medium whitespace-nowrap">
                  {uploading ? 'Processando...' : 'Upload IA'}
                </span>
              </div>
              
              {uploading && (
                <div className="absolute inset-0 bg-purple-600/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Loader2 size={18} className="animate-spin text-white" />
                </div>
              )}
            </label>
            
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onFileUpload(file);
                  e.target.value = ''; // Reset input
                }
              }}
              className="hidden"
              disabled={uploading}
            />
          </div>
        </div>
      </div>
      
      {/* Loading Progress Bar */}
      {uploading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse"></div>
        </div>
      )}
    </header>
  );
};

export default Header;
