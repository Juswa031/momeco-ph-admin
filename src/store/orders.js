import axios from 'axios';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

const endpoint = "https://momecoph-api.shop/api/admin/v1"

const state = {
    // 
};

const getters = {
    // 
};

const actions = {
    async UPDATE_PAYMENT_STATUS({ commit, rootGetters }, payload) {
        try {
            const response = await axios.patch(`${endpoint}/checkout/${payload.id}/status`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            toast.success("Order updated successfully")
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