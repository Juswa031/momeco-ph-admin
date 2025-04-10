import axios from 'axios';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

const endpoint = "v1/announcement"

const state = {
    // 
};

const getters = {
    // 
};

const actions = {
    async ADD_CONTENT({ rootGetters }, payload) {
        try {
            const response = await axios.post(`${endpoint}`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Content added successfully")
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
    async SHOW_CONTENT({ rootGetters }, content_id) {
        try {
            const response = await axios.get(`${endpoint}/${content_id}`, {
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
    async UPDATE_CONTENT({ rootGetters }, payload) {
        try {
            const response = await axios.patch(`${endpoint}/${payload.id}`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Content updated successfully")
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
    async DELETE_CONTENT({ rootGetters }, content_id) {
        try {
            const response = await axios.delete(`${endpoint}/${content_id}`, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Content deleted successfully")
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
    // 
};

export default {
    state,
    getters,
    actions,
    mutations
};