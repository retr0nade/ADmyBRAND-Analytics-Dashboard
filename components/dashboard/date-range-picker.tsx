"use client";

import { useState } from 'react';
import { format, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
}

export function DateRangePicker({ dateRange, onDateRangeChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!dateRange.from) {
      // First date selected
      onDateRangeChange({ from: startOfDay(date), to: undefined });
    } else if (!dateRange.to) {
      // Second date selected
      if (isAfter(date, dateRange.from)) {
        onDateRangeChange({ from: dateRange.from, to: endOfDay(date) });
        setIsOpen(false);
      } else {
        // If second date is before first date, swap them
        onDateRangeChange({ from: startOfDay(date), to: endOfDay(dateRange.from) });
        setIsOpen(false);
      }
    } else {
      // Reset and start new selection
      onDateRangeChange({ from: startOfDay(date), to: undefined });
    }
  };

  const handleClear = () => {
    onDateRangeChange({ from: undefined, to: undefined });
  };

  const getDisplayText = () => {
    if (!dateRange.from) {
      return "Select date range";
    }
    
    if (!dateRange.to) {
      return `From ${format(dateRange.from, "MMM dd, yyyy")}`;
    }
    
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dateRange.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {getDisplayText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange.from}
          selected={dateRange}
          onSelect={(range) => {
            if (range) {
              onDateRangeChange({
                from: range.from,
                to: range.to
              });
            }
          }}
          numberOfMonths={2}
          className="rounded-md border"
        />
        <div className="flex items-center justify-between p-3 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="text-xs"
          >
            Clear
          </Button>
          <div className="text-xs text-muted-foreground">
            {dateRange.from && dateRange.to && (
              <span>
                {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} days selected
              </span>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 