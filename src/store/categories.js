import axios from 'axios';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

const endpoint = "https://momecoph-api.shop/api/admin/v1"

const state = {
    categories: null,
    paginated_categories: null,
};

const getters = {
    getCategories: state => state.categories,
    getPaginatedCategories: state => state.paginated_categories,
};

const actions = {
    async GET_CATEGORIES({ commit, rootGetters }) {        
        try {
            const response = await axios.get(`${endpoint}/categories`, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            await commit('UPDATE_CATEGORIES', response.data);
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
    async GET_PAGINATED_CATEGORIES({ commit, rootGetters }) {
        try {
            const response = await axios.get(`${endpoint}/categories/paginate`, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            await commit('UPDATE_PAGINATED_CATEGORIES', response.data);
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
    async ADD_CATEGORIES({ commit, rootGetters }, payload) {
        try {
            await axios.post(`${endpoint}/categories`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Category added successfully")
            return true
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
            return false
        }
    },
    async UPDATE_CATEGORIES({ commit, rootGetters }, payload) {
        try {
            await axios.put(`${endpoint}/categories/${payload.id}`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Category added successfully")
            return true
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
            return false
        }
    },
    async DELETE_CATEGORY({ commit, rootGetters }, category_id) {
        try {
            await axios.delete(`${endpoint}/categories/${category_id}`, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Category deleted successfully")
            return true
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
    async SHOW_CATEGORY({ commit, rootGetters }, category_id) {
        try {
            const response = await axios.get(`${endpoint}/categories/${category_id}`, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            return response.data
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
    UPDATE_CATEGORIES(state, response) {
        state.categories = response
    },
    UPDATE_PAGINATED_CATEGORIES(state, response) {
        state.paginated_categories = response
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};