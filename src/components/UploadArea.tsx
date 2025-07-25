import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Loader2,
  Bot,
  Zap,
  Upload,
  Sparkles
} from 'lucide-react';
import type { UploadAreaProps } from '../types';

const UploadArea: React.FC<UploadAreaProps> = ({ onFileUpload, uploading }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer group ${
          dragActive
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-105 shadow-lg'
            : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
        } ${uploading ? 'pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => {
          if (!uploading) {
            document.getElementById('upload-area-input')?.click();
          }
        }}
      >
        <input
          id="upload-area-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-6 animate-pulse">
            {/* Loading Animation */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Loader2 size={32} className="text-white animate-spin" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Bot size={16} className="text-white" />
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                🤖 IA Processando sua Imagem
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  Analisando conteúdo visual...
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  ✨ Gerando descrição automática com Gemini
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-80 max-w-full">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full animate-pulse shadow-inner"></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Isso pode levar alguns segundos...
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {/* Upload Icon */}
            <div className="relative transform group-hover:scale-110 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <ImageIcon size={36} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:animate-bounce">
                <Zap size={16} className="text-white" />
              </div>
            </div>

            {/* Main Text */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Arraste sua imagem aqui
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ou <span className="text-purple-600 dark:text-purple-400 font-semibold">clique para selecionar</span>
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Upload size={16} className="text-purple-500" />
                <span>PNG, JPG, GIF até 5MB</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Bot size={16} className="text-purple-500" />
                <span>Descrição automática</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Sparkles size={16} className="text-purple-500" />
                <span>Tecnologia Gemini AI</span>
              </div>
            </div>

            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full border border-purple-200 dark:border-purple-700">
              <Bot size={16} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Powered by Google Gemini
              </span>
            </div>
          </div>
        )}

        {/* Drag Overlay */}
        {dragActive && !uploading && (
          <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <div className="text-purple-600 dark:text-purple-400 text-xl font-bold">
              Solte sua imagem aqui! 📸
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      {!uploading && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 <strong>Dica:</strong> Quanto mais detalhada a imagem, melhor será a descrição gerada pela IA
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
