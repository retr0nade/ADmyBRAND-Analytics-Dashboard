"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot, X, TrendingUp, Users, Target, BarChart3, Sparkles, Loader2, MessageCircle, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface AISummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AISummaryModal({ isOpen, onClose }: AISummaryModalProps) {
  const pathname = usePathname();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [showResponse, setShowResponse] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Detect current page
  const isOverviewPage = pathname === '/';
  const isReportsPage = pathname === '/reports';
  const isManageCampaignsPage = pathname === '/manage-campaigns';
  const currentPage = isOverviewPage ? 'overview' : isReportsPage ? 'reports' : isManageCampaignsPage ? 'manage-campaigns' : 'unknown';

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Add message to chat
  const addMessage = (sender: 'user' | 'assistant', text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  // Handle AI response generation
  const handleAIRequest = async (requestType: string) => {
    // Add user message to chat
    const userMessage = getPromptText(requestType);
    addMessage('user', userMessage);
    
    setIsGenerating(true);
    setShowResponse(false);
    setAiResponse('');
    setIsTyping(false);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Start typing animation
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate response based on page and request type
    let response = '';
    
         if (currentPage === 'overview') {
       switch (requestType) {
         case 'summary':
           response = `📊 <strong>Dashboard Overview Summary</strong>\n\nYour campaigns are showing strong performance with:\n• <strong>Revenue</strong>: ₹2.4M (+24.5% vs last month)\n• <strong>Active Users</strong>: 45.2K (+18.2% growth)\n• <strong>Conversions</strong>: 12.8K (+31.4% increase)\n• <strong>Overall Growth</strong>: 22.3% across all metrics\n\nThe "Summer Sale Campaign" is driving 32% of total revenue, while user engagement has improved by 28% through optimized targeting.`;
           break;
         case 'best-campaigns':
           response = `🔥 <strong>Top Performing Campaigns</strong>\n\n1. <strong>Summer Sale Campaign</strong> (+32% ROI)\n   - 2.4K conversions, ₹480K revenue\n   - High engagement, strong CTR\n\n2. <strong>Brand Awareness</strong> (+28% ROI)\n   - 1.8K conversions, ₹360K revenue\n   - Consistent performance\n\n3. <strong>Product Launch</strong> (+24% ROI)\n   - 1.2K conversions, ₹240K revenue\n   - Growing steadily`;
           break;
         case 'improvements':
           response = `💡 <strong>Performance Optimization Suggestions</strong>\n\n• <strong>Increase budget</strong> for Summer Sale Campaign by 15%\n• <strong>A/B test</strong> ad copy for Brand Awareness campaign\n• <strong>Expand targeting</strong> for Product Launch to similar audiences\n• <strong>Optimize landing pages</strong> to improve conversion rates\n• <strong>Implement retargeting</strong> for abandoned cart users`;
           break;
       }
     } else if (currentPage === 'reports') {
       switch (requestType) {
         case 'summary':
           response = `📈 <strong>Reports Analysis Summary</strong>\n\nBased on your campaign data:\n• <strong>Total Campaigns</strong>: 8 active campaigns\n• <strong>Average ROI</strong>: 24.5% across all campaigns\n• <strong>Best Performer</strong>: Summer Sale (+32% ROI)\n• <strong>Total Revenue</strong>: ₹2.4M from all campaigns\n• <strong>Conversion Rate</strong>: 3.2% (industry average: 2.1%)\n\nYour campaigns are performing 16% above industry benchmarks.`;
           break;
         case 'best-campaigns':
           response = `🏆 <strong>Campaign Performance Analysis</strong>\n\n<strong>Top 3 Campaigns by ROI:</strong>\n\n1. <strong>Summer Sale Campaign</strong>\n   - ROI: +32% | Revenue: ₹480K\n   - CTR: 4.2% | Conversions: 2.4K\n   - Status: Active & Optimized\n\n2. <strong>Brand Awareness</strong>\n   - ROI: +28% | Revenue: ₹360K\n   - CTR: 3.8% | Conversions: 1.8K\n   - Status: Active\n\n3. <strong>Product Launch</strong>\n   - ROI: +24% | Revenue: ₹240K\n   - CTR: 3.1% | Conversions: 1.2K\n   - Status: Active`;
           break;
         case 'improvements':
           response = `🚀 <strong>Strategic Recommendations</strong>\n\n<strong>Immediate Actions:</strong>\n• Scale Summer Sale Campaign budget by 20%\n• Optimize Brand Awareness ad copy (CTR below average)\n• Implement lookalike audiences for Product Launch\n\n<strong>Long-term Strategy:</strong>\n• Develop seasonal campaign calendar\n• Implement advanced attribution modeling\n• Create automated bid optimization rules\n• Set up real-time performance alerts`;
           break;
       }
     } else if (currentPage === 'manage-campaigns') {
       switch (requestType) {
         case 'summary':
           response = `📊 <strong>Campaign Management Summary</strong>\n\nYour campaign management overview:\n• <strong>Total Campaigns</strong>: 15 campaigns across all statuses\n• <strong>Active Campaigns</strong>: 8 currently running\n• <strong>Paused Campaigns</strong>: 4 temporarily stopped\n• <strong>Completed Campaigns</strong>: 3 finished campaigns\n• <strong>Average Budget</strong>: ₹45K per campaign\n• <strong>Total Spent</strong>: ₹675K across all campaigns\n\nCampaign management is well-organized with good status tracking.`;
           break;
         case 'best-campaigns':
           response = `🔥 <strong>Top Campaigns by Performance</strong>\n\n<strong>Best Performing Campaigns:</strong>\n\n1. <strong>Summer Sale Campaign</strong>\n   - Status: Active | Budget: ₹50K\n   - ROI: +32% | High engagement\n   - Recommendation: Scale budget\n\n2. <strong>Brand Awareness</strong>\n   - Status: Active | Budget: ₹40K\n   - ROI: +28% | Consistent performance\n   - Recommendation: Continue current strategy\n\n3. <strong>Product Launch</strong>\n   - Status: Active | Budget: ₹35K\n   - ROI: +24% | Growing steadily\n   - Recommendation: Optimize targeting`;
           break;
         case 'improvements':
           response = `💡 <strong>Campaign Management Suggestions</strong>\n\n<strong>Immediate Actions:</strong>\n• <strong>Reactivate</strong> paused campaigns with high potential\n• <strong>Increase budget</strong> for top-performing campaigns\n• <strong>Optimize</strong> underperforming campaigns\n• <strong>Review</strong> completed campaigns for insights\n\n<strong>Management Tips:</strong>\n• Set up automated status alerts\n• Implement budget pacing rules\n• Create campaign templates for consistency\n• Schedule regular performance reviews`;
           break;
       }
     }

    // Add assistant response to chat
    addMessage('assistant', response);
    setAiResponse(response);
    setIsGenerating(false);
    setIsTyping(false);
    setShowResponse(true);
  };

  // Get prompt text for different request types
  const getPromptText = (requestType: string): string => {
    switch (requestType) {
      case 'summary':
        return '📈 Give me a quick summary';
      case 'best-campaigns':
        return '🔥 Which campaigns performed best?';
      case 'improvements':
        return '💡 Suggestions to improve performance';
      default:
        return '';
    }
  };

  // Handle sending custom message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    addMessage('user', inputMessage);
    setInputMessage('');
    
    // Simulate AI response
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = `I understand you're asking about "${inputMessage}". Let me analyze your campaign data and provide insights. This is a simulated response - in a real implementation, this would connect to an AI service.`;
    
    addMessage('assistant', response);
    setIsGenerating(false);
  };

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setShowResponse(false);
      setAiResponse('');
      setIsGenerating(false);
      setIsTyping(false);
      setChatMessages([]);
      setInputMessage('');
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

    return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed bottom-20 right-6 w-96 h-[500px] overflow-hidden p-0 border-0 shadow-2xl bg-background/95 backdrop-blur-sm z-[9999] !left-auto !top-auto !translate-x-0 !translate-y-0 [&>button]:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3
          }}
          className="flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">AI Assistant</DialogTitle>
                <p className="text-sm text-muted-foreground">Campaign Performance Insights</p>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>

          {/* Chat Container */}
          <div className="flex-1 flex flex-col">
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]"
            >
              {chatMessages.length === 0 && (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Bot className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">AI Insights</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ask for a summary or explore insights for this page.
                  </p>
                  
                  {/* Quick Prompts */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-auto p-3 text-left hover:bg-muted/50 transition-colors"
                      onClick={() => handleAIRequest('summary')}
                      disabled={isGenerating}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">📈</span>
                        <div>
                          <p className="font-medium">Give me a quick summary</p>
                          <p className="text-xs text-muted-foreground">Get an overview of current performance</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-auto p-3 text-left hover:bg-muted/50 transition-colors"
                      onClick={() => handleAIRequest('best-campaigns')}
                      disabled={isGenerating}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🔥</span>
                        <div>
                          <p className="font-medium">Which campaigns performed best?</p>
                          <p className="text-xs text-muted-foreground">Discover top-performing campaigns</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-auto p-3 text-left hover:bg-muted/50 transition-colors"
                      onClick={() => handleAIRequest('improvements')}
                      disabled={isGenerating}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">💡</span>
                        <div>
                          <p className="font-medium">Suggestions to improve performance</p>
                          <p className="text-xs text-muted-foreground">Get actionable optimization tips</p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`flex-1 min-w-0 ${message.sender === 'user' ? 'order-first' : ''}`}>
                                         <div className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${
                       message.sender === 'user' 
                         ? 'bg-primary text-primary-foreground rounded-br-sm ml-auto' 
                         : 'bg-muted/50 rounded-bl-sm'
                     }`}>
                       <div 
                         className="text-sm whitespace-pre-line leading-relaxed"
                         dangerouslySetInnerHTML={{ __html: message.text }}
                       />
                     </div>
                    <p className={`text-xs text-muted-foreground mt-1 ${
                      message.sender === 'user' ? 'text-right' : 'ml-1'
                    }`}>
                      {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">U</span>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Animation */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="flex items-center justify-center p-4 space-x-3 bg-muted/30 rounded-lg">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <p className="text-sm font-medium">Generating response...</p>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t bg-background p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  disabled={isGenerating}
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isGenerating}
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
} 