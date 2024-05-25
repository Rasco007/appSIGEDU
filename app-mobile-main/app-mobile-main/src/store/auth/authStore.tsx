import { create } from 'zustand';

interface AuthState {
  isLogin: boolean;
  user: string;
  signIn: (user: string) => void;
  logOut: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: '',
  signIn: (user) => set((state) => ({ ...state, isLogin: true, user })),
  logOut: () => set((state) => ({ ...state, isLogin: false, user: '' })),
}));

export default useAuthStore;

export const handleLogoutApp = () => {
  useAuthStore.getState().logOut();
};
