import { useState, useEffect } from 'react';
import { loginUser, registerUser, type User } from '../lib/db';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Mantivemos esta variável apenas para não quebrar outras telas que ainda existam
  const [currentBarber, setCurrentBarber] = useState<any | null>(null); 
  
  // Adicionamos o 'phone' (telefone) aqui para o front-end enviar ao MariaDB!
  const [authData, setAuthData] = useState({ name: '', email: '', phone: '', password: '' });

  useEffect(() => {
    const user = localStorage.getItem('barber_current_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const login = async () => {
    const user = await loginUser(authData.email, authData.password);
    setCurrentUser(user);
    localStorage.setItem('barber_current_user', JSON.stringify(user));
  };

  const register = async () => {
    const user = await registerUser({
      name: authData.name,
      email: authData.email,
      phone: authData.phone, // Enviando o telefone no cadastro
      password: authData.password,
    });
    setCurrentUser(user);
    localStorage.setItem('barber_current_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('barber_current_user');
  };

  // Mantido vazio apenas para não dar erro nas desestruturações antigas
  const logoutBarber = () => {
    setCurrentBarber(null);
  };

  const resetAuthForm = () => setAuthData({ name: '', email: '', phone: '', password: '' });

  return {
    currentUser,
    currentBarber,
    authData,
    setAuthData,
    login,
    register,
    logout,
    logoutBarber,
    resetAuthForm,
  };
}