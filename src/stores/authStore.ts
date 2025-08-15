"use client";

type User = {
  name?: string;
  email?: string;
  role?: string;
};

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

// Stub très simple pour permettre la compilation sans zustand
let state: AuthStore = {
  isAuthenticated: false,
  user: null,
  login: (user: User) => {
    state = { ...state, isAuthenticated: true, user };
  },
  logout: () => {
    state = { ...state, isAuthenticated: false, user: null };
  },
};

export function useAuthStore(): AuthStore {
  return state;
}
