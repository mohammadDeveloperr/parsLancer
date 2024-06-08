<template>
    <div class="container my-5 mt-5 projectPage" id="projectPage">
        <br>


        <!-- Tabs for Project Details, Submit Request, and All Requests -->
        <b-tabs content-class="mt-3" class="mt-5">
            <!-- Project Details Tab -->
            <b-tab title="مشخصات پروژه" active>
                <b-card class="mb-3 project-card">
                    <b-card-header class="project-header">
                        <h4>{{ project.title }}</h4>
                        <span v-if="project.status == 'pending'" class="text-success">باز </span>
                        <span v-else class="text-danger">بسته</span>
                    </b-card-header>
                    <b-card-body>
                        <b-card-text dir="rtl">
                            <strong>توضیح :</strong> {{ project.explain }}
                        </b-card-text>
                        <b-card-text>
                            <strong> : مهارت های مورد نیاز </strong>
                            <ul class="skills-list">
                                <li v-for="skill in skills" :key="skill.skill">{{ skill.skill }}</li>
                            </ul>
                        </b-card-text>
                        <b-card-text>
                            <strong>بودجه کافرما : </strong> {{ project.minPrice }} ریال - {{ project.maxPrice }} ریال
                        </b-card-text>
                        <b-card-text dir="rtl">
                            <strong> تاریخ ساخت درخواست : </strong> {{ project.createdAt }}
                        </b-card-text>
                        <b-card-text dir="rtl">
                            <strong> کافرما : </strong> {{ project.employer_username }}
                        </b-card-text>
                    </b-card-body>
                </b-card>
            </b-tab>

            <!-- Submit Request Tab -->
            <b-tab title="ارسال پیشنهاد" v-if="project.status == 'pending' && token">
                <b-card class="mb-3 request-card">
                    <b-card-header class="request-header">
                        <h5>پیشنهاد خود را وارد کنید</h5>
                    </b-card-header>
                    <b-card-body>
                        <b-form @submit.prevent="sendRequest">
                            <b-form-group label="توضیح شما :">
                                <b-form-textarea v-model="suggest.explain" rows="3" required></b-form-textarea>
                            </b-form-group>
                            <b-form-group label="زمان پیشنهادی">
                                <b-form-input v-model="suggest.time" type="number" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="قیمت پیشنهادی شما(به ریال ) : ">
                                <b-form-input v-model="suggest.price" type="number" required></b-form-input>
                            </b-form-group>

                            <b-button type="submit" variant="primary">ارسال پیشنهاد</b-button>
                            <div v-if="errorMessage" class="mt-3 text-center text-danger">
                                {{ errorMessage }}
                            </div>
                        </b-form>
                    </b-card-body>
                </b-card>
            </b-tab>

            <!-- All Requests Tab -->
            <b-tab title="تمام پیشنهادات" v-if="project.status == 'pending' && token" >
                <b-card class="mb-3 requests-list-card">
                    <b-card-header class="requests-list-header">
                        <h5>تمامی پیشنهادات این پروژه</h5>
                    </b-card-header>
                    <b-card-body>
                        <ul class="requests-list">
                            <li v-for="suggest in suggests" :key="suggest.id" dir="rtl">
                                <strong>نام کاربری فریلنسر :</strong>: {{ suggest.freelancer_username }} <br>
                                <!-- <small><strong>نام کاربری فریلنسر :</strong> {{ suggest.freelancer_username }}</small><br> -->
                                <small><strong>زمان پیشنهادی :</strong> {{ suggest.time }} روز</small><br>
                                <small><strong>بودجه پیشنهادی :</strong> {{ suggest.price }}</small><br><br>
                                <small v-if="suggest.employer_username==username.username"><b-button  type="submit" variant="primary"  @click.prevent="acceptSuggest(suggest.id)">قبول پیشنهاد</b-button></small>
                                
                            </li>
                           
                        </ul>
                    </b-card-body>
                </b-card>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Cookies from 'js-cookie';
import { getSession } from '../utils/sessionUtils'

