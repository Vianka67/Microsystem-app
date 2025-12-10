import { productsApi } from './api';

export const productsAPI = {
    getProducts: async () => {
        try {
            const response = await productsApi.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    createProduct: async (productData) => {
        try {
            const response = await productsApi.post('/', productData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Error al crear producto' };
        }
    },

    updateProduct: async (id, productData) => {
        try {
            const response = await productsApi.patch(`/${id}`, productData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Error al actualizar producto' };
        }
    },

    deleteProduct: async (id) => {
        try {
            await productsApi.delete(`/${id}`);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Error al eliminar producto' };
        }
    }
};
