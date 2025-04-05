<script>
import RichTextComponent from '@/components/RichTextComponent.vue';
import UploadFileComponent from '@/components/UploadFileComponent.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        RichTextComponent,
        UploadFileComponent
    },
    data() {
        return {
            payload: {
                id: null,
                category_id: null,
                name: null,
                quantity: null,
                description: null,
                price: null,
                is_active: 0,
                img_url: null,
                discount: null,
            },
            categories: [],
        }
    },
    computed: {
        ...mapGetters({
            getCategories: 'getCategories'
        })  
    },
    mounted() {
        this.fetchCategories();
        if(this.$route.params.id) {
            this.showProductDetails();
        }
    },
    methods: {
        computeDiscount(price, discount) {
            return price - (price * discount / 100);
        },
        getUploadedfile(url) {
            this.payload.img_url = url;
        },
        async fetchCategories() {
            await this.$store.dispatch('GET_CATEGORIES');
            this.categories = this.getCategories.data;
        },
        async saveProduct() {
            let endpont = this.$route.params.id ? `UPDATE_PRODUCT` : 'ADD_PRODUCT';
            await this.$store.dispatch(endpont, this.payload).then((response) => {
                if(response) {
                    setTimeout(() => {
                        this.$router.push({name: 'product-list'});
                    }, 1200);
                }
            });
        },
        async showProductDetails() {
            await this.$store.dispatch('SHOW_PRODUCT', this.$route.params.id).then(response => {
                this.payload = response.data;
            });
        },
    }
}
</script>

<template>
    <h1 class="g-heading-1 mb-0 mb-4">Product Details</h1>
    <h3 class="r-paragraph cursor-pointer primary-text" @click="$router.push({name: 'product-list'})">
        <i class="bi bi-arrow-left-circle"></i>
        Back
    </h3>
    <div class="d-flex justify-content-start align-items-center flex-wrap gap-3 mt-4">
        <div class="col-12 col-md-6">
            <UploadFileComponent @imageUploaded="getUploadedfile" :imageUrl="payload.img_url"/>
        </div>
    </div>
    <div class="d-flex justify-content-start align-items-center flex-wrap gap-3 mt-4">
        <div class="col">
            <div class="form-floating">
                <select class="form-select" id="categories" aria-label="Floating label select example" v-model="payload.category_id">
                    <option selected disabled :value="null">-- Select Category --</option>
                    <option :value="category.id" v-for="category in categories" :key="category">{{ category.category }}</option>
                </select>
                <label for="categories">Categories</label>
            </div>
        </div>
        <div class="col">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="payload.is_active" :true-value="1" :false-value="0">
                <label class="form-check-label" for="flexSwitchCheckChecked">Is Active?</label>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-4">
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="productName" placeholder="Name" v-model="payload.name">
                <label for="productName">Name</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <input type="number" class="form-control" id="productStock" placeholder="Stock" v-model="payload.quantity">
                <label for="productStock">Stock</label>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-4">
        <div class="col">
            <div class="form-floating">
                <input type="number" class="form-control" id="productPrice" placeholder="Price" v-model="payload.price">
                <label for="productPrice">Price</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <input type="number" class="form-control" id="productDiscount" placeholder="Discount" v-model="payload.discount">
                <label for="productDiscount">Discount</label>
            </div>
        </div>
    </div>
    <RichTextComponent :isEdit="true" :richtextClass="'shadow-sm'" class="my-4" v-model="payload.description"/>
    <h2 class="g-heading-2 mb-0 mb-3">Preview</h2>
    <div class="d-block w-100 border rounded-2 p-4 mb-4 text-center">
        <div class="d-flex justify-content-center align-items-center">
            <div class="product-card">
                <img :src="payload.img_url || 'https://placehold.co/600x400'" alt="Product Image" class="product-image">
            </div>
        </div>
        <div class="r-paragraph product-title text-gray">{{ payload.name || 'Product Name' }}</div>
        <div class="product-price mt-1 r-paragraph">PHP {{ computeDiscount(payload.price, payload.discount) }}.00</div>
        <div class="d-flex justify-content-center align-items-center gap-2" v-if="payload.discount > 0">
            <h4 class="r-paragraph fw-normal primary-black text-decoration-line-through">PHP {{ payload.price || 0 }}</h4>
            <h4 class="r-paragraph fw-normal primary-black">-{{ payload.discount || 0}} %</h4>
        </div>
    </div>

    <div class="d-flex align-items-center gap-3 w-100 justify-content-end">
        <button type="submit" class="btn btn-2" @click="saveProduct()">Save</button>
        <div class="primary-text cursor-pointer" @click="$router.push({name: 'product-list'})">Cancel</div>
    </div>
</template>