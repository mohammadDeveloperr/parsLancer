<template>
    <div>

        <div class="profile">

            <b-container class="py-4" dir="rtl">
                <div class="profile-header mt-5">
                    <b-avatar size="150" class="mt-5">
                        <!-- You can use an image URL or initials for the avatar -->
                        <img src="https://via.placeholder.com/150" alt="User Avatar">
                    </b-avatar>
                    <div class="profile-header-info text-right mr-3 mb-3">
                        <h1>{{ user.first_name }} {{ user.last_name }}</h1>
                        <p class="text-primary"><i class="fas fa-map-marker-alt"></i> {{ user.username }}</p>
                        <p class="text-primary"><i class="fas fa-envelope"></i> {{ user.email }}</p>
                        <p class="text-primary"><i class="fas fa-link"></i>{{ user.number }}</p>
                    </div>
                </div>

                <b-card class="profile-details mt-4 text-right">
                    <h3>درباره من</h3>
                    <p id="about_me">{{ user.about_me }} </p>
                    <hr>
                    <div class="profile-skills">
                        <h3>مهارت ها </h3>
                        <b-badge v-for="skill in skills" :key="skill.skill" pill variant="primary" class="mr-2 mb-2">{{
                            skill.skill
                        }}</b-badge>
                    </div>
                </b-card>

            
            </b-container>
        </div>

    </div>
</template>

<script>
/* eslint-disable */
import { getSession } from '../utils/sessionUtils'
import Sidebar from './sideBar.vue';
import Cookies from 'js-cookie';
import axios from 'axios'

export default {
    name: 'Profile',
    data() {
        return {
            user: {},
           
            username: '',
            skills:[]
        };
    },
    components: {
        Sidebar
    },
    methods: {
        async getUserInfo() {
            try {
                this.username = this.$route.params.username
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/users',
                    headers: {},
                    params: { username: this.username }
                };

                // axios.request(config)
            
                const response = await axios.request(config)
                this.user = response.data.users[0]
            } catch (err) {
                console.log(err)
                this.projects = []
            }
        },
        async getUserSkills() {
            try {
                const config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/userSkill`,
                    headers: { token: this.token },
                    params: { username: this.username }
                };

                //  axios.request(config)
                const response = await axios.request(config)
                console.log("response of userSkill")
                console.log(response.data.userSkills)
                this.skills=response.data.userSkills
            } catch (err) {
                console.log("error when get user skill data")
                console.log(err)
            }
        },
        editProfile() {
            // Navigate to the edit profile page
            this.$router.push('/edit-profile');
        }
    },
    created() {
        console.log('username is ')
        console.log(this.$route.params.id)
        this.getUserInfo()
        this.getUserSkills()
    }
};
</script>

<style scoped>
#about_me{
    color:black !important;
}
.profile {
    background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
    /* Gradient background */

    /* background: linear-gradient(135deg, #3498db, #8e44ad); */
    /* Gradient background */
    color: #ffffff;
    /* Text color */
    padding-bottom: 50px;
    /* Additional padding for bottom */
    height: 100vh;

}

.profile-header {
    display: flex;
    align-items: center;
}

.profile-header-info {
    margin-left: 20px;
    margin-top: 6%;
    direction: rtl;
}

.profile-header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.profile-header p {
    font-size: 1.2rem;
    margin-bottom: 5px;
}

.profile-details {
    background-color: #ffffff;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    /* Shadow for card */
    padding: 20px;
    border-radius: 10px;

}

.profile-details h3 {
    color: #333333;
    /* Dark text color */
    font-size: 1.8rem;
    margin-bottom: 15px;
}

.profile-details p {
    font-size: 1.2rem;
    line-height: 1.6;
}

.profile-details hr {
    margin: 20px 0;
}

.profile-skills {
    margin-top: 20px;
}

.profile-skills h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
}

.b-badge {
    font-size: 1rem;
    padding: 8px 12px;
}

.b-badge-primary {
    background-color: #3498db;
    color: #ffffff;
}

.b-button {
    background-color: #3498db;
    /* Button background color */
    border: none;
}

.b-button:hover {
    background-color: #2980b9;
    /* Darker button background color on hover */
}
</style>