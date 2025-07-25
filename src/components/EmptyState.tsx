import React from 'react';
import { ImageIcon, Upload, Sparkles } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center space-y-6 max-w-md">
        
        {/* Ícone Principal */}
        <div className="relative mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
            <ImageIcon size={40} className="text-gray-400 dark:text-gray-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Nenhum post ainda
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Seja o primeiro a compartilhar uma imagem!
          </p>
        </div>

        {/* Descrição */}
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Faça upload de uma imagem e nossa IA irá gerar automaticamente uma descrição incrível para o seu post.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 gap-3 text-xs text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-2 justify-center">
              <Upload size={12} className="text-purple-500" />
              <span>Upload automático com drag & drop</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Sparkles size={12} className="text-purple-500" />
              <span>Descrições geradas por IA</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full border border-purple-200 dark:border-purple-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Pronto para receber sua primeira imagem
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
