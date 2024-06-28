<template>
  <div>
    <sidebar></sidebar>
    <div class="edit-profile">
      <b-container fluid class="py-5">
        <div class="edit-form bg-white shadow rounded-lg">
          <h1 class="text-center mb-4">ویرایش پروفایل</h1>
          <b-form @submit.prevent="saveProfile" class="text-right" dir="rtl">
            <!-- Username Field -->
            <b-form-group label="نام :">
              <b-form-input v-model="user.first_name" autofocus></b-form-input>
            </b-form-group>
            <!-- Email Field -->
            <b-form-group label="نام خانوادگی :">
              <b-form-input v-model="user.last_name" type="text"></b-form-input>
            </b-form-group>
            <!-- Bio Field -->
            <b-form-group label="درباره من :">
              <b-form-textarea v-model="user.about_me" rows="5"></b-form-textarea>
            </b-form-group>
            <!-- Skills Field -->
            <b-form-group label="مهارت های مورد نیاز" label-for="skills">
              <b-form-tags v-model="skills" id="skills" placeholder="update skill ..." dir="ltr"
                class="text-left"></b-form-tags>
            </b-form-group>
            <!-- Save Button -->
            <b-button type="submit" variant="primary" class="w-100 mt-4">
              <i class="fas fa-save mr-2"></i> ذخیره ویرایش
            </b-button>
          </b-form>
          <div v-if="errorMessage" class="mt-3 text-center text-danger">
            {{ errorMessage }}
          </div>
        </div>
      </b-container>
    </div>

  </div>
</template>

<script>
/* eslint-disable */

import Sidebar from './sideBar.vue';
import { getSession } from '../utils/sessionUtils'
import Cookies from 'js-cookie';
import axios from 'axios'
export default {
  name: 'EditProfile',
  data() {
    return {
      token: Cookies.get('token'),
      username: '',
      user: {},
      skills: [],
      allSkill: [],
      errorMessage: ""


    };
  },
  methods: {
    async saveProfile() {
      try {
        await this.checkTags()
        await this.updateUser()
        await this.addUserSkill()
      } catch (err) {
        console.log(err)
        this.errorMessage = err
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
    async addUserSkill(){
      try {
       
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/userSkill',
          headers: {token:this.token},
          data:{skills:this.skills}
        };
        

        // axios.request(config)
        const response = await axios.request(config)
        await this.showMsgBoxTwo()
        
      } catch (error) {
        console.log('error is')
        console.log(error)
        if (error.response.data.message) {
          console.log(typeof error.response.data.message)
          this.errorMessage = typeof error.response.data.message == 'object' ? error.response.data.message[0] : error.response.data.message; // Generic error message
        } else {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred. Please try again.'; // Generic error message
        }
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

    },
    async getUserInfo() {
      try {
        this.username = getSession(this.token)
        let config = {
          method: 'GET',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/users',
          headers: {},
          params: { username: this.username.username }
        };


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
          params: { username: this.username.username }
        };

        //  axios.request(config)
        const response = await axios.request(config)
        for (let i = 0; i < response.data.userSkills.length; i++) {
          this.skills.push(response.data.userSkills[i].skill)
        }

      } catch (err) {
        console.log("error when get user skill data")
        console.log(err)
      }
    },
    async updateUser() {
      try {
        if(!this.user.last_name){
          this.user.last_name=""
        }
        if(!this.user.about_me){
          this.user.about_me=""
        }
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/users',
          headers: {token:this.token},
          data:this.user
        };
        

        // axios.request(config)
        const response = await axios.request(config)
 
        console.log('response update ')
        console.log(response)
       
      } catch (error) {
        console.log('error is')
        console.log(error)
        if (error.response.data.message) {
          console.log(typeof error.response.data.message)
          this.errorMessage = typeof error.response.data.message == 'object' ? error.response.data.message[0] : error.response.data.message; // Generic error message
        } else {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred. Please try again.'; // Generic error message
        }
      }
    },
    showMsgBoxTwo() {
            console.log('hello')
            this.boxTwo = ''
            this.$bvModal.msgBoxOk(' ویرایش اطلاعات شما با موفقیت انجام شد', {
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
                    this.$router.push('/profile');
                })
                .catch(err => {
                    // An error occurred
                })
        },
  }, components: {
    Sidebar
  },
  created() {
    this.getUserInfo()
    this.getUserSkills()
    this.getTags()
  }
};
</script>

<style scoped>
.edit-profile {
  background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
  /* Gradient background */
  min-height: 100vh;
  /* Full height */
  display: flex;
  align-items: center;
  justify-content: center;

}

.edit-form {
  max-width: 500px;
  /* Limit form width */
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  /* Semi-transparent white background */
  border-radius: 1.5rem;
  overflow: hidden;
  /* Hide overflow for rounded corners */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Smooth transition */
  margin-left: 65vh;
  margin-top: 5%;
}

.edit-form:hover {
  transform: translateY(-5px);
  /* Lift form on hover */
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
  /* Larger shadow on hover */
}

.edit-form h1 {
  color: #343a40;
  /* Dark heading color */
  font-size: 2.5rem;
  /* Larger font size */
}

.edit-form .form-group {
  margin-bottom: 2rem;
  /* Spacing between form groups */
}

.edit-form .form-group label {
  font-weight: bold;
  /* Bold labels */
  color: #495057;
  /* Dark label color */
}

.edit-form .form-group small {
  display: block;
  margin-top: 0.25rem;
  /* Small text below inputs */
  color: #6c757d;
  /* Light small text color */
}

.edit-form .btn-primary {
  background-color: #4CAF50;
  /* Green button color */
  border-color: #4CAF50;
  /* Green button border color */
  transition: background-color 0.3s ease, border-color 0.3s ease;
  /* Smooth transition */
}

.edit-form .btn-primary:hover {
  background-color: #45a049;
  /* Darker green on hover */
  border-color: #45a049;
  /* Darker green border on hover */
  transform: translateY(-2px);
  /* Move button up slightly on hover */
}

.edit-form .rounded-lg {
  border-radius: 1.5rem;
  /* Rounded corners */
}

.edit-form .text-muted {
  font-size: 0.9rem;
  /* Smaller font size for small text */
}

@media (max-width: 576px) {
  .edit-form {
    padding: 20px;
    /* Adjust padding on smaller screens */
  }
}
</style>