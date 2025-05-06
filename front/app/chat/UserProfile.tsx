'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User as UserIcon, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useSocketStore } from './socket';
import { useThemeStore } from '../../store/theme-store';
import api from "@/lib/api";

const COLORS = [
  { value: 'purple', label: 'Violet', color: 'bg-purple-600' },
  { value: 'blue', label: 'Bleu', color: 'bg-blue-600' },
  { value: 'green', label: 'Vert', color: 'bg-green-600' },
  { value: 'red', label: 'Rouge', color: 'bg-red-600' },
  { value: 'orange', label: 'Orange', color: 'bg-orange-600' },
  { value: 'pink', label: 'Rose', color: 'bg-pink-600' },
  { value: 'indigo', label: 'Indigo', color: 'bg-indigo-600' },
  { value: 'teal', label: 'Teal', color: 'bg-teal-600' },
];

export function UserProfile() {
  const { user, logout } = useAuth();
  const isConnected = useSocketStore((state) => state.isConnected);
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.theme) {
      setTheme(user.theme);
    }
  }, [user?.theme, setTheme]);

  const selectedColor = COLORS.find(color => color.value === theme);

  const handleThemeChange = async (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
    
    try {
      await api.put(`users/${user?.id}`, {
        theme: newTheme
      });
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <UserIcon className={`text-${theme}-600`} size={20} />
          <h2 className="font-bold text-lg">Mon Profil</h2>
        </div>
      
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          onClick={logout}
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Se déconnecter</span>
        </Button>
      </div>

      <div className="p-6 flex-grow">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className={`bg-${theme}-600 text-lg`}>
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-medium mt-1 ${
            isConnected 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isConnected ? 'En ligne' : 'Hors ligne'}
          </span>
        </div>

        <div>
          <div>
            <label className="text-md font-medium text-gray-700 block mb-2 text-center">Choisis ton thème</label>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-2 border rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded ${selectedColor?.color}`} />
                  <span>{selectedColor?.label}</span>
                </div>
                <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute z-10 w-full mt-1 p-2 bg-white border rounded-md shadow-lg">
                  <div className="grid grid-cols-4 gap-2">
                    {COLORS.map(color => (
                      <button
                        key={color.value}
                        onClick={() => handleThemeChange(color.value)}
                        className={`w-12 h-12 rounded-md ${color.color} hover:opacity-80 transition-opacity ${
                          theme === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
