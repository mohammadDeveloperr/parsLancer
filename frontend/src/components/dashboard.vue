<template>
  <div class="dashboard">
    <!-- Sidebar component -->
    <sidebar :sidebar-items="sidebarItems"></sidebar>

    <!-- Main content -->
    <div class="main-content">
      <!-- Your main content here -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Sidebar from './sideBar.vue';

export default {
  name: 'Dashboard',
  components: {
    Sidebar
  },
  data() {
    return {
      sidebarItems: [
        {
          name: 'Dashboard',
          icon: 'ni ni-shop text-primary',
          path: '/dashboard'
        },
        {
          name: 'پروژه های من',
          icon: 'ni ni-planet text-orange',
          path: '/employer-project'
        },
        // Add more sidebar items as needed
      ]
    };
  }
};
</script>

<style scoped>

.dashboard {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
