export const formatBrazilianDate = (date: string) =>
  date.split('-').reverse().join('/');

export const getFirstName = (name: string) => name.split(' ')[0] ?? name;

export const getUserInitial = (name: string) => name.charAt(0).toUpperCase();
