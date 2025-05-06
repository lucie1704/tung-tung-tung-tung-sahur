'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { socket } from './socket';
import { useAuth } from '@/context/auth-context';
import { useThemeStore } from '../../store/theme-store';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { theme } = useThemeStore();

  const handleTyping = useCallback(() => {
    if (!user) return;
    
    const typingTimeout = setTimeout(() => {
      socket.emit('typing', { username: user.username, isTyping: true });
      
      const stopTypingTimeout = setTimeout(() => {
        socket.emit('typing', { username: user.username, isTyping: false });
      }, 1000);
      
      return () => clearTimeout(stopTypingTimeout);
    }, 500);

    return () => clearTimeout(typingTimeout);
  }, [user]);

  useEffect(() => {
    return () => {
      socket.emit('typing', { username: user?.username, isTyping: false });
    };
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    setIsLoading(true);
    socket
      .timeout(1000)
      .emit('message', { sender: user.username, text: message, theme: user.theme }, () => {
        setIsLoading(false);
        setMessage('');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="relative">
        <Input
          placeholder="Tapez votre message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          className="pr-12 rounded-full"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-${theme}-600 hover:bg-transparent p-0 h-auto`}
          disabled={isLoading || !message.trim() || !user}
        >
          <Send size={24} className={`fill-${theme}-600`} />
        </Button>
      </div>
    </form>
  );
} 