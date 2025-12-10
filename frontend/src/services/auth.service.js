import { usersApi } from './api';

export const authAPI = {
    login: async (credentials) => {
        try {
            const response = await usersApi.post('/auth/login/', credentials);
            return response.data;
        } catch (error) {
            return {
                detail: error.response?.data?.detail || 'Error al iniciar sesión'
            };
        }
    }
};
