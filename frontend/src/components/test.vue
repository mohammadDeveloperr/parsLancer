<template>
  <div>
    <!-- Navigation Bar -->
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">Freelancer Platform</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>
          <b-nav-item href="#">How It Works</b-nav-item>
          <b-nav-item href="#">Browse Jobs</b-nav-item>
          <b-nav-item href="#">Post a Job</b-nav-item>
          <b-nav-item href="#">About Us</b-nav-item>
          <b-nav-item href="#">Contact</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" class="btn btn-secondary">Login</b-nav-item>
          <b-nav-item href="#" class="btn btn-secondary">Sign Up</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Hero Section -->
    <b-container fluid class="hero-section text-white text-center">
      <b-row>
        <b-col>
          <h1 class="display-4 font-weight-bold mb-3">Connecting Top Freelancers with Leading Employers</h1>
          <p class="lead mb-4">Find the best talent for your project or your dream freelance job.</p>
          <b-button variant="success" size="lg" class="mr-3">Hire a Freelancer</b-button>
          <b-button variant="warning" size="lg">Find a Job</b-button>
        </b-col>
      </b-row>
    </b-container>

    <!-- Featured Section -->
    <b-container fluid class="featured-section my-5">
      <b-row>
        <b-col class="text-center mb-5">
          <h2 class="display-4">Featured Stories</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-carousel id="carousel-1" controls indicators background="#ababab" style="text-shadow: 1px 1px 2px #333;">
          <b-carousel-slide v-for="item in featuredItems" :key="item.id" :caption="item.title" :text="item.description">
            <img class="d-block w-100" :src="item.image" alt="slide image">
          </b-carousel-slide>
        </b-carousel>
      </b-row>
    </b-container>

    <!-- How It Works Section -->
    <b-container fluid class="how-it-works py-5 bg-light">
      <b-row>
        <b-col class="text-center mb-5">
          <h2 class="display-4">How It Works</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" class="text-center">
          <b-icon icon="person-plus" font-scale="4" variant="primary"></b-icon>
          <h3 class="mt-2">Sign Up</h3>
          <p>Create your account easily and start your journey.</p>
        </b-col>
        <b-col md="4" class="text-center">
          <b-icon icon="pencil" font-scale="4" variant="success"></b-icon>
          <h3 class="mt-2">Create Profile/Job Post</h3>
          <p>Detail your profile or job posting to attract the best matches.</p>
        </b-col>
        <b-col md="4" class="text-center">
          <b-icon icon="handshake" font-scale="4" variant="warning"></b-icon>
          <h3 class="mt-2">Connect & Collaborate</h3>
          <p>Engage with freelancers or employers and start working together.</p>
        </b-col>
      </b-row>
    </b-container>

    <!-- Categories Section -->
    <b-container fluid class="categories-section py-5">
      <b-row>
        <b-col class="text-center mb-5">
          <h2 class="display-4">Job Categories</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" v-for="category in categories" :key="category.id" class="text-center mb-3">
          <b-card :bg-variant="category.color" text-variant="white" class="category-card">
            <b-card-text>{{ category.name }}</b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Testimonials Section -->
    <b-container fluid class="testimonials py-5 bg-light">
      <b-row>
        <b-col class="text-center mb-5">
          <h2 class="display-4">Testimonials</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" v-for="testimonial in testimonials" :key="testimonial.id" class="text-center mb-3">
          <b-card>
            <b-card-text>
              <p>"{{ testimonial.quote }}"</p>
              <b-icon icon="star-fill" font-scale="1.5" v-for="n in testimonial.rating" :key="n"></b-icon>
              <p class="mt-2">- {{ testimonial.name }}</p>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- Footer -->
    <b-footer class="footer bg-primary text-white text-center py-3">
      &copy; {{ new Date().getFullYear() }} Freelancer Platform
    </b-footer>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'Home',
  data() {
    return {
      featuredItems: [
        { id: 1, title: 'Success Story 1', description: 'Description of success story 1', image: 'https://via.placeholder.com/800x400' },
        { id: 2, title: 'Success Story 2', description: 'Description of success story 2', image: 'https://via.placeholder.com/800x400' },
        { id: 3, title: 'Success Story 3', description: 'Description of success story 3', image: 'https://via.placeholder.com/800x400' },
      ],
      categories: [
        { id: 1, name: 'Design', color: 'danger' },
        { id: 2, name: 'Writing', color: 'primary' },
        { id: 3, name: 'Programming', color: 'success' },
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
