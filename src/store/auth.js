import axios from 'axios';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

const endpoint = "https://momecoph-api.shop/api/admin/v1"

const state = {
    adminAuth: null,
    admin_profile: null,
};

const getters = {
    isAdminAuthenticated: state => !!state.adminAuth,
    getAuthProfile: state => state.admin_profile,
    getToken: state => state.admin_profile?.token,
};

const actions = {

    async login({ commit }, payload) {
        try {
            const response = await axios.post(`${endpoint}/login`, payload);
            await commit('setAdmin', response);
            await commit('updateAuthProfile', response.data);
        } catch (error) {
            if(error.response.data.errors) {
                this.errors = error.response.data.errors;
                var errorlist = "";
                this.errors.forEach(element => {
                    errorlist += element.detail + "\n";
                });
                toast.error(errorlist)
            } else {
                toast.error(error.response.data.message)
            }
        }
    },

    async register({ commit }, payload) {
        try {
            await axios.post(`${endpoint}/register`, payload);
            toast.success('Register Successfully!')
            return true;
        } catch (error) {
                this.errors = error.response.data.errors;
                var errorlist = "";
                this.errors.forEach(element => {
                    errorlist += element.detail + "\n";
                });
                toast.error(errorlist)
        }
    },

    async updateProfile({ commit, rootGetters }, payload) {
        try {
            await axios.patch(`${endpoint}/user`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            // await commit('updateAuthProfile', response.data);
            toast.success('Profile Updated Successfully!')
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },

    async updateAddress({ commit, rootGetters }, payload) {
        try {
            await axios.patch(`${endpoint}/user/address`, payload, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            // await commit('updateAuthProfile', response.data);
            toast.success('Address Updated Successfully!')
            return true;
        } catch (error) {
            this.errors = error.response.data.errors;
            var errorlist = "";
            this.errors.forEach(element => {
                errorlist += element.detail + "\n";
            });
            toast.error(errorlist)
        }
    },

    async logout({commit, rootGetters }){
        
        try {
            await axios.post(endpoint + '/logout', null, {
                headers: {
                    Authorization: 'Bearer ' + rootGetters.getToken,
                }
            });
            return new Promise((resolve) => {
                commit('logout');
                resolve(true);
            });
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
    setAdmin(state, user) {
        state.adminAuth = user;
    },
    updateAuthProfile(state, response) {
        state.admin_profile = response
    },
    logout(state) {
        state.admin_profile = null
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};