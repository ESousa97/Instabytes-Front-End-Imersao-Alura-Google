import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center py-12">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        
        {/* Main Loading Animation */}
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
          
          {/* Inner pulsing circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <Bot size={16} className="text-white" />
            </div>
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce" style={{ animationDelay: '0s' }}>
            <Sparkles size={12} />
          </div>
          <div className="absolute -bottom-2 -left-2 text-pink-400 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Sparkles size={10} />
          </div>
          <div className="absolute top-0 -left-3 text-purple-400 animate-bounce" style={{ animationDelay: '1s' }}>
            <Sparkles size={8} />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 animate-pulse">
            Carregando posts...
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Buscando conteúdo gerado por IA
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
