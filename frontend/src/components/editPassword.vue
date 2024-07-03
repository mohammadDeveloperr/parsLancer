<template>
    <div id="changePasswordPage">
        <b-container>
            <b-row class="justify-content-center" dir="rtl">
                <b-col md="6">
                    <b-card class="mt-5 shadow-sm">
                        <b-card-title class="text-center text-primary">تغییر رمز عبور</b-card-title>
                        <b-card-body dir="">
                            <b-form @submit.prevent="handleSubmit">
                                <b-form-group label="رمز عبور فعلی" class="text-right" label-for="oldPassword">
                                    <b-input-group>
                                        <b-input-group-prepend is-text>
                                            <b-icon icon="lock" class="input-icon"></b-icon>
                                        </b-input-group-prepend>
                                        <b-form-input id="oldPassword" v-model="oldPassword" type="password" required
                                            placeholder="رمز فعلی خود را وارد کنید"></b-form-input>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group label="رمز عبور جدید" class="text-right" label-for="newPassword">
                                    <b-input-group>
                                        <b-input-group-prepend is-text>
                                            <b-icon icon="key" class="input-icon"></b-icon>
                                        </b-input-group-prepend>
                                        <b-form-input id="newPassword" v-model="newPassword" type="password" required
                                            placeholder="رمز عبور جدید خود را وارد کنید"></b-form-input>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group label="رمز عبور جدید" class="text-right" label-for="confirmNewPassword">
                                    <b-input-group>
                                        <b-input-group-prepend is-text>
                                            <b-icon icon="key-fill" class="input-icon"></b-icon>
                                        </b-input-group-prepend>
                                        <b-form-input id="confirmNewPassword" v-model="confirmNewPassword"
                                            type="password" required
                                            placeholder="رمز عبور جدید خود را وارد کنید"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                                <div v-if="errorMessage" class="mt-3 text-center text-danger">
                                    {{ errorMessage }}
                                </div>

                                <b-button type="submit" variant="primary" block class="mt-3">تغییر رمز عبور</b-button>
                            </b-form>
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
import Cookies from 'js-cookie';
import { getSession } from '../utils/sessionUtils'
export default {
    data() {
        return {
            token: Cookies.get('token'),
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            errorMessage: "",
            user: {}
        };
    },
    methods: {
        async showMsgBoxTwo() {
            console.log('hello')
            this.boxTwo = ''
            await this.$bvModal.msgBoxOk("رمز عبور شما با موفقیت تغییر کرد", {
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
                    location.reload();


                })
                .catch(err => {
                    // An error occurred
                })
        },
        async handleSubmit() {


            try {
                if (this.newPassword !== this.confirmNewPassword) {
                    throw "رمز عبور های جدید مثل هم نمیباشند"
                }

                console.log('this is user')
                console.log(this.token)
                console.log(this.user)
                let config = {
                    method: 'PATCH',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/users`,
                    headers: { token: this.token },
                    data: { oldPassword: this.oldPassword, newPassword: this.newPassword }
                };

                // axios.request(config)
                const response = await axios.request(config)
                console.log('this is response ')
                console.log(response)


                await this.showMsgBoxTwo()

            } catch (error) {
                console.log('this is error ')
                console.log(error)
                if (error == "رمز عبور های جدید مثل هم نمیباشند") {
                    this.errorMessage = "رمز عبور های جدید مثل هم نمیباشند"
                }
                else if (typeof error.response.data.message == "object") {
                    this.errorMessage = error.response.data.message[0] || error.response.data.message; // Generic error message
                } else if (typeof error.response.data.message == "string") {
                    this.errorMessage = error.response.data.message || error.response.data.message;
                }
                 else {
                    console.error('Error:', error);
                    this.errorMessage = 'An error occurred. Please try again.'; // Generic error message
                }
            }

        }
    },
    created() {
        this.user = getSession(this.token)

    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

#changePasswordPage {
    font-family: 'Roboto', sans-serif;
    background-color: #f8f9fa;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.b-card {
    border-radius: 10px;
}

.b-card-title {
    font-weight: 700;
}

.input-icon {
    color: #007bff;
}

.b-form-group label {
    font-weight: 500;
}

.b-button {
    font-weight: 500;
}

.b-card-body {
    padding: 2rem;
}
</style>