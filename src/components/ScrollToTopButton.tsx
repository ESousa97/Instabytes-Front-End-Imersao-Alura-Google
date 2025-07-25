import React from 'react';
import { ArrowUp } from 'lucide-react';

export interface ScrollToTopButtonProps {
  show: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-fade-in-scale"
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={20} className="mx-auto" />
    </button>
  );
};

export default ScrollToTopButton;
