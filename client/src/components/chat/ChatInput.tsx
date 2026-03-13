import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechToText } from "@/hooks/use-speech-to-text";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  isLoading,
  placeholder = "Спросите о чем угодно...",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isListening, transcript, startListening, stopListening } = useSpeechToText();

  useEffect(() => {
    if (transcript) {
      onChange(transcript);
    }
  }, [transcript, onChange]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="relative flex flex-col w-full max-w-4xl mx-auto px-4">
      <div 
        className={cn(
          "relative glass-dark rounded-3xl border border-white/10 transition-all duration-300 ease-in-out px-2 pt-2 pb-2",
          "focus-within:border-primary/40 focus-within:shadow-[0_0_20px_rgba(0,0,0,0.4),0_0_1px_1px_rgba(var(--color-primary),0.1)]"
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white/90 placeholder:text-white/30 resize-none py-3 px-4 max-h-60 overflow-y-auto text-[1rem] leading-relaxed"
          disabled={isLoading}
        />
        
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={isListening ? stopListening : startListening}
              className={cn(
                "rounded-full h-10 w-10 transition-all duration-200",
                isListening 
                  ? "text-error bg-error/15 hover:bg-error/20" 
                  : "text-white/40 hover:text-white hover:bg-white/10"
              )}
              title={isListening ? "Остановить запись" : "Голосовой ввод"}
            >
              {isListening ? <MicOff size={22} className="animate-pulse" /> : <Mic size={22} />}
            </Button>
          </div>

          <Button
            size="icon"
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            className={cn(
              "rounded-2xl h-10 w-10 transition-all duration-300",
              value.trim() 
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-100 opacity-100" 
                : "bg-white/5 text-white/10 scale-95 opacity-50 cursor-not-allowed"
            )}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </Button>
        </div>
      </div>
      
      {isLoading && (
        <div className="absolute -top-1 left-4 right-4 h-0.5 overflow-hidden rounded-full">
          <div className="h-full bg-primary animate-progress-indeterminate w-full bg-linear-to-r from-transparent via-primary to-transparent" />
        </div>
      )}
    </div>
  );
};
