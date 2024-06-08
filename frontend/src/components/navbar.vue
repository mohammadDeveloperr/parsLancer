<template>
    <!-- Navbar Light -->
    <div class="container ">
        <div class="row">
            <div class="col-12">
                <b-navbar
                    class="navbar navbar-expand-lg navbar-light blur shadow  bg-white z-index-3 py-3 border-radius-xl top-0 rounded z-index-fixed  "
                    fixed="top">
                    <div class="container" dir="rtl">
                        <router-link class="navbar-brand" to="/" rel="tooltip"
                            title="Designed and Coded by Creative Tim" data-placement="bottom">
                            parsLancer
                        </router-link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
                            aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navigation">
                            <ul class="navbar-nav navbar-nav-hover mx-auto">
                                <li class="nav-item px-3">
                                    <router-link class="nav-link text-dark" to="/project"> پروژه ها </router-link>

                                </li>

                                <li class="nav-item px-3">
                                    <a class="nav-link">
                                        Utilities
                                    </a>
                                </li>

                                <li class="nav-item px-3">
                                    <a class="nav-link">
                                        Blocks
                                    </a>
                                </li>

                                <li class="nav-item px-3">
                                    <a class="nav-link ">
                                        Docs
                                    </a>
                                </li>
                            </ul>

                            <ul class="navbar-nav ms-auto">
                                <li v-if="!this.token">

                                    <router-link class="mb-5 text-dark" to="/login"> ورود
                                        <b-icon-person-circle></b-icon-person-circle></router-link>
                                </li>
                                <li v-else-if="this.token" dir="rtl">
                                    <b-nav-item-dropdown split split-variant="outline-primary" variant="primary">
                                        <template #button-content>
                                            <span class="ml-1 mb-5">
                                                <b-icon-person-circle></b-icon-person-circle>
                                            </span>
                                            <span class="ml-2 mb-5">{{ username }}</span>
                                        </template>
                                        <b-dropdown-item class="text-right text-dark">
                                            <router-link to="/profile" class="text-dark">
                                                <i class="fas fa-user"></i> حساب کاربری
                                            </router-link>
                                        </b-dropdown-item>
                               

                                        <b-dropdown-divider></b-dropdown-divider>
                                        <b-dropdown-item @click="logout" class="text-right">
                                            <i class="fas fa-sign-out-alt"></i> خروج از حساب کاربری
                                        </b-dropdown-item>
                                    </b-nav-item-dropdown>
                                </li>



                            </ul>
                        </div>
                    </div>
                </b-navbar>
            </div>
        </div>
    </div>
    <!-- End Navbar -->

</template>

<script>
/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, BootstrapVueIcons, BIcon, BIconPersonCircle, fAUserCircle } from 'bootstrap-vue'
import Cookies from 'js-cookie';
import { clearSession,getSession } from '../utils/sessionUtils'

export default {

    name: "navbar",
    components: {
        BootstrapVue,
        BootstrapVueIcons,
        BIcon,
        BIconPersonCircle,
        fAUserCircle
    },
    data() {
        return {
            token: Cookies.get('token'),
            username: '',
        }
    },
    methods: {
        logout() {
            console.log('logout')
            clearSession(this.token)
            Cookies.remove('token')
            Cookies.remove('username')
        }
    },
    created(){
        this.username=getSession(this.token).username
    }
}
</script>


<style>
.navbar {
    width: 70%;
    margin: 0 auto;
    top: 10px
}
</style>