import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const initialState = {
  isAuthenticated: false,
  user: null,
  userAuthToken: '',
};

const authStore = (set, get) => ({
  ...initialState,

  setLogin: ({ data, token }) => {
    set((state) => ({
      ...state,
      isAuthenticated: true,
      user: data,
      userAuthToken: token,
    }));
  },

  setAutoLogin: ({ data }) => {
    set((state) => ({
      ...state,
      isAuthenticated: true,
      user: data,
    }));
  },

  setLogout: () => {
    set(() => ({ ...initialState }));
  },
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: 'userAuthinfo',
      partialize: (state) => ({
        userAuthToken: state.userAuthToken,
        role: state.user?.role || null,
      }),
    })
  )
);

const useAuth = () => {
  const {
    user,
    userAuthToken,
    isAuthenticated,
    setLogin,
    setLogout,
    setAutoLogin,
    loading,
    setLoading,
  } = useAuthStore();
  return {
    user,
    userAuthToken,
    isAuthenticated,
    setLogin,
    setLogout,
    setAutoLogin,
    loading,
    setLoading,
  };
};

export default useAuth;
