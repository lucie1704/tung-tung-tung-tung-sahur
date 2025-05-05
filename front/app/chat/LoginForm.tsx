import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import api from "@/lib/api";

export function LoginForm() {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      await login(username, password);
      void router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    await api.post("auth/register", {
      username,
      password,
      confirmPassword
    });

    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full items-center mt-16">
      <div className="w-2/3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="login">Se connecter</TabsTrigger>
            <TabsTrigger value="register">S'inscrire</TabsTrigger>
          </TabsList>

          <div className="py-4">
            <TabsContent value="login" className="mt-0">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Nom d'utilisateur
                  </label>
                  <Input value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Input
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Se connecter
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <form onSubmit={handleRegister}  className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Nom d'utilisateur
                  </label>
                  <Input />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Input
                      type={showRegisterPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={e => setRegisterPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="button" className="w-full bg-purple-600 hover:bg-purple-700">
                  Créer un compte
                </Button>
              </form>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
