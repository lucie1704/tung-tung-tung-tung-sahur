'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, User as UserIcon } from 'lucide-react';
import { LoginForm } from './LoginForm';
import type { User } from '@/types/user';

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');

  // Simulation des messages
  const messages = [
    { id: 1, sender: 'user1', content: 'Bonjour, comment ça va?', timestamp: '10:30' },
    { id: 2, sender: 'user2', content: 'Très bien, merci! Et toi?', timestamp: '10:32' },
    {
      id: 3,
      sender: 'user1',
      content: 'Super! Je travaille sur un nouveau projet.',
      timestamp: '10:35',
    },
  ];

  const handleLogout = (): void => {
    setUser(null);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-purple-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-2/3 w-2/3 mx-4 flex overflow-hidden rounded-xl shadow-2xl bg-background">
          {/* Section Chat (Gauche) */}
          <div className="w-3/5 flex flex-col">
            <div className="p-4 border-b flex items-center space-x-2">
              <MessageSquare className="text-purple-600" size={20} />
              <h2 className="font-bold text-lg">Chat Room</h2>
            </div>

            <div className="flex-grow relative">
              {!user && (
                <div className="absolute inset-0 backdrop-blur-md z-10 flex items-center justify-center bg-black/5">
                  <div className="bg-white/80 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Connectez-vous pour chatter
                    </h3>
                    <p className="text-gray-600">
                      Accédez à toutes les conversations en vous connectant
                    </p>
                  </div>
                </div>
              )}

              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user1' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.sender === 'user1'
                            ? 'bg-purple-600 text-white rounded-br-none'
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <span
                          className={`text-xs ${msg.sender === 'user1' ? 'text-purple-200' : 'text-gray-500'} block text-right mt-1`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {user && (
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Tapez votre message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="flex-grow"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700">Envoyer</Button>
                </div>
              </div>
            )}
          </div>

          {/* Section Profil/Auth (Droite) */}
          <div className="w-2/5 border-l flex flex-col">
            {user ? (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex items-center space-x-2">
                  <UserIcon className="text-purple-600" size={20} />
                  <h2 className="font-bold text-lg">Mon Profil</h2>
                </div>

                <div className="p-6 flex-grow">
                  <div className="flex flex-col items-center mb-6 pb-6 border-b">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-purple-600 text-xl">
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium mt-1">
                      En ligne
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Nom d'utilisateur
                      </label>
                      <Input defaultValue={user.username} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Statut</label>
                      <Input placeholder="Qu'est-ce qui vous préoccupe?" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Thème</label>
                      <select className="w-full p-2 border rounded-md bg-white">
                        <option>Clair</option>
                        <option>Sombre</option>
                        <option>Système</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t mt-auto">
                  <Button
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Se déconnecter
                  </Button>
                </div>
              </div>
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
