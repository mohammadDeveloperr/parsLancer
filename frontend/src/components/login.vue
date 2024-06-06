<template>
    <div class="login-wrapper d-flex justify-content-center align-items-center">
        <b-card class="login-card p-4 shadow" bg-variant="light" border-variant="primary" text-variant="dark">
            <div class="text-center mb-4">
                <b-icon icon="person-circle" font-scale="3" variant="primary"></b-icon>
                <h3 class="mt-2">ورود</h3>
            </div>
            <b-form @submit.prevent="login" dir="rtl">
                <b-form-group label="  نام کاربری :" label-for="username" class="mb-3 text-right " dir="rtl">
                    <b-form-input id="username" type="text" v-model="form.username"
                        placeholder="نام کاربری خودرا وارد کنید"></b-form-input>
                </b-form-group>

                <b-form-group label="رمز عبور :" label-for="password" class="mb-3 text-right">
                    <b-form-input id="password" type="password" v-model="form.password"
                        placeholder="رمز عبور خود را وارد کنید"></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary" block>ورود</b-button>
            </b-form>
            <div v-if="errorMessage" class="mt-3 text-center text-danger">
                {{ errorMessage }}
            </div>
            <div class="mt-3 text-center">
                <b-link href="#">فراموش رمز عبور</b-link>
                <div class="mt-2">
                    <b-link to="/register">ثبت نام</b-link>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Cookies from 'js-cookie';

export default {
    name: "login",
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            errorMessage: ""

        };
    },
    methods: {
        showMsgBoxTwo() {
            console.log('hello')
            this.boxTwo = ''
            this.$bvModal.msgBoxOk('شما با موفقیت وارد شدین', {
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
                    this.$router.push('/');
                })
                .catch(err => {
                    // An error occurred
                })
        },
        async login() {
            try {
                // Make HTTP POST request to login endpoint
                // let data = JSON.parse(this.form);
                console.log(this.form)
                console.log(typeof this.form)
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/login',
                    headers: {},
                    data: this.form
                };

                // axios.request(config)
                const response = await axios.request(config)
                console.log(response)



                const { token } = response.data
                console.log(token)

                Cookies.set('token', token, { expires: 7 });
                this.showMsgBoxTwo()

            } catch (error) {
                console.log(error)
                console.log(error.response.data.message ? "true" : "false")
                if (error.response.data.message) {
                    this.errorMessage = error.response.data.message[0] || error.response.data.message; // Generic error message
                } else {
                    console.error('Error:', error);
                    this.errorMessage = 'An error occurred. Please try again.'; // Generic error message
                }
            }
        }
    }

};
</script>

<style scoped>
.login-wrapper {
    width: 100vw;
    height: 100vh;
    background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center;
    background-size: cover;
}

.login-card {
    width: 100%;
    max-width: 400px;
}

.p-4 {
    padding: 1.5rem;
}

.shadow {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.text-center {
    text-align: center;
}

.mb-3 {
    margin-bottom: 1rem;
}
</style>