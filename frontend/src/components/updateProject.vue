<template>
    <div>
        <sidebar></sidebar>

        <div class="create-project-page mt-5">
            <b-container fluid class="mt-5 text-right">
                <b-row class="mt-5">
                    <b-col md="8" class="mx-auto">
                        <b-card no-body>
                            <b-tabs pills card>
                                <b-tab title="اطلاعات پروژه" active>
                                    <b-card-body>
                                        <h3 class="text-primary">ساخت پروژه جدید</h3>
                                        <b-form @submit.prevent="submitProject">
                                            <b-form-group label="تیتر پروژه" label-for="project-title">
                                                <b-form-input id="project-title" v-model="project.title"
                                                    ></b-form-input>
                                            </b-form-group>

                                            <b-form-group label="توضیحات پروژه" label-for="project-explain">
                                                <b-form-textarea id="project-description" v-model="project.explain"
                                                    rows="4" required></b-form-textarea>
                                            </b-form-group>

                                            <b-form-group label="مهارت های مورد نیاز" label-for="skills">
                                                <b-form-tags v-model="skills" id="skills"
                                                    placeholder="Add a skill..."></b-form-tags>
                                            </b-form-group>

                                            <b-form-group label="بودجه (ریال)">
                                                <b-form-row>
                                                    <b-col>
                                                        <b-form-input type="number" v-model="project.minPrice"
                                                            placeholder="حداقل" class="text-right"
                                                            required></b-form-input>
                                                    </b-col>
                                                    <b-col>
                                                        <b-form-input type="number" v-model="project.maxPrice"
                                                            placeholder="حداکثر" class="text-right"
                                                            required></b-form-input>
                                                    </b-col>
                                                </b-form-row>
                                            </b-form-group>



                                            <b-button type="submit" variant="primary">اپدیت کردن پروژه</b-button>
                                            <div v-if="errorMessage" class="mt-3 text-center text-danger">
                                                {{ errorMessage }}
                                            </div>
                                        </b-form>
                                    </b-card-body>
                                </b-tab>

                            </b-tabs>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
import Cookies from 'js-cookie';
import Sidebar from './sideBar.vue';

export default {
    data() {
        return {
            project: {
                title: '',
                explain: '',

                minPrice: '',
                maxPrice: ''
            },
            skills: [],
            errorMessage: '',
            projectTypes: [
                { value: null, text: 'Please select a type' },
                { value: 'one-time', text: 'One-time Project' },
                { value: 'ongoing', text: 'Ongoing Project' }
            ],
            token: Cookies.get('token'),
            projectId: ''

        };
    }, components: {
        Sidebar
    },
    methods: {
        showMsgBoxTwo(message) {
            console.log('hello')
            this.boxTwo = ''
            this.$bvModal.msgBoxOk(message, {
                title: 'Confirmation',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
            })
                .then(value => {
                    this.boxTwo = value
                    this.$router.push(`/project/${this.projectId}`);
                })
                .catch(err => {
                    // An error occurred
                })
        },
        async submitProject() {
            let state = 0
            try {

                this.checkTags()

                this.project.minPrice = parseInt(this.project.minPrice)
                this.project.maxPrice = parseInt(this.project.maxPrice)
                const {title,explain,minPrice,maxPrice}=this.project
                this.project={title,explain,minPrice,maxPrice}
                let config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/project/${this.$route.params.id}`,
                    headers: { token: this.token },
                    data: this.project
                };


                // axios.request(config)
                let response = await axios.request(config)
                state = 1
                console.log('response add project is')
                console.log(response)

                config = {
                    method: 'put',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/projectSkill/${this.$route.params.id}`,
                    headers: { token: this.token },
                    data: { skills: this.skills }
                };

                // axios.request(config)
                response = await axios.request(config)
                state = 2
                this.showMsgBoxTwo("پروژه با موفقیت اپدیت شد")
            } catch (error) {
                console.log(error)
                if ( state == 0 && error.response) {
                    console.log(typeof error.response.data.message)
                    this.errorMessage = typeof error.response.data.message == 'object' ? error.response.data.message[0] : error.response.data.message; // Generic error message
                }
                else if ( state == 0 && !error.response) {
                    this.errorMessage = error
                }
                else if (state == 1) {
                    this.showMsgBoxTwo(" پروژه با موفقیت اپدیت شد ولی مهارت های ان اضافه نشدند")
                }
                else {
                    console.error('Error:', error);
                    this.errorMessage = 'An error occurred. Please try again.'; // Generic error message
                }
            }
        },
        async getProjectInfo() {
            {
                try {
                    let config = {
                        method: 'GET',
                        maxBodyLength: Infinity,
                        url: `http://localhost:3000/project?id=${this.$route.params.id}`,
                        headers: {},
                        // data: this.form
                    };


                    const response = await axios.request(config)
                    this.project = response.data.projects[0]
                } catch (err) {
                    console.log(err)
                    this.project = []
                }

            }
        },
        async getSkillsInfo() {

            try {
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/projectSkill?projectId=${this.$route.params.id}`,
                    headers: {},
                    //data: {projectId:this.$route.params.id}
                };


                // axios.request(config)
                const response = await axios.request(config)
                console.log('this is rsponse')
                console.log(response)
                for (let skill of response.data.projectSkills) {
                    console.log('this is skill tag')
                    console.log(skill.skill)
                    this.skills.push(skill.skill)
                }
                console.log(skills)
                // this.skills = response.data.projectSkills
            } catch (err) {
                console.log(err)
                this.skills = []
            }

        },
        async getTags() {
            try {
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/skill',
                    headers: {},
                    params: {}
                };


                const response = await axios.request(config)
                console.log('tags is ')

                console.log(response)
                this.allSkill = response.data.skills
            } catch (err) {
                console.log(err)
                this.projects = []
            }
        },
        checkTags() {
            let check = false;
            console.log('skills is')
            console.log(this.skills)
            for (let skill of this.skills) {
                console.log(skill)
                check = this.allSkill.find(elem => { return elem.name == skill })
                console.log('check is ')
                console.log(check)
                if (!check) {
                    throw "مهارت انتخابی موجود نمیباشد"
                }
            }

        }
    },
    created() {
        if (!this.$route.params.id) {
            this.$router.push('/project');
        }
        this.getProjectInfo()
        this.getSkillsInfo()
        this.getTags()
    }

}
</script>

<style scoped>
.create-project-page {
    background-color: #f8f9fa;
    padding: 2rem 0;
}

.b-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.b-tabs-card>.nav-tabs {
    background-color: #007bff;
}

.b-tabs-card>.nav-tabs .nav-item .nav-link {
    color: #fff;
    transition: background-color 0.3s ease;
}

.b-tabs-card>.nav-tabs .nav-item .nav-link:hover,
.b-tabs-card>.nav-tabs .nav-item .nav-link.active {
    background-color: #0056b3;
}

.b-form-group {
    margin-bottom: 1.5rem;
}

.b-button {
    width: 100%;
}

.b-button:hover {
    background-color: #0056b3 !important;
}

.text-primary {
    color: #007bff !important;
}
</style>