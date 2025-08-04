"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Check, 
  X, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle,
  Download,
  Trash2
} from 'lucide-react';
import { useNotifications, type Notification } from '@/lib/notification-context';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return <Info className="h-4 w-4 text-blue-500" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return 'border-blue-200 bg-blue-50 dark:bg-blue-950/20';
    case 'success':
      return 'border-green-200 bg-green-50 dark:bg-green-950/20';
    case 'warning':
      return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20';
    case 'error':
      return 'border-red-200 bg-red-50 dark:bg-red-950/20';
    default:
      return 'border-blue-200 bg-blue-50 dark:bg-blue-950/20';
  }
};

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications();

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.action) {
      notification.action.onClick();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

             <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: -10 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: -10 }}
             transition={{ duration: 0.2 }}
             className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden rounded-lg border bg-background shadow-lg z-50"
           >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllNotifications}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                          !notification.read ? 'bg-muted/30' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className={`text-sm font-medium ${
                                !notification.read ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {notification.title}
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              
                              {notification.action && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    notification.action?.onClick();
                                  }}
                                  className="text-xs h-6 px-2"
                                >
                                  {notification.action.label}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t bg-muted/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-xs"
                  >
                    Close
                  </Button>
                </div>
                             )}
             </motion.div>
           )}
         </AnimatePresence>
    </div>
  );
} 