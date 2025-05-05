'use client';

import { AuthProvider } from '@/context/auth-context';
import { ChatProvider } from '@/context/chat-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChatProvider>{children}</ChatProvider>
    </AuthProvider>
  );
} 