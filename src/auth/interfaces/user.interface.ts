export interface User {
  id: string;
  email: string;
  role: 'COACH' | 'PLAYER';
  name: string;
}
