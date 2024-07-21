import { create } from "zustand";

const useAdminStore = create((set) => ({
  isAuthenticated: false,

  login: () => {
    set({ isAuthenticated: true });
  },

  logout: () => {
    set({ isAuthenticated: false });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Remove the persisted state from local storage
  },
  initialize: () => {
    const tokenExpiry = getCookieExpiry();
    if (tokenExpiry && Date.now() < tokenExpiry) {
      set({ isAuthenticated: true });
    }
  },

  checkTokenExpiry: () => {
    const tokenExpiry = getCookieExpiry();
    if (tokenExpiry && Date.now() >= tokenExpiry) {
      set({ isAuthenticated: false });
      return true;
    }
    return false;
  },
}));

function getCookieExpiry() {
  const cookieString = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  if (cookieString) {
    const token = cookieString.split("=")[1];
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.exp * 1000;
    } catch (e) {
      return null;
    }
  }
  return null;
}

export default useAdminStore;
