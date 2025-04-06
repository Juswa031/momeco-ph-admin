<script>
import { mapGetters } from 'vuex';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            payload: {
                email: '',
                password: '',
            },
        }
    },
    computed:{
        ...mapGetters({
            authProfile: 'getAuthProfile'
        })
    },
    methods: {
        async login() {
            await this.$store.dispatch('login', this.payload);
            if (this.authProfile) {
                this.$router.push({ name: 'home' });
            }
        },
    },
}
</script>
<template>
    <div class="d-flex justify-content-between flex-wrap vh-100">
        <div class="col-12 col-lg-5 p-4">
            <div class="d-flex justify-content-between flex-wrap h-100">
                <div class="col-12 text-center">
                    <img src="https://momecoph-api.shop/public/uploads/1743489637_487583062_1343147706809515_3936341983585651192_n-removebg-preview.png" alt="image" width="150">
                </div>
                <div class="col-12">
                    <div class="d-flex justify-content-center align-items-center flex-wrap">
                        <div class="col-12">
                            <div class="form-floating mb-4">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="payload.email">
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating mb-4">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="payload.password">
                                <label for="floatingPassword">Password</label>
                            </div>
                            <button class="btn btn-2 w-100" @click="login()">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col d-none d-lg-block">
            <img src="https://placehold.co/300x300" alt="image" class="img object-fit-cover w-100 vh-100">
        </div>
    </div>
</template>