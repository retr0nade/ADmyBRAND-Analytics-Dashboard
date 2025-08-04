import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { NotificationProvider } from '@/lib/notification-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ADmyBRAND Insights - AI-Powered Marketing Analytics',
  description: 'Advanced marketing analytics dashboard for data-driven insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}