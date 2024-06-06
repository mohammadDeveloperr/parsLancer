<template>
    <div>
  
      <!-- Hero Section with Carousel -->
      <b-carousel id="carousel" v-model="slide" :interval="4000" controls indicators background="#3aafa9">
        <b-carousel-slide v-for="(slide, index) in slides" :key="index" :img-src="slide.imgSrc">
          <h1 class="carousel-caption">{{ slide.title }}</h1>
          <p class="carousel-caption">{{ slide.subtitle }}</p>
        </b-carousel-slide>
      </b-carousel>
  
      <!-- Features Section -->
      <section id="features" class="py-5 text-center" style="background-color: #f8f9fa;">
        <div class="container">
          <h2>Features</h2>
          <div class="row">
            <div class="col-md-4">
              <b-icon icon="people-fill" font-scale="3" variant="info"></b-icon>
              <h3>Connect with Freelancers</h3>
              <p>Find skilled freelancers for your projects.</p>
            </div>
            <div class="col-md-4">
              <b-icon icon="briefcase-fill" font-scale="3" variant="info"></b-icon>
              <h3>Find Projects</h3>
              <p>Browse projects and get hired by top employers.</p>
            </div>
            <div class="col-md-4">
              <b-icon icon="chat-dots-fill" font-scale="3" variant="info"></b-icon>
              <h3>Secure Communication</h3>
              <p>Chat and manage projects securely on our platform.</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- How It Works Section -->
      <section id="how-it-works" class="py-5 text-center" style="background-color: #e9ecef;">
        <div class="container">
          <h2>How It Works</h2>
          <div class="row">
            <div class="col-md-4">
              <b-icon icon="pencil-square" font-scale="3" variant="info"></b-icon>
              <h3>Create an Account</h3>
              <p>Sign up as a freelancer or employer.</p>
            </div>
            <div class="col-md-4">
              <b-icon icon="search" font-scale="3" variant="info"></b-icon>
              <h3>Post or Find Projects</h3>
              <p>Employers post projects, freelancers bid on them.</p>
            </div>
            <div class="col-md-4">
              <b-icon icon="currency-dollar" font-scale="3" variant="info"></b-icon>
              <h3>Get Work Done</h3>
              <p>Collaborate, complete projects, and get paid.</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section id="testimonials" class="py-5 text-center" style="background-color: #dee2e6;">
        <div class="container">
          <h2>Testimonials</h2>
          <b-carousel id="testimonial-carousel" v-model="testimonialSlide" :interval="5000" background="#f5f5f5">
            <b-carousel-slide v-for="(testimonial, index) in testimonials" :key="index">
              <blockquote class="blockquote">
                <p class="mb-0">{{ testimonial.quote }}</p>
                <footer class="blockquote-footer">{{ testimonial.author }}</footer>
              </blockquote>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </section>
  
      <!-- Contact Section -->
      <section id="contact" class="py-5 text-center" style="background-color: #f8f9fa;">
        <div class="container">
          <h2>Contact Us</h2>
          <p>If you have any questions, feel free to reach out to us!</p>
          <b-form @submit.prevent="submitContactForm">
            <b-form-group label="Name">
              <b-form-input v-model="contactForm.name" required></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
              <b-form-input type="email" v-model="contactForm.email" required></b-form-input>
            </b-form-group>
            <b-form-group label="Message">
              <b-form-textarea v-model="contactForm.message" required></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="info">Submit</b-button>
          </b-form>
        </div>
      </section>
  
      <!-- Footer -->
      <b-footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Freelancer & Employer Platform. All rights reserved.</p>
      </b-footer>
    </div>
  </template>
  
  <script>
  /* eslint-disable */

  export default {
    name:"dashboard",
    data() {
      return {
        slide: 0,
        slides: [
          {
            imgSrc: 'https://via.placeholder.com/1200x400?text=Find+Freelancers',
            title: 'Find the Best Freelancers',
            subtitle: 'Connect with skilled professionals for your projects.'
          },
          {
            imgSrc: 'https://via.placeholder.com/1200x400?text=Post+Projects',
            title: 'Post Your Projects',
            subtitle: 'Get bids from talented freelancers.'
          },
          {
            imgSrc: 'https://via.placeholder.com/1200x400?text=Secure+Payment',
            title: 'Secure Payment System',
            subtitle: 'Ensure safe and secure transactions.'
          }
        ],
        testimonialSlide: 0,
        testimonials: [
          {
            quote: 'This platform helped me find the best freelancers for my projects.',
            author: 'John Doe, CEO'
          },
          {
            quote: 'As a freelancer, I found amazing clients and projects here.',
            author: 'Jane Smith, Freelancer'
          },
          {
            quote: 'Great user experience and reliable service.',
            author: 'Sam Wilson, Project Manager'
          }
        ],
        contactForm: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      submitContactForm() {
        // Handle contact form submission
        console.log('Contact form submitted:', this.contactForm);
        alert('Thank you for reaching out!');
        this.contactForm.name = '';
        this.contactForm.email = '';
        this.contactForm.message = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .carousel-caption {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
  }
  
  h2 {
    margin-bottom: 30px;
  }
  
  .section {
    padding: 60px 0;
  }
  
  .b-footer {
    margin-top: 30px;
  }
  
  blockquote {
    font-size: 1.25rem;
  }
  
  blockquote-footer {
    font-size: 1rem;
    color: #6c757d;
  }
  </style>
  