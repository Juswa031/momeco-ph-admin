import axios from 'axios';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

const endpoint = "https://momecoph-api.shop/api/admin/v1"

const state = {
    products: null,
};

const getters = {
    getProducts: state => state.products,
};

const actions = {
    async GET_PRODUCTS({ commit, rootGetters }, filter) {
        try {
            const response = await axios.get(`${endpoint}/products?per_page=${filter.per_page}&order_by=${filter.order_by}&sort_by=${filter.sort_by}`, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            await commit('UPDATE_PRODUCTS', response.data);
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
    async ADD_PRODUCT({ commit, rootGetters }, payload) {
        try {
            const response = await axios.post(`${endpoint}/products`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Product Added successfully")
            return response.data;
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
    async UPDATE_PRODUCT({ commit, rootGetters }, payload) {
        try {
            const response = await axios.put(`${endpoint}/products/${payload.id}`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Product Updated successfully")
            return response.data;
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
    async REMOVE_PRODUCT({ commit, rootGetters }, product_id) {
        try {
            const response = await axios.delete(`${endpoint}/products/${product_id}`, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Product deleted successfully")
            return response.data;

        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
    async SHOW_PRODUCT({ commit, rootGetters }, product_id) {
        try {
            const response = await axios.get(`${endpoint}/products/${product_id}`, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            return response.data;
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
};

const mutations = {
    UPDATE_PRODUCTS(state, response) {
        state.products = response
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};