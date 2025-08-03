"use client";

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { TopNavbar } from './top-navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-visible">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72 overflow-visible">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="py-6 overflow-visible">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-visible">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}