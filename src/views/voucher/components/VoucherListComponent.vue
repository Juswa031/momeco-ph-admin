<script>
import axios from 'axios';
import TablePaginationComponent from '@/components/TablePaginationComponent.vue';
import { mapGetters } from 'vuex';
import ModalComponent from '@/components/ModalComponent.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

export default {
    components: {
        TablePaginationComponent,
        ModalComponent,
        ConfirmationModal
    },
    data() {
        return {
            vouchers: [],
            table_headers: [
                {
                    label: 'Voucher'
                },
                {
                    label: 'Type'
                },
                {
                    label: 'Status'
                },
                {
                    label: 'Action'
                }
            ],
            filter: {
                data: null,
                sort_by: 'created_at',
                order_by: 'asc'
            },
            meta: {},
            payload: {
                id: null,
                voucher: null,
                discount: 0,
                voucher_type: null,
                is_active: 0
            },
            voucher_types: [
                {
                    label: 'Free Shipping',
                    value: 'free_shipping'
                },
                {
                    label: 'Discounted',
                    value: 'discounted'
                }
            ]
        }
    },
    computed: {
      ...mapGetters({
          token: 'getToken'
      })
    },
    mounted() {
        this.fetchVouchers();
    },
    methods: {
        async fetchVouchers(url = null) {
          axios.get(url ? url : `/v1/voucher`, {
              params: this.filter,
              headers: {
                  Authorization: 'Bearer ' + this.token,
              }
          }).then((response) => {
              this.vouchers = response.data.data;
              this.meta = response.data.meta;
          });
        },
        refreshTable({
                url = undefined, 
                per_page = 10
            }){
                this.filter.per_page = per_page;
                this.fetchVouchers(url);
        },
        searchProducts() {
            if(this.filter.data.length > 0) {
            this.fetchVouchers();
            } else {
            this.filter = {
                    data: null,
                    order_by: 'asc',
                    sort_by: 'created_at',
                }
            this.fetchVouchers();
            }
        },
        openModal(id) {
            const modalElement = document.getElementById(id);
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement, {
                    backdrop: 'static',
                    keyboard: false
                });
                modal.show();
            }
        },
        removeData(is_deleted) {
            if(is_deleted) {
                this.removeVoucher(this.payload.id);
            }
        },
        convertString(str) {
            return str
                .replace(/_/g, ' ')  // Replace underscores with spaces
                .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
        },
        async updateOrCreateVoucher(event) {
            event.target.disabled = true
            let endpoint = this.payload.id ? 'UPDATE_VOUCHER' : 'ADD_VOUCHER';
            this.payload.discount = this.payload.voucher_type == 'free_shipping' ? 0 : this.payload.discount
            await this.$store.dispatch(endpoint, this.payload).then(response => {
                if(response) {
                    this.$refs.closeVoucherModal.click();
                    this.fetchVouchers();
                }
                setTimeout(() => {
                    event.target.disabled = false
                }, 1000);
            })
        },
        async showVoucher(voucher_id) {
            await this.$store.dispatch('SHOW_VOUCHER', voucher_id).then(response => {
                if(response) {
                    this.payload = response.data
                }
            })
        },
        async removeVoucher(id) {
            await this.$store.dispatch('DELETE_VOUCHER', id).then(response => {
                if(response) {
                    this.fetchVouchers();
                }
            }) 
        }, 
        initializePayload() {
            this.payload = {
                voucher: null,
                discount: 0,
                voucher_type: null,
                is_active: 0
            }
        },
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
                <input type="text" class="form-control p-2 px-3" id="floatingInputGroup1" placeholder="Search" @keydown.enter="searchvouchers()" v-model="filter.data">
            </div>
        </div>
        <div class="col-12 col-md order-md-2 order-md-1">
            <button type="button" class="btn btn-2" @click="openModal('voucherDetails')">
                <i class="bi bi-plus"></i>
                New voucher
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
                <template v-if="vouchers.length > 0">
                    <tr v-for="voucher in vouchers" :key="voucher">
                        <td>
                            <p class="fw-bold mb-1">{{ voucher.voucher }}</p>
                        </td>
                        <td>
                            <p class="g-paragrap mb-1">{{ convertString(voucher.voucher_type) }}</p>
                        </td>   
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" disabled :checked="voucher.is_active" :true-value="1" :false-value="0" >
                            </div>
                        </td>
                        <td>
                            <div class="d-flex gap-3">
                                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="showVoucher(voucher.id), openModal('voucherDetails'), payload.id = voucher.id">
                                    <i class="isax isax-edit"></i>
                                    <span>Edit</span>
                                </div>
                                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="openModal('confirmationVoucher'), payload.id = voucher.id">
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

    <ConfirmationModal :target="'confirmationVoucher'" @isDeleted="removeData"/>

    <ModalComponent :target="'voucherDetails'">
        <template #header>
            <h1 class="modal-title fs-5" id="voucherDetailsLabel">Voucher Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="initializePayload()"></button>
        </template>
        <template #body>
            <div class="d-flex justify-content-start align-items-center flex-wrap gap-3">
                <div class="col">
                    <div class="form-floating">
                        <select class="form-select" id="categories" aria-label="Floating label select example" v-model="payload.voucher_type">
                            <option selected disabled :value="null">-- Select Voucher Type --</option>
                            <option :value="voucher_type.value" v-for="voucher_type in voucher_types" :key="voucher_type">{{ voucher_type.label }}</option>
                        </select>
                        <label for="categories">Categories</label>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="form-check form-switch">
                        <input class="form-check-input cursor-pointer" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="payload.is_active" :true-value="1" :false-value="0">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Is Active?</label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="VoucherName" placeholder="Voucher" v-model="payload.voucher">
                        <label for="VoucherName">Voucher</label>
                    </div>
                </div>
                <div class="col-12" v-if="payload.voucher_type == 'discounted'">
                    <div class="form-floating">
                        <input type="number" class="form-control" id="voucherDiscount" placeholder="Discount" v-model="payload.discount">
                        <label for="voucherDiscount">Discount</label>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <button type="button" class="btn btn-2" @click="updateOrCreateVoucher($event)">Save</button>
            <button type="button" class="btn btn-1" data-bs-dismiss="modal" ref="closeVoucherModal" @click="initializePayload()">Cancel</button>
        </template>
    </ModalComponent>
</template>