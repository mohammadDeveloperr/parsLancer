<template>
  <aside class="sidebar ">
    <div class="sidebar-header">
      <h3 class="sidebar-title">Sidebar</h3>
    </div>

    <!-- Sidebar links -->
    <ul class="sidebar-nav">
      <li v-for="(item, index) in sidebarItems" :key="index" class="sidebar-item">
        <router-link :to="item.path" class="sidebar-link">
          <i :class="item.icon"></i>
          <span class="sidebar-text">{{ item.name }}</span>
        </router-link>
      </li>

      <li class="sidebar-item" v-if="this.user.role=='admin'">
        <router-link :to="'/admin/skill'" class="sidebar-link">
          <i ></i>
          <span class="sidebar-text"> مدیریت مهارت ها </span>
        </router-link>
      </li>
      <li class="sidebar-item" v-if="this.user.role=='admin'">
        <router-link :to="'/admin/users'" class="sidebar-link">
          <i ></i>
          <span class="sidebar-text">مدیریت کاربران</span>
        </router-link>
      </li>


    </ul>
  </aside>
</template>

<script>
/* eslint-disable */
import { getSession } from '../utils/sessionUtils'
import Cookies from 'js-cookie';
export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarItems: [
      {
        name: 'پروفایل ',
        icon: 'ni ni-planet text-orange',
        path: '/profile'
      },  
      {
        name: 'پروژه های من',
        icon: 'ni ni-planet text-orange',
        path: '/employer-project'
      },
      {
        name: 'ایجاد پروژه',
        icon: 'ni ni-planet text-orange',
        path: '/create-project'
      },
      {
        name: 'کارهای من',
        icon: 'ni ni-planet text-orange',
        path: '/freelancer-project'
      },
      {
        name: 'پیشنهاد های من',
        icon: 'ni ni-planet text-orange',
        path: '/suggest-project'
      }
      
    ],
    token: Cookies.get('token'),
    }
  },created(){
    this.user = getSession(this.token)
  }
};
</script>

<style scoped>
.sidebar {
  left: 88% !important;
  width: 12%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #a6eeee, #fbc2eb);
  /* Gradient background */
  color: #080808;
  overflow-y: auto;
  /* Allow scrolling if content exceeds height */
  direction: rtl;
  text-align: right
}

.sidebar-header {
  padding: 15px 20px;
  text-align: center;
  border-bottom: 1px solid #3a3f48;
}

.sidebar-title {
  margin-bottom: 0;
  font-size: 1.5rem;
}

.sidebar-nav {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

.sidebar-item {
  margin-bottom: 10px;
}

.sidebar-link {
  display: block;
  padding: 10px 20px;
  color: #030303;
  text-decoration: none;
  transition: background-color 0.3s;
}

.sidebar-link:hover {
  background-color: #4e5c7f;
}

.sidebar-link i {
  margin-right: 10px;
}

.sidebar-text {
  font-size: 1rem;
}
</style>