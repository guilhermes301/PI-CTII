import { useEffect, useState, type FormEvent } from 'react';
import { getBarbers, getServices, addBarber, removeBarber, type Service } from './lib/db';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import { useAppointments } from './hooks/useAppointments';
import type { AppStep, EmailStatus } from './types/app';
import { Header } from './components/layout/Header';
import { HomeScreen } from './components/home/HomeScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { BookingFormScreen } from './components/booking/BookingFormScreen';
import { MyAppointmentsScreen } from './components/booking/MyAppointmentsScreen';
import { SuccessScreen } from './components/booking/SuccessScreen';
import { AdminLoginScreen } from './components/admin/AdminLoginScreen';
import { AdminPanelScreen } from './components/admin/AdminPanelScreen';
import { BarberLoginScreen } from './components/barber/BarberLoginScreen';
import { BarberPanelScreen } from './components/barber/BarberPanelScreen';

function App() {
  const [step, setStep] = useState<AppStep>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [servicesList, setServicesList] = useState(getServices());
  const [barbersList, setBarbersList] = useState(getBarbers());
  const [adminPass, setAdminPass] = useState('');
  const [newBarberName, setNewBarberName] = useState('');
  const [newBarberEmail, setNewBarberEmail] = useState('');
  const [newBarberPassword, setNewBarberPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [barberErrorMsg, setBarberErrorMsg] = useState('');

  const { darkMode, setDarkMode } = useTheme();
  const {
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
  } = useAuth();

  const {
    allAppointments,
    myAppointments,
    barberAppointments,
    selectedBarber,
    setSelectedBarber,
    formData,
    setFormData,
    errorMsg,
    setErrorMsg,
    refreshAppointments,
    resetBookingForm,
    submitAppointment,
    cancelByClient,
    dismissFromClient,
    approveAppointment,
    rejectAppointment,
    rescheduleAppointment,
  } = useAppointments(currentUser, currentBarber, step);

  useEffect(() => {
    setServicesList(getServices());
    setBarbersList(getBarbers());
  }, []);

  const goHome = () => setStep('home');

  const resetSelectionFlow = () => {
    setSelectedService(null);
    resetBookingForm();
  };

  const handleOpenLogin = () => {
    setSelectedService(null);
    resetAuthForm();
    setStep('auth-login');
  };

  const handleOpenBarberLogin = () => {
    setBarberErrorMsg('');
    resetAuthForm();
    setStep('barber-login');
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setStep(currentUser ? 'form' : 'auth-login');
  };

  const handleOpenMyAppointments = () => {
    if (currentUser) {
      setStep('my-appointments');
      return;
    }

    setSelectedService(null);
    setStep('auth-login');
  };

  const handleClientLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      login();
      setStep(selectedService ? 'form' : 'home');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleBarberLogin = () => {
    setBarberErrorMsg('');

    try {
      loginBarberSession();
      setStep('barber-panel');
    } catch (error) {
      setBarberErrorMsg((error as Error).message);
    }
  };

  const handleClientRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      register();
      alert('Conta criada com sucesso!');
      setStep(selectedService ? 'form' : 'home');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleLogout = () => {
    if (confirm('Sair da conta?')) {
      logout();
      setStep('home');
    }
  };

  const handleBarberLogout = () => {
    if (confirm('Sair da área do barbeiro?')) {
      logoutBarber();
      setStep('home');
    }
  };

  const handleAppointmentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg('');

    try {
      const created = submitAppointment(selectedService);
      if (!created) return;

      setEmailStatus('idle');
      setStep('success');
    } catch (error) {
      setErrorMsg((error as Error).message);
    }
  };

  const handleClientCancel = (id: string) => {
    if (confirm('Tem certeza? O horário ficará livre para outro cliente.')) {
      cancelByClient(id);
    }
  };

  const handleDismiss = (id: string) => {
    dismissFromClient(id);
  };

  const handleApproveAppointment = (id: string) => {
    if (confirm('Confirmar este agendamento?')) {
      approveAppointment(id);
    }
  };

  const handleRejectAppointment = (id: string) => {
    if (confirm('Cancelar este agendamento?')) {
      rejectAppointment(id);
    }
  };

  const handleReschedule = (appointment: Parameters<typeof rescheduleAppointment>[0]) => {
    rescheduleAppointment(appointment);
    setSelectedService(null);
    setStep('home');
  };

  const handleAdminLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (adminPass === 'admin123') {
      refreshAppointments(true);
      setStep('admin-panel');
      return;
    }

    alert('Senha incorreta!');
  };

  const handleAddBarber = () => {
    if (!newBarberName.trim() || !newBarberEmail.trim() || !newBarberPassword.trim()) {
      alert('Preencha nome, e-mail e senha do barbeiro.');
      return;
    }

    try {
      const updated = addBarber(newBarberName, newBarberEmail, newBarberPassword);
      setBarbersList(updated);
      setNewBarberName('');
      setNewBarberEmail('');
      setNewBarberPassword('');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleRemoveBarber = (id: number) => {
    if (confirm('Remover este barbeiro?')) {
      const updated = removeBarber(id);
      setBarbersList(updated);
    }
  };

  const handleSendEmail = () => {
    setEmailStatus('sending');
    setTimeout(() => setEmailStatus('sent'), 2000);
  };

  const handleBookAnother = () => {
    resetSelectionFlow();
    setStep('home');
  };

  const renderCurrentScreen = () => {
    switch (step) {
      case 'home':
        return (
          <HomeScreen
            currentUser={currentUser}
            services={servicesList}
            darkMode={darkMode}
            onOpenLogin={handleOpenLogin}
            onSelectService={handleSelectService}
          />
        );

      case 'auth-login':
        return (
          <LoginScreen
            selectedService={selectedService}
            authData={authData}
            setAuthData={setAuthData}
            onSubmit={handleClientLogin}
            onGoRegister={() => setStep('auth-register')}
            onGoHome={goHome}
          />
        );

      case 'auth-register':
        return (
          <RegisterScreen
            authData={authData}
            setAuthData={setAuthData}
            onSubmit={handleClientRegister}
            onGoBack={() => setStep('auth-login')}
          />
        );

      case 'barber-login':
        return (
          <BarberLoginScreen
            authData={authData}
            setAuthData={setAuthData}
            errorMsg={barberErrorMsg}
            onSubmit={handleBarberLogin}
            onBack={goHome}
          />
        );

      case 'barber-panel':
        return (
          currentBarber && (
            <BarberPanelScreen
              barberName={currentBarber.name}
              appointments={barberAppointments}
              onApprove={handleApproveAppointment}
              onReject={handleRejectAppointment}
              onLogout={handleBarberLogout}
              onBack={goHome}
            />
          )
        );

      case 'form':
        return (
          selectedService &&
          currentUser && (
            <BookingFormScreen
              selectedService={selectedService}
              currentUser={currentUser}
              selectedBarber={selectedBarber}
              barbers={barbersList}
              formData={formData}
              errorMsg={errorMsg}
              darkMode={darkMode}
              onSelectBarber={setSelectedBarber}
              onChangeFormData={setFormData}
              onSubmit={handleAppointmentSubmit}
              onGoHome={goHome}
            />
          )
        );

      case 'my-appointments':
        return (
          currentUser && (
            <MyAppointmentsScreen
              currentUser={currentUser}
              appointments={myAppointments}
              darkMode={darkMode}
              onGoHome={goHome}
              onReschedule={handleReschedule}
              onCancel={handleClientCancel}
              onDismiss={handleDismiss}
            />
          )
        );

      case 'admin-login':
        return (
          <AdminLoginScreen
            adminPass={adminPass}
            setAdminPass={setAdminPass}
            darkMode={darkMode}
            onSubmit={handleAdminLogin}
            onGoHome={goHome}
          />
        );

      case 'admin-panel':
        return (
          <AdminPanelScreen
            barbers={barbersList}
            allAppointments={allAppointments}
            newBarberName={newBarberName}
            setNewBarberName={setNewBarberName}
            newBarberEmail={newBarberEmail}
            setNewBarberEmail={setNewBarberEmail}
            newBarberPassword={newBarberPassword}
            setNewBarberPassword={setNewBarberPassword}
            darkMode={darkMode}
            onAddBarber={handleAddBarber}
            onRemoveBarber={handleRemoveBarber}
            onExit={goHome}
          />
        );

      case 'success':
        return (
          currentUser && (
            <SuccessScreen
              currentUser={currentUser}
              selectedBarber={selectedBarber}
              emailStatus={emailStatus}
              darkMode={darkMode}
              onSendEmail={handleSendEmail}
              onOpenMyAppointments={() => setStep('my-appointments')}
              onBookAnother={handleBookAnother}
              onGoHome={goHome}
            />
          )
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}
    >
      <Header
        darkMode={darkMode}
        currentUser={currentUser}
        onGoHome={goHome}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenLogin={handleOpenLogin}
        onOpenAdmin={() => setStep('admin-login')}
        onOpenMyAppointments={handleOpenMyAppointments}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-md p-4 pb-20">
        {renderCurrentScreen()}

        {step === 'home' && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleOpenBarberLogin}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Área do Barbeiro
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;