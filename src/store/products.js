import axios from 'axios';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

const endpoint = "https://momecoph-api.shop/api/consumer/v1"

const state = {
    products: null,
};

const getters = {
    getProducts: state => state.products,
};

const actions = {
    async GET_PRODUCTS({ commit }, filter) {
        try {
            const response = await axios.get(`${endpoint}/products?per_page=${filter.per_page}&order_by=${filter.order_by}&sort_by=${filter.sort_by}`
            );
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
    async SHOW_PRODUCT({ commit }, product_id) {
        try {
            const response = await axios.get(`${endpoint}/products/${product_id}`);
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