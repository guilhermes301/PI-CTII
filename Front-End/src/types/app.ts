export type AppStep =
  | 'home'
  | 'auth-login'
  | 'auth-register'
  | 'form'
  | 'success'
  | 'my-appointments'
  | 'admin-login'
  | 'admin-panel'
  | 'barber-login'
  | 'barber-panel';

export interface AuthFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface BookingFormData {
  date: string;
  time: string;
}

export type EmailStatus = 'idle' | 'sending' | 'sent';
