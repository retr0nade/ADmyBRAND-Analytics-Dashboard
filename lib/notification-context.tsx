"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize with mock notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Welcome to ADmyBRAND Analytics',
        message: 'Your dashboard is ready! Start exploring your campaign performance data.',
        type: 'info',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
      },
      {
        id: '2',
        title: 'New Campaign Performance Alert',
        message: 'Summer Sale Campaign has exceeded its daily budget by 15%. Consider adjusting your bid strategy.',
        type: 'warning',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        read: false,
      },
      {
        id: '3',
        title: 'Weekly Report Available',
        message: 'Your weekly performance summary is ready. Download the report to review your campaign insights.',
        type: 'success',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Helper function to add download notifications
export function addDownloadNotification(
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void,
  fileType: 'CSV' | 'PDF',
  page: 'Dashboard' | 'Reports'
) {
  addNotification({
    title: `${fileType} Export Completed`,
    message: `Your ${page.toLowerCase()} data has been exported as ${fileType}. The file has been downloaded to your device.`,
    type: 'success',
    action: {
      label: 'View Downloads',
      onClick: () => {
        // In a real app, this could open a downloads folder or show download history
        console.log('Opening downloads folder...');
      },
    },
  });
} 