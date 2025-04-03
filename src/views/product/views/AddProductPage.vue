<script>
import RichTextComponent from '@/components/RichTextComponent.vue';

export default {
    components: {
        RichTextComponent
    },
    data() {
        return {
            payload: {
                category_id: null,
                name: null,
                quantity: null,
                description: null,
                price: null,
                is_active: null,
                img_url: null,
                discount: null
            }
        }
    },
    methods: {
        computeDiscount(price, discount) {
            return price - (price * discount / 100);
        }
    }
}
</script>

<template>
    <h1 class="g-heading-1 mb-0 mb-4">Add Product</h1>
    <h3 class="r-paragraph cursor-pointer primary-text" @click="$router.push({name: 'product-list'})">
        <i class="bi bi-arrow-left-circle"></i>
        Back
    </h3>
    <div class="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-4">
        <div class="col">
            <input class="form-control form-control-lg" id="formFileLg" type="file" accept="image/*">
        </div>
        <div class="col">
            <div class="form-floating">
                <select class="form-select" id="categories" aria-label="Floating label select example" v-model="payload.category_id">
                    <option selected disabled>-- Select Category --</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <label for="categories">Categories</label>
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
    <RichTextComponent :isEdit="true" :richtextClass="'shadow-sm'" class="my-4"/>
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
        <button type="submit" class="btn btn-2">Save</button>
        <div class="primary-text cursor-pointer">Cancel</div>
    </div>
</template>