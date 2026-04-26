export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const getFirstName = (name?: string) => {
  if (!name || typeof name !== 'string') return 'Cliente';
  return name.trim().split(' ')[0];
};

export const getUserInitial = (name?: string) => {
  if (!name || typeof name !== 'string') return 'U';
  const trimmedName = name.trim();
  return trimmedName ? trimmedName.charAt(0).toUpperCase() : 'U';
};

/**
 * Formata datas vindas do banco (YYYY-MM-DD) para o padrão brasileiro (DD/MM/YYYY)
 */
export const formatBrazilianDate = (dateStr: string) => {
  if (!dateStr) return '--/--/----';
  
  // Se a data vier com o T (ISO String), pegamos só a parte da data
  const dateOnly = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  const parts = dateOnly.split('-');
  
  if (parts.length !== 3) return dateStr;
  
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};