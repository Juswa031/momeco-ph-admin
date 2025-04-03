<script>
import RichTextComponent from '@/components/RichTextComponent.vue';

export default {
    components: {
        RichTextComponent
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
            <div class="form-floating">
                <select class="form-select" id="categories" aria-label="Floating label select example">
                    <option selected disabled>-- Select Category --</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <label for="categories">Categories</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control" id="productName" placeholder="Name">
                <label for="productName">Name</label>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-4">
        <div class="col">
            <div class="form-floating">
                <input type="number" class="form-control" id="productPrice" placeholder="Price">
                <label for="productPrice">Price</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <input type="number" class="form-control" id="productStock" placeholder="Stock">
                <label for="productStock">Stock</label>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-4">
        <div class="col">
            <div class="form-floating">
                <input type="number" class="form-control" id="productDiscount" placeholder="Discount">
                <label for="productDiscount">Discount</label>
            </div>
        </div>
        <div class="col">
            
        </div>
    </div>
    <RichTextComponent :isEdit="true" :richtextClass="'shadow-sm'" class="mt-4"/>
</template>