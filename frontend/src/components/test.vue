<template>
    <v-app>
      <!-- Navigation Bar -->
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Freelancer Platform</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/how-it-works">How It Works</v-btn>
        <v-btn text to="/jobs">Browse Jobs</v-btn>
        <v-btn text to="/post-job">Post a Job</v-btn>
        <v-btn text to="/about">About Us</v-btn>
        <v-btn text to="/contact">Contact</v-btn>
        <v-btn color="secondary" class="ml-2">Login</v-btn>
        <v-btn color="secondary" class="ml-2">Sign Up</v-btn>
      </v-app-bar>
  
      <!-- Hero Section -->
      <v-container fluid class="hero-section">
        <v-layout align-center justify-center>
          <v-flex text-center>
            <h1 class="display-2 font-weight-bold mb-3">Connecting Top Freelancers with Leading Employers</h1>
            <p class="subheadline mb-4">Find the best talent for your project or your dream freelance job.</p>
            <v-btn color="green" large class="mr-3">Hire a Freelancer</v-btn>
            <v-btn color="orange" large>Find a Job</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
  
      <!-- Featured Section -->
      <v-container fluid class="featured-section">
        <v-carousel>
          <v-carousel-item v-for="item in featuredItems" :key="item.id">
            <v-sheet color="primary" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <v-col class="text-center">
                  <h2 class="display-2">{{ item.title }}</h2>
                  <p class="subheadline">{{ item.description }}</p>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
  
      <!-- How It Works Section -->
      <v-container fluid class="how-it-works">
        <v-row>
          <v-col cols="12" class="text-center mb-5">
            <h2 class="display-2">How It Works</h2>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon large color="blue">mdi-account-plus</v-icon>
            <h3 class="mt-2">Sign Up</h3>
            <p>Create your account easily and start your journey.</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon large color="green">mdi-pencil</v-icon>
            <h3 class="mt-2">Create Profile/Job Post</h3>
            <p>Detail your profile or job posting to attract the best matches.</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon large color="orange">mdi-handshake</v-icon>
            <h3 class="mt-2">Connect & Collaborate</h3>
            <p>Engage with freelancers or employers and start working together.</p>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Categories Section -->
      <v-container fluid class="categories-section">
        <v-row>
          <v-col cols="12" class="text-center mb-5">
            <h2 class="display-2">Job Categories</h2>
          </v-col>
          <v-col cols="12" md="4" v-for="category in categories" :key="category.id" class="text-center">
            <v-card class="category-card" :color="category.color" dark>
              <v-card-title>{{ category.name }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Testimonials Section -->
      <v-container fluid class="testimonials">
        <v-row>
          <v-col cols="12" class="text-center mb-5">
            <h2 class="display-2">Testimonials</h2>
          </v-col>
          <v-col cols="12" md="4" v-for="testimonial in testimonials" :key="testimonial.id" class="text-center">
            <v-card>
              <v-card-text>
                <p>"{{ testimonial.quote }}"</p>
                <v-rating :value="testimonial.rating" readonly></v-rating>
                <p class="mt-2">- {{ testimonial.name }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  
      <!-- Footer -->
      <v-footer color="primary" app>
        <v-col class="text-center white--text">&copy; {{ new Date().getFullYear() }} Freelancer Platform</v-col>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    /* eslint-disable */

    name: 'Home',
    data() {
      return {
        featuredItems: [
          { id: 1, title: 'Success Story 1', description: 'Description of success story 1' },
          { id: 2, title: 'Success Story 2', description: 'Description of success story 2' },
          { id: 3, title: 'Success Story 3', description: 'Description of success story 3' },
        ],
        categories: [
          { id: 1, name: 'Design', color: 'red' },
          { id: 2, name: 'Writing', color: 'blue' },
          { id: 3, name: 'Programming', color: 'green' },
        ],
        testimonials: [
          { id: 1, quote: 'Great platform!', rating: 5, name: 'User 1' },
          { id: 2, quote: 'Found my dream job here!', rating: 4, name: 'User 2' },
          { id: 3, quote: 'Highly recommend!', rating: 5, name: 'User 3' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .hero-section {
    background: linear-gradient(45deg, #42a5f5, #ab47bc);
    color: white;
    padding: 100px 0;
  }
  .subheadline {
    font-size: 1.25rem;
  }
  .featured-section {
    margin: 50px 0;
  }
  .how-it-works {
    background: #f5f5f5;
    padding: 50px 0;
  }
  .categories-section {
    padding: 50px 0;
  }
  .category-card {
    height: 150px;
  }
  .testimonials {
    background: #e0e0e0;
    padding: 50px 0;
  }
  </style>
  