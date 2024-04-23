const BASE_URL = import.meta.env.VITE_APP_BASE_API_URL;

export const API = {
  CONTACT: `${BASE_URL}/contact`,
  CONTACT_DETAIL: (id?: string) => `${BASE_URL}/contact/${id}`,
};
