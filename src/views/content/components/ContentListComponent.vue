<script>
import axios from 'axios';
import TablePaginationComponent from '@/components/TablePaginationComponent.vue';
import { mapGetters } from 'vuex';
import ModalComponent from '@/components/ModalComponent.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import UploadFileComponent from '@/components/UploadFileComponent.vue';

export default {
    components: {
        TablePaginationComponent,
        ModalComponent,
        ConfirmationModal,
        UploadFileComponent
    },
    data() {
        return {
            contents: [],
            table_headers: [
                {
                    label: 'Image'
                },
                {
                    label: 'Is Active?'
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
                image_url: null,
                is_active: 0
            },
            renderComponent: true
        }
    },
    computed: {
      ...mapGetters({
          token: 'getToken'
      })
    },
    mounted() {
        this.fetchContents();
    },
    methods: {
        async fetchContents(url = null) {
          axios.get(url ? url : `/v1/announcement`, {
              params: this.filter,
              headers: {
                  Authorization: 'Bearer ' + this.token,
              }
          }).then((response) => {
              this.contents = response.data.data;
              this.meta = response.data.meta;
          });
        },
        refreshTable({
                url = undefined, 
                per_page = 10
            }){
                this.filter.per_page = per_page;
                this.fetchContents(url);
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
                this.removeContent(this.payload.id);
            }
        },
        async updateOrCreateContent(event) {
            event.target.disabled = true
            let endpoint = this.payload.id ? 'UPDATE_CONTENT' : 'ADD_CONTENT';
            await this.$store.dispatch(endpoint, this.payload).then(response => {
                if(response) {
                    this.$refs.closeContentModal.click();
                    this.fetchContents();
                }
                setTimeout(() => {
                    event.target.disabled = false
                }, 1000);
            })
        },
        async showContent(voucher_id) {
            await this.$store.dispatch('SHOW_CONTENT', voucher_id).then(response => {
                if(response) {
                    this.payload = response.data
                }
            })
        },
        async removeContent(id) {
            await this.$store.dispatch('DELETE_CONTENT', id).then(response => {
                if(response) {
                    this.fetchContents();
                }
            }) 
        }, 
        initializePayload() {
            this.payload = {
                id: null,
                image_url: null,
                is_active: 0
            }
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
    },
}
</script>

<template>
    <div class="col-12 text-md-end mb-2 d-flex align-items-center flex-wrap gap-3">
        <div class="col-12 col-md order-md-2 order-md-1">
            <button type="button" class="btn btn-2" @click="openModal('contentDetails'), initializePayload(), forceRender()">
                <i class="bi bi-plus"></i>
                New Content
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
                <template v-if="contents.length > 0">
                    <tr v-for="content in contents" :key="content">
                        <td>
                            <img
                                :src="content.image_url"
                                :alt="content.name"
                                style="width: 45px; height: 45px"
                                class="rounded-circle"
                            />
                        </td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input cursor-pointer" type="checkbox" role="switch" id="flexSwitchCheckChecked" :checked="content.is_active" :true-value="1" :false-value="0" disabled/>
                            </div>
                        </td>   
                        <td>
                            <div class="d-flex gap-3">
                                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="showContent(content.id), openModal('contentDetails'), payload.id = content.id">
                                    <i class="isax isax-edit"></i>
                                    <span>Edit</span>
                                </div>
                                <div class="d-flex gap-1 primary-hover cursor-pointer text-gray" @click="openModal('confirmationContent'), payload.id = content.id">
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

    <ConfirmationModal :target="'confirmationContent'" @isDeleted="removeData"/>

    <ModalComponent :target="'contentDetails'">
        <template #header>
            <h1 class="modal-title fs-5" id="contentDetailsLabel">Voucher Details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="initializePayload(), forceRender()"></button>
        </template>
        <template #body>
            <div class="d-flex justify-content-start align-items-center flex-wrap gap-3">
                <div class="col-auto">
                    <div class="form-check form-switch">
                        <input class="form-check-input cursor-pointer" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="payload.is_active" :true-value="1" :false-value="0">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Is Active?</label>
                    </div>
                </div>
                <div class="col-12">
                    <UploadFileComponent @imageUploaded="getUploadedfile" :imageUrl="payload.image_url" v-if="renderComponent"/>
                </div>
            </div>
        </template>
        <template #footer>
            <button type="button" class="btn btn-2" @click="updateOrCreateContent($event)">Save</button>
            <button type="button" class="btn btn-1" data-bs-dismiss="modal" ref="closeContentModal" @click="initializePayload()">Cancel</button>
        </template>
    </ModalComponent>
</template>