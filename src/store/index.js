import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from '../store/auth';
import categories from '../store/categories';
import products from '../store/products';
import uploads from '../store/uploads';
import orders from "./orders";
import vouchers from "./vouchers";

export default new Vuex.Store({
    modules: {
        auth,
        categories,
        products,
        uploads,
        orders,
        vouchers
    },
    plugins: [createPersistedState()]
});
