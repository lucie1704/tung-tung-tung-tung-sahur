'use client';

import { useAuth } from '@/context/auth-context';
import { useThemeStore } from '../../store/theme-store';

interface MessageProps {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

export function Message({ id, sender, content, timestamp }: MessageProps) {
  const { user } = useAuth();
  const { theme } = useThemeStore();
  const isCurrentUser = user?.username === sender;
  
  // Extraire uniquement l'heure et les minutes du timestamp
  const formatTime = (timeStr: string) => {
    return timeStr.split(':').slice(0, 2).join(':');
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 ${isCurrentUser ? 'bg-gray-100' : ''}`}>
      <div
        className={`inline-flex items-center px-2.5 rounded-full text-sm font-medium ${
          isCurrentUser
            ? `bg-${theme}-600 text-white`
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {sender}
      </div>
      <span className={`text-sm ${isCurrentUser ? `text-${theme}-600` : 'text-gray-800'}`}>
        {content}
      </span>
      <span className="ml-auto text-xs text-gray-500">
        {formatTime(timestamp)}
      </span>
    </div>
  );
}