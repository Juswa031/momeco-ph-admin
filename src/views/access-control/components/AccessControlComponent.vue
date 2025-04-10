<script>
import TablePaginationComponent from '@/components/TablePaginationComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    components: {
        TablePaginationComponent,
        ModalComponent
    },
    data() {
        return {
            access_controls: [],
            filter: {
                order_by: 'asc',
                sort_by: 'created_at',
                data: null
            },
            table_headers: [
                {
                    label: 'Name'
                },
                {
                    label: 'Email'
                },
                {
                    label: 'Action'
                }
            ],
            meta: {},
            payload: {
                id: null,
                name: null,
                email: null,
                password: 'P@ssw0rd'
            }
        }
    },
    computed: {
        ...mapGetters({
            token: 'getToken'
        })
    },
    mounted() {
        this.fetchAccessControl();
    },
    methods: {
        async fetchAccessControl(url) {
            await axios.get(url ? url : `/v1/access-control/paginate`, {
                params: this.filter,
                headers: {
                    Authorization: 'Bearer ' + this.token,
                }
            }).then((response) => {
                this.access_controls = response.data.data;
                this.meta = response.data.meta;
            });
        },
        refreshTable({
                url = undefined, 
                per_page = 10
            }){
                this.filter.per_page = per_page;
                this.fetchAccessControl(url);
        },
        searchUser() {
            if(this.filter.data.length > 0) {
            this.fetchAccessControl();
            } else {
            this.filter = {
                    data: null,
                    order_by: 'asc',
                    sort_by: 'created_at',
                }
            this.fetchAccessControl();
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
        async updateOrCreateUser(type) {
            await this.$store.dispatch('register', this.payload).then(response => {
                if(response) {
                    this.$refs.closeUserModal.click();
                    this.fetchAccessControl();
                }
            })
        },
        async showUserDetails() {
            await this.$store.dispatch('showProfile', this.payload).then(response => {
                if(response) {
                    this.payload = response.data
                }
            });
        },
        initializePayload() {
            this.payload = {
                id: null,
                name: null,
                email: null,
                password: 'P@ssw0rd'
            }   
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
                <input type="text" class="form-control p-2 px-3" id="floatingInputGroup1" placeholder="Search" @keydown.enter="searchUser()" v-model="filter.data">
            </div>
        </div>
        <div class="col-12 col-md order-md-2 order-md-1">
            <button type="button" class="btn btn-2" @click="openModal('userDetails')">
                <i class="bi bi-plus"></i>
                New User
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
                <template v-if="access_controls.length > 0">
                    <tr v-for="access_control in access_controls" :key="access_control">
                        <td>
                            <p class="fw-bold mb-1">{{ access_control.name }}</p>
                        </td>
                        <td>
                            <p class="g-paragrap mb-1">{{ access_control.email }}</p>
                        </td>   
                        <td>
                            <div class="d-flex gap-3">
                                <!-- <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="payload.id = access_control.id, showUserDetails(), openModal('userDetails')">
                                    <i class="isax isax-edit"></i>
                                    <span>Edit</span>
                                </div> -->
                                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="openModal('confirmationUser'), payload.id = access_control.id">
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

    <ModalComponent :target="'userDetails'">
        <template #header>
            <h1 class="modal-title fs-5" id="voucherDetailsLabel">Account Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </template>
        <template #body>
            <div class="d-flex justify-content-start align-items-center flex-wrap gap-3">
                <div class="col-12">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="userName" placeholder="Voucher" v-model="payload.name">
                        <label for="userName">Name</label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-floating">
                        <input type="email" class="form-control" id="userEmail" placeholder="Voucher" v-model="payload.email">
                        <label for="userEmail">Email</label>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <button type="button" class="btn btn-2" @click="updateOrCreateUser()">Save</button>
            <button type="button" class="btn btn-1" data-bs-dismiss="modal" ref="closeUserModal">Cancel</button>
        </template>
    </ModalComponent>
</template>