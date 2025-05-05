'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { socket } from './socket';
import { useAuth } from '@/context/auth-context';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    setIsLoading(true);
    socket
      .timeout(1000)
      .emit('message', { sender: user.username, text: message }, () => {
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
          onChange={e => setMessage(e.target.value)}
          className="pr-12 rounded-full"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-purple-600 hover:bg-transparent p-0 h-auto"
          disabled={isLoading || !message.trim() || !user}
        >
          <Send size={24} className="fill-purple-600" />
        </Button>
      </div>
    </form>
  );
} 