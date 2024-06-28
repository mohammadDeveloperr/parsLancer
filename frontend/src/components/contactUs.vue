<template>
    <b-container fluid class="contact-us py-5">
      <b-row>
        <b-col md="8" class="mx-auto text-center">
          <h2 class="display-4 mb-4 text-primary">ارتباط با ما</h2>
          <p class="lead text-secondary">
            ما امیدواریم که از تو خبری بشنویم! لطفاً  از طریق اطلاعات تماس ارائه شده با ما در ارتباط باشید.
          </p>
          <hr class="my-4">
          <b-row class="text-center mb-4">
            <b-col md="4">
              <h5 class="text-primary">شماره همراه</h5>
              <p class="text-muted">09944985072</p>
            </b-col>
            <b-col md="4">
              <h5 class="text-primary">ایمیل</h5>
              <p class="text-muted">mohammadmojaver39@gmail.com</p>
            </b-col>
            <b-col md="4">
              <h5 class="text-primary">ادرس</h5>
              <p class="text-muted">فرامرز عباسی 26 پلاک 365</p>
            </b-col>
          </b-row>
        
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  export default {
    name: 'ContactUs',
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      onSubmit() {
        // Handle form submission
        alert(`Thank you ${this.form.name}. Your message has been sent!`);
        // Clear the form
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .contact-us {
    margin:10% 0 10%;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  h2 {
    color: #007bff;
  }
  p.lead {
    font-size: 1.25rem;
    color: #6c757d;
  }
  hr {
    border-color: #dee2e6;
  }
  p.text-muted {
    color: #6c757d;
  }
  </style>
  