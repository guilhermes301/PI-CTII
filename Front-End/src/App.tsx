import { useEffect, useState, type FormEvent } from 'react';
import { getBarbers, getServices, addBarber, removeBarber, type Service, type Barber } from './lib/db';
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
import { AdminPanelScreen } from './components/admin/AdminPanelScreen';
import { BarberPanelScreen } from './components/barber/BarberPanelScreen';

function App() {
  const [step, setStep] = useState<AppStep>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [servicesList, setServicesList] = useState(getServices());
  const [barbersList, setBarbersList] = useState<Barber[]>([]);
  
  // Apenas o nome do barbeiro é necessário agora para o cadastro
  const [newBarberName, setNewBarberName] = useState('');
  
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');

  const { darkMode, setDarkMode } = useTheme();
  const {
    currentUser,
    currentBarber,
    authData,
    setAuthData,
    login,
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

  // Busca os barbeiros do Banco de Dados ao abrir o App
  useEffect(() => {
    setServicesList(getServices());
    getBarbers().then(setBarbersList);
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

  const handleClientLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(); // O useAuth deve lidar com o request
      setStep(selectedService ? 'form' : 'home');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleClientRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await register();
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

  const handleAppointmentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg('');

    try {
      const created = await submitAppointment(selectedService);
      if (!created) return;

      setEmailStatus('idle');
      setStep('success');
    } catch (error) {
      setErrorMsg((error as Error).message);
    }
  };

  const handleClientCancel = async (id: string) => {
    if (confirm('Tem certeza? O horário ficará livre para outro cliente.')) {
      await cancelByClient(id);
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

  // Funções de Administração conectadas ao Backend
  const handleAddBarber = async () => {
    if (!newBarberName.trim()) {
      alert('Preencha o nome do barbeiro.');
      return;
    }

    try {
      await addBarber(newBarberName);
      const updatedList = await getBarbers(); // Recarrega a lista do banco
      setBarbersList(updatedList);
      setNewBarberName('');
      alert('Barbeiro adicionado com sucesso!');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleRemoveBarber = async (id: number) => {
    if (confirm('Remover este barbeiro da equipe?')) {
      try {
        await removeBarber(id);
        const updatedList = await getBarbers(); // Recarrega a lista do banco
        setBarbersList(updatedList);
      } catch (error) {
        alert((error as Error).message);
      }
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

      case 'admin-panel':
        return (
          <AdminPanelScreen
            barbers={barbersList}
            allAppointments={allAppointments}
            newBarberName={newBarberName}
            setNewBarberName={setNewBarberName}
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
        // O AdminPanel agora só abre se o usuário atual for is_admin
        onOpenAdmin={() => currentUser?.is_admin ? setStep('admin-panel') : alert('Acesso restrito.')}
        onOpenMyAppointments={handleOpenMyAppointments}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-md p-4 pb-20">
        {renderCurrentScreen()}

        {/* Botão para o Admin acessar o painel caso esteja logado e na Home */}
        {step === 'home' && currentUser?.is_admin && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => {
                refreshAppointments(true);
                setStep('admin-panel');
              }}
              className="rounded-xl border border-blue-500 bg-blue-500/10 text-blue-600 px-4 py-2 text-sm hover:bg-blue-500/20 dark:text-blue-400"
            >
              👑 Acessar Painel de Administração
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;