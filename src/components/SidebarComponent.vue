<script>
export default {
    data() {
        return {
            isSidebarOpen: false 
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        }
    },
}
</script>

<template>
    <div :class="['sidebar', { 'open': isSidebarOpen, 'close': !isSidebarOpen }]"> 
        <div class="justify-content-between flex-wrap mx-auto brand p-3">
                <div @click="toggleSidebar" class="sidebar-item cursor-pointer fs-4">
                    <i class="bi" :class="[{ 'bi-arrow-left-circle': isSidebarOpen, 'bi-arrow-right-circle': !isSidebarOpen }]"></i>
                </div>
            <div class="col d-none">
                <img src="https://momecoph-api.shop/public/uploads/1743489637_487583062_1343147706809515_3936341983585651192_n-removebg-preview.png" alt="image" width="100">
            </div>
        </div>
        <div class="sidebar-content position-relative">
            <!-- <div class="sidebar-item pt-3 pb-3">
                <div @click="toggleSidebar" class="cursor-pointer">
                    <i class="bi" :class="[{ 'bi-arrow-left-circle': isSidebarOpen, 'bi-arrow-right-circle': !isSidebarOpen }]"></i>
                </div>
            </div> -->
            <div class="sidebar-item" @click="$router.push({name: 'home'})">
                <i class="bi bi-house-door" title="Dashboard"></i>
                <label class="mb-0 d-none">Dashboard</label>
            </div>
            <hr>
            <div class="sidebar-item mb-2" @click="$router.push({name: 'order-list'})">
                <i class="bi bi-cart" title="Orders"></i>
                <label class="mb-0 d-none">Orders</label>
            </div>
            <div class="sidebar-item mb-2">
                <i class="bi bi-truck" title="Tracker"></i>
                <label class="mb-0 d-none">Trackers</label>
            </div>
            <div class="sidebar-item mb-2" @click="$router.push({name: 'product-list'})">
                <i class="bi bi-archive" title="Inventory"></i>
                <label class="mb-0 d-none">Inventory</label>
            </div>
            <div class="sidebar-item mb-2">
                <i class="bi bi-calendar" title="Reports"></i>
                <label class="mb-0 d-none">Reports</label>
            </div>
            <div class="sidebar-item mb-2">
                <i class="bi bi-book" title="Content"></i>
                <label class="mb-0 d-none">Content</label>
            </div>
            <div class="sidebar-item">
                <i class="bi bi-person" title="Access Control"></i>
                <label class="mb-0 d-none">Access Control</label>
            </div>
            <!-- <div class="sidebar-item bottom-0 position-absolute">
                <i class="bi bi-box-arrow-left" title="Logout"></i>
                <label class="mb-0 d-none">Logout</label>
            </div> -->
        </div>
    </div>
</template>
