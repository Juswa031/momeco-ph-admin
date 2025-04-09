<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import TablePaginationComponent from '@/components/TablePaginationComponent.vue';
import UploadFileComponent from '@/components/UploadFileComponent.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import ModalComponent from '@/components/ModalComponent.vue';

export default {
    components: {
        TablePaginationComponent,
        UploadFileComponent,
        ConfirmationModal,
        ModalComponent
    },
    data() {
        return {
          table_headers: [
                {
                    label: 'Name'
                },
                {
                  label: 'Active?'
                },
                {
                    label: 'Actions'
                },
            ],
            categories: [],
            payload: {
                category: null,
                is_active: 0,
                image_url: null
            },
            filter: {
                data: null,
                order_by: 'asc',
                sort_by: 'category',
            },
            meta: {},
            category_id: null,
            renderComponent: true
        }
    },
    computed: {
        ...mapGetters({
          getPaginatedCategories: 'getPaginatedCategories',
          token: 'getToken'
        }),  
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories(url) {
        axios.get(url ? url : `v1/categories/paginate`, {
            params: this.filter,
            headers: {
                Authorization: 'Bearer ' + this.token,
            }
        }).then((response) => {
            this.categories = response.data.data;
            this.meta = response.data.meta;
        });
      },
      async addCategories() {
        let endpoint = this.category_id ? 'UPDATE_CATEGORIES' : 'ADD_CATEGORIES';
        await this.$store.dispatch(endpoint, this.payload).then((response) => {
            if(response) {
              this.fetchCategories();
              this.$refs.closeModal.click();
              this.initializePayload();
            }
        });
      },
      refreshTable({
            url = undefined, 
            per_page = 10
        }){
            this.filter.per_page = per_page;
            this.fetchCategories(url);
      },
      searchCategories() {
        if(this.filter.data.length > 0) {
          this.fetchCategories();
        } else {
          this.filter = {
                data: null,
                order_by: 'asc',
                sort_by: 'category',
            }
          this.fetchCategories();
        }
      },
      deleteCategory() {
        this.$store.dispatch('DELETE_CATEGORY', this.category_id).then((response) => {
            if(response) {
                this.fetchCategories();
                this.$refs.closeConfirmationModal.click();
            }
        });
      },
      showCategory(id) {
        this.$store.dispatch('SHOW_CATEGORY', id).then((response) => {
            if(response) {
                this.category_id = response.data.id;
                this.payload = {
                  id: response.data.id,
                  category: response.data.category,
                  is_active: response.data.is_active,
                  image_url: response.data.image_url
                }
            }
        });
      },
      getUploadedfile(url) {
        this.payload.image_url = url;
      },
      forceRender() {
        this.renderComponent = false;
        this.$nextTick(() => {
            this.renderComponent = true;
        });
      },
      initializePayload() {
        this.payload = {
          category: null,
          is_active: 0,
          image_url: null
        }
      },
      removeData(is_deleted) {
          if(is_deleted) {
              this.deleteCategory();
          }
      }
    },
}
</script>
<template>
  <div class="col-12 text-md-end mb-2 d-flex align-items-center flex-wrap gap-3">
    <div class="col-auto order-2 order-md-1">
      <div class="input-group">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
          <input type="text" class="form-control p-2 px-3" id="floatingInputGroup1" placeholder="Search" @keydown.enter="searchCategories()" v-model="filter.data">
      </div>
    </div>
    <div class="col-12 col-md order-md-2 order-md-1">
      <button type="button" class="btn btn-2" data-bs-toggle="modal" data-bs-target="#newCategory" @click="initializePayload(), forceRender()">
        <i class="bi bi-plus"></i>
          New Category
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
        <template v-if="categories.length > 0">
          <tr v-for="category in categories" :key="category">
            <td>
              <div class="d-flex align-items-center">
                <img
                  :src="category.image_url"
                  alt=""
                  style="width: 45px; height: 45px"
                  class="rounded-circle"
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">{{ category.category }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" :checked="category.is_active" :true-value="1" :false-value="0" disabled>
              </div>
            </td>
            <td>
              <div class="d-flex gap-3">
                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="showCategory(category.id)" data-bs-toggle="modal" data-bs-target="#newCategory">
                  <i class="isax isax-edit"></i>
                  <span>Edit</span>
                </div>
                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" data-bs-toggle="modal" data-bs-target="#confirmationCategory" @click="removeData(), category_id = category.id">
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

  <ModalComponent :target="'newCategory'">
    <template #header>
      <h1 class="modal-title fs-5" id="newCategoryLabel">Add Category</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="forceRender()"></button>
    </template>
    <template #body>
        <div class="d-flex justify-content-center align-items-center flex-wrap gap-3">
          <div class="col-12">
            <UploadFileComponent @imageUploaded="getUploadedfile" :imageUrl="payload.image_url" v-if="renderComponent"/>
          </div>
          <div class="col">
            <div class="form-floating">
              <input type="text" class="form-control" id="categoryName" placeholder="Name" v-model="payload.category">
              <label for="categoryName">Name</label>
            </div>
          </div>
          <div class="col-12 col-md-auto">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="payload.is_active" :true-value="1" :false-value="0">
              <label class="form-check-label" for="flexSwitchCheckChecked">Is Active?</label>
            </div>
          </div>
        </div>
    </template>
    <template #footer>
        <button type="button" class="btn btn-2" @click="addCategories()">Save</button>
        <button type="button" class="btn btn-1" data-bs-dismiss="modal" ref="closeModal">Cancel</button>
    </template>
  </ModalComponent>

</template>

