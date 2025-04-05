
<script>

export default {
    name: "TablePaginationComponent",
    props: {
        meta: {
            type: Object,
            required: true,
            default: () => {
                return { 
                    current_page: 0,
                    from: 0,
                    last_page: 0,
                    links: [],
                    per_page: 12,
                    to: 0,
                    total: 0
                }
            }
        },
        showSelectRow: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            pages: [],
        }
    },
    methods: {
        changePage({ 
            url = null, 
            per_page = 12
        }){
            if(url){
                this.$emit('refreshTable', { 
                    url: url, 
                    per_page: per_page
                });
            }
        },
    }
}
</script>

<template>
    <div v-if="meta" :class="`row g-0 gap-3 ${showSelectRow ? 'justify-content-between':'justify-content-end'}`">
        <div v-if="showSelectRow && meta.total > 0" class="col col-sm col-md col-xl-auto d-flex justify-content-end justify-content-md-center align-items-center text-light-gray">
            {{ meta.to }} of {{ meta.total }} results
        </div>
        <nav v-if="meta.total > 0" :class="`${showSelectRow ? 'd-flex justify-content-between align-items-center':''} col-12 col-sm-12 col-md-auto justify-content-md-center col-xl-auto user-select-none`" class="fs-6 r-paragraph">
            <ul :class="`h-auto pagination align-items-center paginator-text w-100 m-0 ${showSelectRow ? 'justify-content-center ':'justify-content-end'}`">
                <template v-for="item of meta.links" :key="item.label">
                    <template v-if="item.label == 'pagination.previous' || item.label == 'pagination.next'">
                        <li @click="changePage({ url: item.url, per_page: rowPerPage })" :class="`h-auto ${item.url?'cursor-pointer primary-text text-primary-hover':'text-light-gray'} page-item my-auto p-0 m-0`">
                            <div  class="row g-0">
                                <div class="col p-0" v-if="item.label == 'pagination.previous'">
                                    <i class="bi bi-chevron-left"></i>
                                </div>
                                <div class="col p-0 ps-2" v-if="item.label == 'pagination.next'" >
                                    <i class="bi bi-chevron-right"></i>
                                </div>
                            </div>
                        </li>
                    </template>
                    <template v-if="meta.current_page == item.label || meta.current_page-1 == item.label || meta.current_page+1 == item.label || (meta.current_page == 1 && meta.current_page+2 == item.label) || (meta.current_page == meta.last_page && meta.last_page-2 == item.label)">
                        <li @click="this.$emit('refreshTable', { url: item.url, per_page: rowPerPage })" :class="`px-3 py-2 ${meta.current_page == item.label?'primary-text primary-text-hover paginator-border paginator-text-disabled':'text-muted'}`" class="h-100 page-item cursor-pointer">
                            {{item.label}}
                        </li>
                    </template>
                </template>
            </ul>
        </nav>
    </div>
 </template>