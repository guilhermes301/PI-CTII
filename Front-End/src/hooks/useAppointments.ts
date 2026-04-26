import { useState, useEffect, useCallback } from 'react';
import { getAppointments, saveAppointment, cancelAppointment, type Appointment, type Service, type User } from '../lib/db';
import type { AppStep } from '../types/app';

export function useAppointments(
  currentUser: User | null,
  currentBarber: any | null,
  step: AppStep
) {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [errorMsg, setErrorMsg] = useState('');

  // Busca os dados reais do seu Back-End (Node.js -> MariaDB)
  const refreshAppointments = useCallback(async (force = false) => {
    if (currentUser || currentBarber || force) {
      try {
        const data = await getAppointments();
        setAllAppointments(data);
      } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
      }
    }
  }, [currentUser, currentBarber]);

  // Atualiza a lista sempre que o usuário muda de tela
  useEffect(() => {
    refreshAppointments();
  }, [step, refreshAppointments]);

  // Filtra os agendamentos do cliente logado
  const myAppointments = allAppointments.filter(
    (app) => app.clientName === currentUser?.name && app.visibleToClient
  );

  // Filtra os agendamentos do barbeiro logado (Área do Profissional)
  const barberAppointments = allAppointments.filter(
    (app) => app.barberName === currentBarber?.name
  );

  const resetBookingForm = () => {
    setSelectedBarber(null);
    setFormData({ date: '', time: '' });
    setErrorMsg('');
  };

  const submitAppointment = async (selectedService: Service | null) => {
    if (!selectedBarber || !formData.date || !formData.time || !selectedService) {
      throw new Error('Preencha todos os campos.');
    }
    
    // Chama a função que bate no seu POST /agendamentos
    await saveAppointment({
      clientName: currentUser?.name || '',
      clientEmail: currentUser?.email || '',
      clientPhone: currentUser?.phone || '',
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      barberId: selectedBarber,
      barberName: '', 
      date: formData.date,
      time: formData.time,
    });
    
    await refreshAppointments(true);
    return true;
  };

  const cancelByClient = async (id: string) => {
    await cancelAppointment(id); // Bate no PATCH /agendamentos/:id/cancelar
    await refreshAppointments(true);
  };

  const dismissFromClient = (id: string) => {
    // Apenas simulação no front para ocultar o card cancelado
    setAllAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, visibleToClient: false } : app)
    );
  };

  const approveAppointment = (id: string) => {
    // No MariaDB, o status já nasce como AGENDADO (confirmado no front).
    // Esta função fica apenas para manter o estado da interface visual.
    setAllAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, status: 'confirmed' } : app)
    );
  };

  const rejectAppointment = async (id: string) => {
    // O barbeiro usa a mesma rota do cliente para cancelar no banco
    await cancelAppointment(id);
    await refreshAppointments(true);
  };

  const rescheduleAppointment = (appointment: Appointment) => {
    setSelectedBarber(appointment.barberId);
    setFormData({ date: appointment.date, time: appointment.time });
  };

  return {
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
  };
}