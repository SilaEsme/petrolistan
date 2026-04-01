export const colors = {
  primary: {
    main: '#FFC107', // Petrolistan Sarısı (Örnek)
    dark: '#FFB300',
    light: '#FFECB3',
    contrastText: '#000000',
  },
  secondary: {
    main: '#263238', // Petrol Siyahı/Grisi
    dark: '#102027',
    light: '#4f5b62',
    contrastText: '#FFFFFF',
  },
  status: {
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#FBC02D',
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
  }
} as const; // 'as const' ile değerleri salt okunur (readonly) yapıyoruz