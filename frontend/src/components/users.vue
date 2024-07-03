<template>
    <div class="freelancers-page py-5">
        <br><br><br><br><br>
        <b-container class="search-section container  py-4" lg="8" dir="rtl">
            <div class="text-center" id="d1">
                <b-row class="align-items-center mb-3 text-center" justify="center">
                    <b-col id="my-col" lg="8" md="10">
                        <b-form-group label="تیتر پروژه" label-for="project-title">
                            <b-form-input id="project-title" v-model="usernameSearch"
                                placeholder="          جستجو براساس نام کاربری    "></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="align-items-center">
                    <b-col id="my-col" lg="8" md="10">
                        <b-form-group label="مهارت های مورد نیاز" label-for="skills">
                            <b-form-tags v-model="skillSearch" id="skills" placeholder="جستجو بر اساس مهارت ها ">
                            </b-form-tags>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row class="align-items-left mt-3">
                    <b-col id="my-col" lg="8" md="10">
                        <small><b-button id="search_btn" type="submit" variant="success" @click.prevent="searchUsers()"
                                class="mr-3">
                                جستجو
                            </b-button></small>
                    </b-col>
                </b-row>
            </div>


        </b-container>
        <b-container dir="rtl" class="mt-5">
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
                                <b-badge v-for="skill in freelancer.userSkills" :key="skill.skill" pill
                                    variant="primary" class="mr-2 mb-2">{{
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
            ],
            skillSearch:[],
            usernameSearch:''
        };
    },
    methods: {
        viewProfile(username) {
            this.$router.push(`/profile/${username}`);
            // Handle profile view logic here
        },
        async fetchUsers() {
            try {
                let data = {}

                if (this.usernameSearch.length > 0) {
                    data.username = this.usernameSearch
                }

                if (this.skillSearch.length > 0) {
                    for (let skill of this.skillSearch) {
                        data = { ...data, skill }
                    }
                }

                // const query = this.$router.history.current.query
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/users',
                    headers: {},
                    params:data
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

        },
        searchUsers() {
            this.fetchUsers()
        }
    },
    created() {
        this.fetchUsers()
    }
};
</script>

<style scoped>
#search_btn {
    width: 25%
}

#d1 {
    margin-right: 17%;
    width: 100%;
}

.search-section {
    /* background-color: #007bff; */
    background-color: white;
    width: 65%;
    height: 20% !important;
    /* padding: 20px; */
    border-radius: 8px;
    color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center !important;
}

.search-section .b-input-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}

.search-section .search-icon {
    color: #007bff;
}

.search-section .b-form-input {
    border: none;
    box-shadow: none;
}

.search-section .b-form-input:focus {
    box-shadow: none;
    border-color: #007bff;
}

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