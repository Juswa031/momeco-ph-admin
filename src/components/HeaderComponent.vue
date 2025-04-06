<script>
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

export default {
    methods: {
        logout() {
            this.$store.dispatch('logout').then(response => {
                if(response) {
                    toast.success('Logout Successfully!');
                    setTimeout(() => {
                        this.$router.push({name : 'login'})
                    }, 1000)
                }
            });
        }
    },
}
</script>
<template>
    <div class="header-content text-end rounded-2">
        <img src="../assets/images/icon.webp" alt="profile" width="35" class="cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false">
        <!-- <i class="bi bi-box-arrow-right cursor-pointer fs-5" title="Profile"></i> -->
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="logout()">Logout</a></li>
        </ul>
    </div>
    <hr class="p-0 m-0">
</template>