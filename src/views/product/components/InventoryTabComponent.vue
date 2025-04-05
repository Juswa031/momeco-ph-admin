<script>
import ProductsComponent from './ProductsComponent.vue';
import CategoriesComponent from './CategoriesComponent.vue';


export default {
    components: {
        ProductsComponent,
        CategoriesComponent
    },
    data() {
        return {
            
        }
    },
}
</script>
<template>
    <ul class="nav nav-tabs tab-bar-borderless border-0 mb-2 mb-3">
        <li class="nav-item p-0 m-0 mb-3">
            <a class="nav-link nav-text cursor-pointer active" data-bs-toggle="tab" data-bs-target="#products" role="tab" aria-selected="true">Products</a>
        </li>
        <li class="nav-item p-0 m-0 mb-3">
            <a class="nav-link nav-text cursor-pointer" data-bs-toggle="tab" data-bs-target="#categories" role="tab" aria-selected="true">Categories</a>
        </li>
    </ul>
    <div class="tab-content h-100">
            <div id="products" class="tab-pane p-0 m-0 active" role="tabpanel">
                <ProductsComponent />
            </div>
            <div id="categories" class="tab-pane p-0 m-0" role="tabpanel">
                <CategoriesComponent />
            </div>
        </div>
</template>