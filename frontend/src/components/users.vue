<template>
    <div class="freelancers-page py-5">
        <br><br><br><br><br>
        <b-container dir="rtl">
            <b-row>
                <b-col v-for="freelancer in freelancers" :key="freelancer.id" cols="12" md="6" lg="4" class="mb-4">
                    <b-card class="freelancer-card shadow-sm">
                        <div class="user-image">
                            <img src="../picture//person.webp" :alt="freelancer.name" />
                        </div>
                        <b-card-body>
                            <b-card-title class="text-center">{{ freelancer.first_name }} {{ freelancer.last_name
                                }}</b-card-title>
                            <b-card-text class="text-right">
                                <strong>مهارت ها :</strong>
                                <b-badge v-for="skill in freelancer.userSkills" :key="skill.skill" pill variant="primary"
                                    class="mr-2 mb-2">{{
                                        skill.skill
                                    }}</b-badge>
                                <!-- {{ freelancer.userSkills.join(', ') }}  -->
                            </b-card-text>
                            <b-button variant="primary" class="mt-3 w-100" @click="viewProfile(freelancer.username)">
                                مشاهده پروفایل
                            </b-button>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
    name: 'Freelancers',
    data() {
        return {
            freelancers: [
                {
                    id: 1,
                    name: 'John Doe',
                    skills: ['JavaScript', 'Vue.js', 'HTML', 'CSS'],
                    image: 'https://via.placeholder.com/150'
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    skills: ['Python', 'Django', 'PostgreSQL'],
                    image: 'https://via.placeholder.com/150'
                },
                // Add more freelancers as needed
            ]
        };
    },
    methods: {
        viewProfile(username) {
            this.$router.push(`/profile/${username}`);
            // Handle profile view logic here
        },
        async fetchUsers() {
            try {

                // const query = this.$router.history.current.query
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/users',
                    headers: {}
                };

                // axios.request(config)
                const response = await axios.request(config)
                console.log('response is ')
                console.log(response.data)
                console.log(response.data.users)
                this.freelancers = response.data.users
            } catch (err) {
                console.log(err)
                this.freelancers = []
            }

        }
    },
    created() {
        this.fetchUsers()
    }
};
</script>

<style scoped>
.freelancers-page {
    background-color: #f8f9fa;
}

.freelancer-card {
    border-radius: 15px;
    transition: transform 0.3s, box-shadow 0.3s;
    overflow: hidden;
    border: none;
    background-color: #ffffff;
}

.freelancer-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.user-image {
    width: 100%;
    height: 150px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-image img {
    width: 50%;
    height: auto;
    border-radius: 50%;
}

.b-card-body {
    padding: 20px;
}

.b-card-title {
    color: #007bff;
    font-weight: bold;
    font-size: 1.25rem;
}

.b-card-text {
    color: #6c757d;
}

.freelancer-card .btn {
    background-color: #28a745;
    border-color: #28a745;
    font-weight: bold;
    font-size: 1rem;
}

.freelancer-card .btn:hover {
    background-color: #218838;
    border-color: #1e7e34;
}
</style>