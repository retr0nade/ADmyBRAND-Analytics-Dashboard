"use client";

import { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AISummaryModal } from './ai-summary-modal';

interface AISummaryButtonProps {
  onClick?: () => void;
}

export function AISummaryButton({ onClick }: AISummaryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
    onClick?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleButtonClick}
              size="icon"
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90 text-primary-foreground z-50"
              aria-label="AI Summary"
            >
              <Bot className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-popover text-popover-foreground">
            <p>AI Summary</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <AISummaryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
} 