export default {
    name: "project",
    data() {
        return {
            searchQuery: '',
            project: {},
            skills: [],
            suggest: {
                explain: '',
                price: 0,
                time: 0
            },
            errorMessage:'',
            suggests: [
                { id: 1, username: 'freelancer1', proposal: 'I can do this project within the budget.', bid: '$1500', time: '30', comments: 'I have experience with similar projects.' },
                { id: 2, username: 'freelancer2', proposal: 'Experienced developer ready to start.', bid: '$1800', time: '25', comments: 'Ready to deliver within the time frame.' }
            ],
            token:Cookies.get('token'),
            username:''
        };
    },
    created() {
        this.username = getSession(this.token)

        this.getSkillsInfo()
        this.getProjectInfo()
        this.searchProjectSuggest()
    },
    methods: {
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
                console.log('response skill is ')
                console.log(response.data)
                this.skills = response.data.projectSkills
                console.log("this.skills")
                console.log(this.skills)
            } catch (err) {
                console.log(err)
                this.skills = []
            }

        },
        getRequestInfo() {

        },
        async searchProjectSuggest() {
            try {
                    let config = {
                        method: 'GET',
                        maxBodyLength: Infinity,
                        url: `http://localhost:3000/suggest?projectId=${this.$route.params.id}`,
                        headers: {},
                        // data: this.form
                    };


                    const response = await axios.request(config)
                    console.log('suggest response is ')
                    console.log(response)
                    this.suggests = response.data.suggests
                } catch (err) {
                    console.log(err)
                    this.suggests = []
                }
        },
        showMsgBoxTwo(message='پیشنهاد شما با موفقیت ارسال شد') {
            console.log('hello')
            this.boxTwo = ''
            this.$bvModal.msgBoxOk(message, {
                title: 'درخواست موفق',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
            })
                .then(value => {
                    this.boxTwo = value
                    this.$router.push(`/project`);
                })
                .catch(err => {
                    // An error occurred
                })
        },
        async sendRequest() {
            try {
                if (!this.token) {
                    throw "access denied"
                }
                this.suggest.price=parseInt(this.suggest.price)
                this.suggest.time=parseInt(this.suggest.time)
                let config = {
                    method: 'POST',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/suggest/${this.$route.params.id}`,
                    headers: {token:this.token},
                    data: this.suggest
                };


                // axios.request(config)
                const response = await axios.request(config)
                console.log('response is ')
                console.log(response)
                this.showMsgBoxTwo()
                
            } catch (err) {
                console.log('error is ')
                console.log(err)
                console.log(err.response.data.message)
                if (err=='access denied') {
                    this.errorMessage = "شما برای اینکار دسترسی لازم را ندارید"
                }else if(err.response.data.message){
                    this.errorMessage = typeof err.response.data.message=='object'? err.response.data.message[0]:err.response.data.message; // Generic error message
                } else {
                    console.error('Error:', error);
                    this.errorMessage = 'خطایی در سرور لطفا بعدا امتحان کنید.'; // Generic error message
                }
            }
        },
        async acceptSuggest(id) {
            try {
                if (!this.token) {
                    throw "access denied"
                }
                console.log('id is')
                console.log(id)
                let config = {
                    method: 'PATCH',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/suggest`,
                    headers: {token:this.token},
                    params: {id}
                };
                console.log('config is ')

                console.log(config)


                // axios.request(config)
                const response = await axios.request(config)
                console.log('response is ')
                console.log(response)
                this.showMsgBoxTwo("پیشنهاد با موفقیت قبول شد")
                
            } catch (err) {
                console.log('error is ')
                console.log(err)
                console.log(err.response.data.message)
                if (err=='access denied') {
                    this.errorMessage = "شما برای اینکار دسترسی لازم را ندارید"
                }else if(err.response.data.message){
                    this.errorMessage = typeof err.response.data.message=='object'? err.response.data.message[0]:err.response.data.message; // Generic error message
                } else {
                    console.error('Error:', error);
                    this.errorMessage = 'خطایی در سرور لطفا بعدا امتحان کنید.'; // Generic error message
                }
            }
        }
    }
};
</script>

<style scoped>
#projectPage {
    top: 100px;
}

.container {
    text-align: center;
}

.project-card,
.request-card,
.requests-list-card {
    border: 2px solid #007bff;
    transition: transform 0.3s, box-shadow 0.3s;
}

.project-card:hover,
.request-card:hover,
.requests-list-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.project-header,
.request-header,
.requests-list-header {
    background-color: #007bff;
    color: white;
    text-align: center;
}

.skills-list {
    list-style-type: none;
    padding: 0;
}

.skills-list li {
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    background-color: #e9ecef;
    border-radius: 15px;
}

b-button {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
}

b-button:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.requests-list {
    list-style-type: none;
    padding: 0;
}

.requests-list li {
    margin: 10px 0;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 5px;
    border: 1px solid #e9ecef;
}
</style>