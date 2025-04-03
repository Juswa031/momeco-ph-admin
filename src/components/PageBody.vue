<script setup>
import SidebarComponent from '@/components/SidebarComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>
  <div id="page-container" class="home-sidebar">
    <SidebarComponent/>
    <section class="home-section">
      <div class="d-flex flex-column">
        <HeaderComponent/>
        <div class="content mb-5 mt-3">
          <router-view></router-view>
        </div>
      </div>
      <!-- <FooterComponent/> -->
    </section>
  </div>
</template>