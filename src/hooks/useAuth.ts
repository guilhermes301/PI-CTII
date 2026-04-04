import { useEffect, useState } from 'react';
import { loginUser, loginBarber, registerUser, type User, type Barber } from '../lib/db';
import type { AuthFormData } from '../types/app';

const INITIAL_AUTH_DATA: AuthFormData = {
  name: '',
  email: '',
  password: '',
  phone: '',
};

const USER_STORAGE_KEY = 'barber_current_user';
const BARBER_STORAGE_KEY = 'barber_current_staff';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentBarber, setCurrentBarber] = useState<Barber | null>(null);
  const [authData, setAuthData] = useState<AuthFormData>(INITIAL_AUTH_DATA);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    const savedBarber = localStorage.getItem(BARBER_STORAGE_KEY);

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    if (savedBarber) {
      setCurrentBarber(JSON.parse(savedBarber));
    }
  }, []);

  const persistUser = (user: User | null) => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }

    setCurrentUser(user);
  };

  const persistBarber = (barber: Barber | null) => {
    if (barber) {
      localStorage.setItem(BARBER_STORAGE_KEY, JSON.stringify(barber));
    } else {
      localStorage.removeItem(BARBER_STORAGE_KEY);
    }

    setCurrentBarber(barber);
  };

  const resetAuthForm = () => setAuthData(INITIAL_AUTH_DATA);

  const login = () => {
    const user = loginUser(authData.email, authData.password);
    persistBarber(null);
    persistUser(user);
    resetAuthForm();
    return user;
  };

  const loginBarberSession = () => {
    const barber = loginBarber(authData.email, authData.password);
    persistUser(null);
    persistBarber(barber);
    resetAuthForm();
    return barber;
  };

  const register = () => {
    const user = registerUser({
      name: authData.name,
      email: authData.email,
      phone: authData.phone,
      password: authData.password,
    });

    persistBarber(null);
    persistUser(user);
    resetAuthForm();
    return user;
  };

  const logout = () => {
    persistUser(null);
  };

  const logoutBarber = () => {
    persistBarber(null);
  };

  return {
    currentUser,
    currentBarber,
    authData,
    setAuthData,
    login,
    loginBarberSession,
    register,
    logout,
    logoutBarber,
    resetAuthForm,
  };
}