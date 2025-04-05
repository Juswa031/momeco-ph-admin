<script>
import axios from 'axios';
import TablePaginationComponent from '@/components/TablePaginationComponent.vue';

export default {
    components: {
        TablePaginationComponent
    },
    data() {
        return {
          table_headers: [
                {
                    label: 'Name'
                },
                {
                    label: 'Categories'
                },
                {
                  label: 'Quantity'
                },
                {
                    label: 'Status'
                },
                {
                  label: 'Active?'
                },
                {
                    label: 'Actions'
                },
            ],
            products: [],
            meta: {},
            filter: {
                order_by: 'asc',
                sort_by: 'name',
                per_page: 12,
                data: null
            },
            product_id: null,
        }
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
      async fetchProducts(url = null) {
          axios.get(url ? url : `/v1/products`, {
              params: this.filter,
          }).then((response) => {
              this.products = response.data.data;
              this.meta = response.data.meta;
          });
      },
      refreshTable({
            url = undefined, 
            per_page = 10
        }){
            this.filter.per_page = per_page;
            this.fetchProducts(url);
      },
      searchProducts() {
        if(this.filter.data.length > 0) {
          this.fetchProducts();
        } else {
          this.filter = {
                data: null,
                order_by: 'asc',
                sort_by: 'name',
            }
          this.fetchProducts();
        }
      },
      deleteProduct() {
        this.$store.dispatch('REMOVE_PRODUCT', this.product_id).then((response) => {
            if(response) {
                this.fetchProducts();
                this.$refs.closeConfirmationModal.click();
            }
        });
      }
    }
} 
</script>
<template>
  <div class="col-12 text-md-end mb-2 d-flex align-items-center flex-wrap gap-3">
    <div class="col-auto order-2 order-md-1">
      <div class="input-group">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
          <input type="text" class="form-control p-2 px-3" id="floatingInputGroup1" placeholder="Search" @keydown.enter="searchProducts()" v-model="filter.data">
      </div>
    </div>
    <div class="col-12 col-md order-md-2 order-md-1">
      <button type="button" class="btn btn-2" @click="$router.push({name: 'product-details'})">
        <i class="bi bi-plus"></i>
          New Product
      </button>
    </div>
  </div>
  <div class="table-responsive table-lg">
    <table class="table align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr class="table-header">
          <th v-for="header in table_headers" :key="header">{{ header.label }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="products.length > 0">            
          <tr v-for="product in products" :key="product">
            <td>
              <div class="d-flex align-items-center">
                <img
                  :src="product.img_url"
                  :alt="product.name"
                  style="width: 45px; height: 45px"
                  class="rounded-circle"
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ product.name }}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">{{ product.category_name }}</p>
            </td>
            <td>
              <p class="fw-normal mb-1">{{ product.quantity }}</p>
            </td>
            <td>
              <span class="badge rounded-pill text-bg-success" v-if="product.quantity >= 10">In Stock</span>
              <span class="badge rounded-pill text-bg-warning text-light" v-else-if="product.quantity < 10 && product.quantity > 0">Running Low</span>
              <span class="badge rounded-pill text-bg-danger" v-else-if="product.quantity == 0">Out of Stock</span>
            </td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input cursor-pointer" type="checkbox" role="switch" id="flexSwitchCheckChecked" :checked="product.is_active" :true-value="1" :false-value="0" disabled/>
              </div>
            </td>
            <td>
              <div class="d-flex gap-3">
                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="$router.push({name: 'product-details', params: {id: product.id}})">
                  <i class="isax isax-edit"></i>
                  <span>Edit</span>
                </div>
                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="product_id = product.id" data-bs-toggle="modal" data-bs-target="#confirmationProduct">
                  <i class="isax isax-trash"></i>
                  <span>Remove</span>
                </div>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
            <tr><td colspan="9" class="p-3 text-center">There are no items to be displayed</td></tr>
        </template>
      </tbody>
    </table>
  </div>
  <TablePaginationComponent :meta="meta" @refreshTable="refreshTable"></TablePaginationComponent>

  <!-- Confirmation Modal -->
  <div class="modal fade" id="confirmationProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="confirmationProductLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmationProductLabel">Confirmation</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center align-items-center flex-wrap gap-3">
            <div class="col-12 text-center">
              <img src="../../../assets/images/confirmation.png" alt="confirmation" width="200"/>
            </div>
            <div class="col-12 text-center">
              <p>Are you sure you want to delete this category?</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-2" @click="deleteProduct()">Yes</button>
          <button type="button" class="btn btn-1" data-bs-dismiss="modal" ref="closeConfirmationModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>