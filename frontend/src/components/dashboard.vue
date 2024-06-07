


<template>
  <div>


    <!-- Hero Section with Animated Background -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="display-4 mb-4">Welcome to Our Platform</h1>
        <p class="lead">Find skilled freelancers or post your projects with ease.</p>
        <b-button variant="primary" size="lg" href="/register">Get Started</b-button>
      </div>
    </div>

    <!-- Features Section with Cards -->
    <section id="features" class="py-5">
      <div class="container">
        <h2 class="text-center mb-5">Features</h2>
        <div class="row">
          <div class="col-md-4 mb-4">
            <b-card class="text-center">
              <b-card-img src="https://via.placeholder.com/400x250?text=Connect+Freelancers" alt="Connect Freelancers"></b-card-img>
              <b-card-body>
                <h3 class="card-title">Connect with Freelancers</h3>
                <p class="card-text">Find skilled freelancers for your projects.</p>
              </b-card-body>
            </b-card>
          </div>
          <div class="col-md-4 mb-4">
            <b-card class="text-center">
              <b-card-img src="https://via.placeholder.com/400x250?text=Post+Projects" alt="Post Projects"></b-card-img>
              <b-card-body>
                <h3 class="card-title">Post Projects</h3>
                <p class="card-text">Browse projects and get hired by top employers.</p>
              </b-card-body>
            </b-card>
          </div>
          <div class="col-md-4 mb-4">
            <b-card class="text-center">
              <b-card-img src="https://via.placeholder.com/400x250?text=Secure+Communication" alt="Secure Communication"></b-card-img>
              <b-card-body>
                <h3 class="card-title">Secure Communication</h3>
                <p class="card-text">Chat and manage projects securely on our platform.</p>
              </b-card-body>
            </b-card>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section with Steps -->
    <section id="how-it-works" class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">How It Works</h2>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="step">
              <b-icon icon="pencil-square" font-scale="3" variant="primary"></b-icon>
              <h3>Create an Account</h3>
              <p>Sign up as a freelancer or employer.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="step">
              <b-icon icon="search" font-scale="3" variant="primary"></b-icon>
              <h3>Post or Find Projects</h3>
              <p>Employers post projects, freelancers bid on them.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="step">
              <b-icon icon="currency-dollar" font-scale="3" variant="primary"></b-icon>
              <h3>Get Work Done</h3>
              <p>Collaborate, complete projects, and get paid.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section with Carousel -->
    <section id="testimonials" class="py-5">
      <div class="container">
        <h2 class="text-center mb-5">Testimonials</h2>
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

    <!-- Contact Section with Form -->
    <section id="contact" class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Contact Us</h2>
        <p class="text-center">If you have any questions, feel free to reach out to us!</p>
        <b-form @submit.prevent="submitContactForm" class="mt-4">
          <b-row>
            <b-col md="6" offset-md="3">
              <b-form-group label="Name">
                <b-form-input v-model="contactForm.name" required></b-form-input>
              </b-form-group>
              <b-form-group label="Email">
                <b-form-input type="email" v-model="contactForm.email" required></b-form-input>
              </b-form-group>
              <b-form-group label="Message">
                <b-form-textarea v-model="contactForm.message" rows="5" required></b-form-textarea>
              </b-form-group>
              <b-button type="submit" variant="primary" class="btn-block">Submit</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </section>

    <!-- Footer -->
    <b-footer class="bg-dark text-white text-center py-3 mt-5">
      <p>&copy; 2024 Freelancer & Employer Platform. All rights reserved.</p>
    </b-footer>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name:"home",

  data() {
    return {
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
.hero-section {
  background: linear-gradient(to right, #3aafd0, #3aafa9);
  color: white;
  text-align: center;
  padding: 100px 0;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.step {
  text-align: center;
  margin-bottom: 30px;
}

.step b-icon {
  margin-bottom: 20px;
}

.card-title {
  margin-top: 15px;
}

blockquote {
  font-size: 1.5rem;
}

blockquote-footer {
  font-size: 1.2rem;
  color: #6c757d;
}
</style>
