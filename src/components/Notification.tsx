import React from 'react';
import { X, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import type { NotificationProps } from '../types';

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  if (!notification) return null;

  const { message, type } = notification;

  const getNotificationStyles = () => {
    if (type === 'error') {
      return {
        container: 'bg-red-500/95 text-white border border-red-400 shadow-red-500/25',
        icon: <AlertCircle size={20} className="text-red-100" />
      };
    }
    
    return {
      container: 'bg-green-500/95 text-white border border-green-400 shadow-green-500/25',
      icon: <CheckCircle size={20} className="text-green-100" />
    };
  };

  const styles = getNotificationStyles();

  return (
    <div 
      className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-2xl backdrop-blur-lg animate-slide-in-right max-w-sm ${styles.container}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {type === 'success' && message.includes('IA') ? (
            <Sparkles size={20} className="text-green-100 animate-pulse" />
          ) : (
            styles.icon
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm leading-relaxed break-words">
            {message}
          </p>
          
          {type === 'success' && message.includes('IA') && (
            <p className="text-xs mt-1 opacity-90">
              Processamento concluído com sucesso
            </p>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Fechar notificação"
        >
          <X size={16} className="text-white/80 hover:text-white" />
        </button>
      </div>
      
      {/* Progress bar for auto-dismiss */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-xl overflow-hidden">
        <div 
          className="h-full bg-white/40 animate-progress-bar"
          style={{
            animation: 'progress 4s linear forwards'
          }}
        />
      </div>
      
      {/* CSS incorporado no componente */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
          }
          .animate-progress-bar {
            animation: progress 4s linear forwards;
          }
        `
      }} />
    </div>
  );
};

export default Notification;
