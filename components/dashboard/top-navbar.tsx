"use client";

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NotificationDropdown } from '@/components/notification-dropdown';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="h-6 w-px bg-border lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search campaigns, metrics..." 
            className="pl-10 w-full max-w-md"
          />
        </div>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <NotificationDropdown />
          
          <ThemeToggle />
          
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" />
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Shreyas Deb</p>
              <p className="text-xs text-muted-foreground">Marketing Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}