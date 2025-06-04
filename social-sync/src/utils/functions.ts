import { MetricsData } from '@/types/dashboard';

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getCardColors = (id: string) => {};

export const calculateGrowthRate = (
  metricsData: MetricsData[],
  key: keyof MetricsData
) => {
  if (metricsData.length < 2) {
    return 0;
  }

  const firstValue = metricsData[0][key];
  const lastValue = metricsData[metricsData.length - 1][key];

  if (typeof firstValue !== 'number' || typeof lastValue !== 'number') {
    throw new Error(`The key "${key}" does not refer to a numerical value.`);
  }

  const growthRate = ((lastValue - firstValue) / firstValue) * 100;

  return Math.floor(growthRate);
};

export const formatStatsCount = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export const getRandomDate = (): Date => {
  const start = new Date(2024, 6, 1);
  const end = new Date(2024, 6, 30);

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const formatTimestamp = (date: Date | string | number): string => {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  const timeString = date.toLocaleTimeString('pt-PT', timeOptions);
  const dateString = date.toLocaleDateString('pt-PT', dateOptions);

  return `${timeString} · ${dateString.replace('.', '')}`;
};

export const formatShortTimestamp = (date: Date | number) => {
  if (typeof date === 'number') {
    date = new Date(date);
  }

  const agora = new Date();
  const diff = agora.getTime() - date.getTime();

  const segundos = Math.floor(diff / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const semanas = Math.floor(dias / 7);
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(dias / 365);

  if (segundos < 60) {
    return 'agora mesmo';
  } else if (minutos < 60) {
    return minutos + 'm';
  } else if (horas < 24) {
    return horas + 'h';
  } else if (dias < 7) {
    return dias + 'd';
  } else if (semanas < 4) {
    return semanas + ' semana' + (semanas > 1 ? 's' : '');
  } else if (meses < 12) {
    return meses + ' mês' + (meses > 1 ? 'es' : '');
  } else {
    return anos + ' ano' + (anos > 1 ? 's' : '');
  }
};

export const generateRandomAttachments = (images: string[]): string[] => {
  if (Math.random() < 0.5) {
    return [];
  } else {
    const numAttachments = Math.floor(Math.random() * 3) + 1;
    const attachments = [];
    for (let i = 0; i < numAttachments; i++) {
      const randomIndex = Math.floor(Math.random() * images.length);
      attachments.push(images[randomIndex]);
    }
    return attachments;
  }
};

export const shrinkString = (str: string, length: number) => {
  if (str.length < length) return str;

  return str.substring(0, length) + '...';
};
