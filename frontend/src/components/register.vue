<template>
  <div class="register-wrapper d-flex justify-content-center align-items-center">
    <b-card class="register-card shadow w-100 " bg-variant="light" border-variant="primary" text-variant="dark">
      <div class="text-center mb-4">
        <b-icon icon="person-plus" font-scale="3" variant="primary"></b-icon>
        <h3 class="">ثبت نام</h3>
      </div>

      <b-form @submit.prevent="register" dir="rtl" class="mt-10">
        <b-form-group label="نام :" label-for="first_name" class="mb-3 text-right">
          <b-form-input id="first_name" type="text" v-model="form.first_name" 
            placeholder="نام خود را وارد کنید"></b-form-input>
        </b-form-group>
        <b-form-group label="نام کاربری  :" label-for="username" class="mb-3 text-right">
          <b-form-input id="username" type="text" v-model="form.username" 
            placeholder="نام کاربری خود را وارد کنید"></b-form-input>
        </b-form-group>
        <b-form-group label="رمز عبور :" label-for="password" class="mb-3 text-right">
          <b-form-input id="password" type="password" v-model="form.password" 
            placeholder="رمز عبور خود را وارد کنید"></b-form-input>
        </b-form-group>

        <b-form-group label=" ایمیل :" label-for="email" class="mb-3 text-right">
          <b-form-input id="email" type="email" v-model="form.email" 
            placeholder="ایمیل خود را وارد کنید"></b-form-input>
        </b-form-group>


        <b-form-group label="تلفن همراه :" label-for="number" class="mb-3 text-right">
          <b-form-input id="number" type="text" v-model="form.number" 
            placeholder="تلفن همراه خود را وارد کنید"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" block>ثبت نام</b-button>
      </b-form>
      <div v-if="errorMessage" class="mt-3 text-center text-danger">
        {{ errorMessage }}
      </div>
      <div class="mt-3 text-center">
        <b-link to="/login">اکانت داری? ورود</b-link>
      </div>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: "register",
  data() {
    return {
      form: {
        first_name: '',
        username: '',
        email: '',
        password: '', 
        number: ''
      },
      errorMessage: ""

    };
  },
  methods: {
    showMsgBoxTwo() {
            console.log('hello')
            this.boxTwo = ''
            this.$bvModal.msgBoxOk('ثبت نام شما با موفقیت انجام شد', {
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
                    this.$router.push('/login');
                })
                .catch(err => {
                    // An error occurred
                })
        },
    async register() {
      console.log('hello world')
      try {
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/register',
          headers: {},
          data: this.form
        };

        // axios.request(config)
        const response = await axios.request(config)
        console.log(response)

        console.log("response is ")
        console.log(response)

        const { data } = response.data
        console.log('data is ')
        console.log(data)

        this.showMsgBoxTwo()
      } catch (error) {
        console.log(error)
        console.log(error.response.data.message ? "true" : "false")
        if (error.response.data.message) {
          console.log(typeof error.response.data.message )
          this.errorMessage = typeof error.response.data.message=='object'? error.response.data.message[0]:error.response.data.message; // Generic error message
        } else {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred. Please try again.'; // Generic error message
        }
      }
    },
    onSubmit() {
      // Handle form submission
      console.log('Form submitted:', this.form);
    }
  }
};
</script>

<style scoped>
.register-wrapper {
  width: 100vw;
  height: 100vh;
  /*background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center;*/
  background: linear-gradient(135deg, #fbc2eb, #a6c1ee);

  background-size: cover;
}

.register-card {
  width: 150%;
  height: 100%;
  max-width: 500px;
  max-height: 670px;
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

.register-card {
  top: 5%;
  width: 80vw !important;
  padding: 0;
}
</style>