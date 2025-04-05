import axios from 'axios';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

const endpoint = "https://momecoph-api.shop/api/v1"

const state = {
    // 
};

const getters = {
    // 
};

const actions = {
    async UPLOAD_IMAGE({ commit }, formData) {
        try {
            const response = await axios.post(`${endpoint}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },
    async DELETE_IMAGE({ commit }, payload) {
        try {
            const response = await axios.delete(`${endpoint}/upload?url=${payload.url}`);
            return response
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
    // 
};

export default {
    state,
    getters,
    actions,
    mutations
};