"use client";

import { useState } from 'react';
import { AISummaryButton } from './ai-summary-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';

export function AISummaryButtonDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState<string>('');

  const handleAISummaryClick = () => {
    setClickCount(prev => prev + 1);
    setLastClickTime(new Date().toLocaleTimeString());
    console.log('AI Summary button clicked!');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">AI Summary Button Demo</h1>
          </div>
                     <p className="text-muted-foreground max-w-2xl mx-auto">
             This demo showcases the floating AI Summary button that appears on all dashboard pages. 
             The button opens a chat widget interface with message history, typing animations, and AI-powered insights that adapt to the current page.
           </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Robot Icon</span>
              </CardTitle>
              <CardDescription>
                Uses a robot icon from Lucide React
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The button features a clean robot icon that clearly indicates AI functionality.
              </p>
            </CardContent>
          </Card>

                     <Card>
             <CardHeader>
               <CardTitle className="flex items-center space-x-2">
                 <MessageSquare className="h-5 w-5" />
                 <span>Tooltip</span>
               </CardTitle>
               <CardDescription>
                 Hover to see &ldquo;AI Summary&rdquo; tooltip
               </CardDescription>
             </CardHeader>
             <CardContent>
               <p className="text-sm text-muted-foreground">
                 Built with Radix UI tooltip for accessibility and smooth animations.
               </p>
             </CardContent>
           </Card>

                                        <Card>
                   <CardHeader>
                     <CardTitle className="flex items-center space-x-2">
                       <Bot className="h-5 w-5" />
                       <span>Chat Interface</span>
                     </CardTitle>
                     <CardDescription>
                       Full chat widget with message history
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                     <p className="text-sm text-muted-foreground">
                       Scrollable chat history, message bubbles, and input field for custom messages.
                     </p>
                   </CardContent>
                 </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Page-Aware AI</span>
                </CardTitle>
                <CardDescription>
                  Context-aware responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI responses adapt based on current page (Overview vs Reports) with loading states and animations.
                </p>
              </CardContent>
            </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Support</CardTitle>
              <CardDescription>
                Works with both light and dark themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Uses CSS variables for consistent theming across all color schemes.
              </p>
            </CardContent>
          </Card>

                     <Card>
             <CardHeader>
               <CardTitle>Fixed Position</CardTitle>
               <CardDescription>
                 Always visible in bottom-right corner
               </CardDescription>
             </CardHeader>
             <CardContent>
               <p className="text-sm text-muted-foreground">
                 Chat widget anchors to bottom-right corner above the floating button, stays attached on scroll.
               </p>
             </CardContent>
           </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsive Design</CardTitle>
              <CardDescription>
                Adapts to different screen sizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Maintains proper spacing and visibility on mobile and desktop.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Screen reader friendly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Includes proper ARIA labels and keyboard navigation support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Demo</CardTitle>
            <CardDescription>
              Click the floating button to see it in action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleAISummaryClick}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Bot className="h-4 w-4" />
                <span>Test Click</span>
              </Button>
              <span className="text-sm text-muted-foreground">
                Click count: {clickCount}
              </span>
            </div>
            {lastClickTime && (
              <p className="text-sm text-muted-foreground">
                Last clicked at: {lastClickTime}
              </p>
            )}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Instructions:</strong> Look for the floating circular button in the bottom-right corner of your screen. 
                Hover over it to see the &ldquo;AI Summary&rdquo; tooltip, and click it to open the animated modal with AI insights.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>
              Built with modern React and TypeScript
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Components Used:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• shadcn/ui Button component</li>
                  <li>• Radix UI Tooltip</li>
                  <li>• Lucide React icons</li>
                  <li>• Tailwind CSS for styling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Fixed positioning (bottom-right)</li>
                  <li>• Hover tooltip</li>
                  <li>• Theme-aware styling</li>
                  <li>• Smooth transitions</li>
                  <li>• High z-index for visibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* The actual floating button */}
      <AISummaryButton />
    </div>
  );
} 