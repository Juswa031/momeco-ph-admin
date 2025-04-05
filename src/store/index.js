import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import categories from '../store/categories';
import products from '../store/products';
import uploads from '../store/uploads';

export default new Vuex.Store({
    modules: {
        categories,
        products,
        uploads
    },
    plugins: [createPersistedState()]
});
