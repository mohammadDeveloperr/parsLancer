<template>
    <div>

        <sidebar :sidebar-items="sidebarItems"></sidebar>
        <projectCards :query="query"></projectCards>
    </div>
</template>

<script>
/* eslint-disable */
import projectCards from './projectsCards.vue'
import { getSession } from '../utils/sessionUtils'
import Cookies from 'js-cookie';
import Sidebar from './sideBar.vue';

export default {
    name: "employerProject",
    components: {
        projectCards,
        Sidebar
    },
    data() {
        return {
            token: Cookies.get('token'),
            username: '',
            query: '',
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

        }
    }, created() {
        this.query = { employer_username: getSession(this.token).username }
    }
}
</script>

<style></style>