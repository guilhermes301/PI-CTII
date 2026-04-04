import { useEffect, useState } from 'react';
import {
  getAppointments,
  getAppointmentsByBarber,
  saveAppointment,
  cancelAppointment,
  cancelAppointmentByBarber,
  acceptAppointment,
  hideAppointmentFromClient,
  type Appointment,
  type Barber,
  type Service,
  type User,
} from '../lib/db';
import type { BookingFormData } from '../types/app';

const INITIAL_FORM_DATA: BookingFormData = { date: '', time: '' };

export function useAppointments(
  currentUser: User | null,
  currentBarber: Barber | null,
  currentStep: string
) {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [barberAppointments, setBarberAppointments] = useState<Appointment[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [errorMsg, setErrorMsg] = useState('');

  const refreshAppointments = (reverse = false) => {
    const appointments = getAppointments();
    const nextAppointments = reverse ? [...appointments].reverse() : appointments;
    setAllAppointments(nextAppointments);
    return nextAppointments;
  };

  const refreshBarberAppointments = (barberId: number) => {
    const appointments = getAppointmentsByBarber(barberId);

    const orderedAppointments = [...appointments].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return dateA - dateB;
    });

    setBarberAppointments(orderedAppointments);
    return orderedAppointments;
  };

  const resetBookingForm = () => {
    setSelectedBarber(null);
    setFormData(INITIAL_FORM_DATA);
    setErrorMsg('');
  };

  const submitAppointment = (selectedService: Service | null) => {
    setErrorMsg('');

    if (!selectedService || !selectedBarber || !currentUser) {
      return false;
    }

    saveAppointment({
      clientName: currentUser.name,
      clientEmail: currentUser.email,
      clientPhone: currentUser.phone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      barberId: selectedBarber.id,
      barberName: selectedBarber.name,
      date: formData.date,
      time: formData.time,
    });

    refreshAppointments();
    return true;
  };

  const cancelByClient = (id: string) => {
    cancelAppointment(id);
    refreshAppointments();
  };

  const dismissFromClient = (id: string) => {
    hideAppointmentFromClient(id);
    refreshAppointments();
  };

  const approveAppointment = (id: string) => {
    acceptAppointment(id);
    refreshAppointments();

    if (currentBarber) {
      refreshBarberAppointments(currentBarber.id);
    }
  };

  const rejectAppointment = (id: string) => {
    cancelAppointmentByBarber(id);
    refreshAppointments();

    if (currentBarber) {
      refreshBarberAppointments(currentBarber.id);
    }
  };

  const rescheduleAppointment = (appointment: Appointment) => {
    cancelAppointment(appointment.id);
    resetBookingForm();
    refreshAppointments();
  };

  useEffect(() => {
    if (currentStep === 'my-appointments' && currentUser) {
      const visibleAppointments = getAppointments()
        .filter(
          app =>
            app.clientEmail === currentUser.email && app.visibleToClient !== false,
        )
        .reverse();

      setMyAppointments(visibleAppointments);
    }
  }, [currentStep, currentUser, allAppointments]);

  useEffect(() => {
    if (currentStep === 'barber-panel' && currentBarber) {
      refreshBarberAppointments(currentBarber.id);
    }
  }, [currentStep, currentBarber, allAppointments]);

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
    refreshBarberAppointments,
    resetBookingForm,
    submitAppointment,
    cancelByClient,
    dismissFromClient,
    approveAppointment,
    rejectAppointment,
    rescheduleAppointment,
  };
}