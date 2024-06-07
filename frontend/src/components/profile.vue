<template>
    <div>
        <sidebar ></sidebar>

        <div class="profile">

            <b-container class="py-4" dir="rtl">
                <div class="profile-header mt-5">
                    <b-avatar size="150" class="mt-5">
                        <!-- You can use an image URL or initials for the avatar -->
                        <img src="https://via.placeholder.com/150" alt="User Avatar">
                    </b-avatar>
                    <div class="profile-header-info text-right mr-3 mb-3">
                        <h1>{{ user.name }}</h1>
                        <p><i class="fas fa-map-marker-alt"></i> {{ user.location }}</p>
                        <p><i class="fas fa-envelope"></i> {{ user.email }}</p>
                        <p><i class="fas fa-link"></i> <a href="#">www.example.com</a></p>
                    </div>
                </div>

                <b-card class="profile-details mt-4 text-right">
                    <h3>درباره من</h3>
                    <p>{{ user.bio }}</p>
                    <hr>
                    <div class="profile-skills">
                        <h3>مهارت ها </h3>
                        <b-badge v-for="skill in user.skills" :key="skill" pill variant="primary" class="mr-2 mb-2">{{
                            skill
                            }}</b-badge>
                    </div>
                </b-card>

                <!-- Edit Profile Button -->
                <b-button variant="primary" @click="editProfile" class="mt-3">
                    <i class="fas fa-user-edit"></i> ویرایش پروفایل
                </b-button>
            </b-container>
        </div>

    </div>
</template>

<script>
/* eslint-disable */
import { getSession } from '../utils/sessionUtils'
import Sidebar from './sideBar.vue';

export default {
    name: 'Profile',
    data() {
        return {
            user: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                location: 'New York, USA',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac feugiat enim, non consectetur enim.',
                skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Bootstrap', 'UI/UX Design']
                // Add more user details here
            },
            sidebarItems: [
                {
                    name: 'پروژه های من',
                    icon: 'ni ni-planet text-orange',
                    path: '/employer-project'
                },
                // Add more sidebar items as needed
            ]
        };
    },
    components: {
        Sidebar
    },
    methods: {
        async getUserInfo() {
            try {
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/users?username',
                    headers: {},
                    // data: this.form
                };

                // axios.request(config)
                const response = await axios.request(config)
                console.log('response is ')
                console.log(response.data.projects)
                this.projects = response.data.projects
            } catch (err) {
                console.log(err)
                this.projects = []
            }
        },
        editProfile() {
            // Navigate to the edit profile page
            this.$router.push('/edit-profile');
        }
    }
};
</script>

<style scoped>
.profile {
    background: linear-gradient(135deg, #fbc2eb, #a6c1ee); /* Gradient background */

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