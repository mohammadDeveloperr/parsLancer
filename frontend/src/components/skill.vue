<template>
    <div class="container mt-4">
        <sidebar></sidebar>
        <div id="skill" dir="rtl">



            <!-- Display existing skills -->
            <h3 class="text-right mb-5">مهارت های موجود</h3>
            <b-list-group dir="rtl">
                <b-list-group-item class="text-right" v-for="(skill) in skills" :key="skill.name">
                    <span>{{ skill.name }}</span>

                    <b-button id="btn" class="text-left" @click="deleteSkill(skill.name)" variant="danger"
                        size="sm">حذف</b-button>
                </b-list-group-item>
            </b-list-group>

            <hr class="mt-5 mb-5">

            <h2 class="text-right mb-4">اضافه کردن مهارت</h2>

            <!-- Form to add a new skill -->
            <b-form @submit.prevent="addSkill" class="text-right">
                <b-form-group>
                    <b-form-input v-model="newSkill" required placeholder="نام مهارت را وارد کنید ..."></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">اضافه کردن</b-button>
            </b-form>
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
    /* eslint-disable */
    name: "skill",
    data() {
        return {
            token: Cookies.get('token'),
            newSkill: '',
            skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js'] // Initial skills data (replace with your data)
        };
    },
    methods: {

        makeToast(variant = null, message) {
            this.$bvToast.toast(message, {
                title: ``,
                variant: variant,
                solid: true
            })
        },
        async getSkills() {
            try {
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/skill',
                    headers: { token: this.token }
                };

                // axios.request(config)
                const response = await axios.request(config)

                this.skills = response.data.skills

            } catch (err) {
                console.log('this is error ')
                console.log(err)
                this.skills = []
            }

        },
        checkTags(skill) {
            let check = false;


            check = this.skills.find(elem => { return elem == skill })

            if (check) {
                throw "مهارت انتخابی تکراری میباشد"
            }


        },
        async addSkill() {
            try {

                this.newSkill = this.newSkill.trim()
                console.log(this.newSkill)
                this.checkTags(this.newSkill)
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/skill',
                    headers: { token: this.token },
                    data: { name: this.newSkill }
                };

                const response = await axios.request(config)
                this.makeToast("success", "مهارت با موفقیت اضافه شد")
                console.log("skill is")
                console.log(this.newSkill)
                console.log(this.skills)
                this.skills.push({ name: this.newSkill });
                console.log(this.skills)

                this.newSkill = '';
            } catch (error) {
                console.log(error)
                if (error = "مهارت انتخابی تکراری میباشد")
                    this.makeToast("danger", "مهارت انتخابی تکراری میباشد")

                else {
                    this.makeToast("danger", "اضافه کردن مهارت با مشکل مواجه شد")
                }
            }


        },
        async deleteSkill(name) {
            try {
                let config = {
                    method: 'DELETE',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/skill/${name}`,
                    headers: { token: this.token }
                };

                // axios.request(config)
                const response = await axios.request(config)

                this.makeToast("success", "مهارت با موفقیت حذف شد")
                this.getSkills()

            } catch (err) {
                console.log('this is error ')
                console.log(err)
                this.makeToast("danger", " مهارت حذف نشد")
            }
        }
    },
    created() {
        this.user = getSession(this.token)
        if (this.user.role != "admin")
            this.$router.push('/404');
        this.getSkills()
    },
    components: {
        Sidebar
    }
};
</script>

<style>
#skill {
    margin: 10% 0 10% 0;
}

#btn {
    float: left
}
</style>