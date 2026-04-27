export interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  timezone: string;
}

export const MOCK_PROFILE: ProfileSettings = {
  name: 'Admin Fiore',
  email: 'admin@fiore.com',
  phone: '+5491155555555',
  avatar: 'https://placehold.co/150x150?text=AF',
  role: 'Administrador',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  language: 'es',
  timezone: 'America/Argentina/Buenos_Aires',
};