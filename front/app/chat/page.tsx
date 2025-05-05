'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare } from 'lucide-react';
import { LoginOrRegisterForm } from './LoginOrRegisterForm';
import { useAuth } from '@/context/auth-context';
import { UserProfile } from './UserProfile';
import { MessageInput } from './MessageInput';
import { Message } from './Message';
import { socket } from './socket';

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'user1', content: 'Bonjour, comment ça va?', timestamp: '10:30' },
    { id: 2, sender: 'user2', content: 'Très bien, merci! Et toi?', timestamp: '10:32' },
    {
      id: 3,
      sender: 'user1',
      content: 'Super! Je travaille sur un nouveau projet.',
      timestamp: '10:35',
    },
  ]);

  useEffect(() => {
    socket.connect();

    socket.on('message', (message) => {
      setMessages(previousMessages => [...previousMessages, {
        id: Date.now(),
        sender: message.sender,
        content: message.text,
        timestamp: new Date().toLocaleTimeString()
      }]);
    });

    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-purple-900" data-scroll="false">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-2/3 w-2/3 mx-4 flex overflow-hidden rounded-xl shadow-2xl bg-background">
          {/* Section Chat (Gauche) */}
          <div className="w-3/5 flex flex-col">
            <div className="p-4 border-b flex items-center space-x-2">
              <MessageSquare className="text-purple-600" size={20} />
              <h2 className="font-bold text-lg">Chat Room</h2>
            </div>

            <div className="flex-grow relative">
              {!user && (
                <div className="absolute inset-0 backdrop-blur-sm z-10 flex items-center justify-center bg-gray-600/20">
                  <div className="bg-white/90 p-4 rounded-lg shadow-lg text-center max-w-xs">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Connectez-vous pour chatter
                    </h3>
                    <p className="text-sm text-gray-600">
                      Et accédez à toutes les conversations
                    </p>
                  </div>
                </div>
              )}

              <ScrollArea className="h-full">
                <div>
                  {messages.map(msg => (
                    <Message key={msg.id} {...msg} />
                  ))}
                </div>
              </ScrollArea>

            </div>
              <MessageInput />
          </div>

          {/* Section Profil/Auth (Droite) */}
          <div className="w-2/5 border-l flex flex-col">
            {user ? <UserProfile /> : <LoginOrRegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
