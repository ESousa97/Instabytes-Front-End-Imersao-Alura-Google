import { useState, useCallback } from 'react';
import type { NotificationData } from '../types';

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  const showNotification = useCallback((
    message: string, 
    type: 'success' | 'error' = 'success'
  ) => {
    setNotification({ message, type });
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    hideNotification
  };
};
