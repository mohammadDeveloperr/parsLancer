<template>
  <div>
 
    <!-- Hero Section -->
    <b-container fluid class="hero-section text-white text-center hero-content">
      <b-row>
        <b-col class="mt-5">
          <h1 class="display-4 font-weight-bold mt-3">اتصال فریلنسرهای برتر با کارفرمایان پیشرو</h1>
          <p class="lead mt-5 pt-5 pb-4">بهترین استعدادها را برای پروژه خود یا شغل آزاد رویایی خود پیدا کنید.</p>
          <b-button variant="success" size="lg" class="mr-3 mt-5">استخدام بهترین فریلنسر ها</b-button>
          <b-button variant="warning" size="lg" class="mt-5">کسب درامد از فریلنسینگ</b-button>
        </b-col>
      </b-row>
    </b-container>
    <!-- How It Works Section -->
    <b-container fluid class="how-it-works py-5 bg-light">
      <b-row>
        <b-col class="text-center mb-5">
          <h2 class="display-4">پارسلنسر چگونه کار میکند</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" class="text-center ">
          <b-icon icon="person-plus" font-scale="4" variant="primary"></b-icon>
          <h3 class="mt-2">ثبت نام</h3>
          <p>اکانت خود را به سادگی بسازید</p>
        </b-col>
        <b-col md="4" class="text-center">
          <b-icon icon="search" font-scale="4" variant="primary"></b-icon>
          <!-- <b-icon icon="pencil" font-scale="4" variant="success"></b-icon> -->
          <h3 class="mt-2">ارسال یا یافتن پروژه ها</h3>
          <p>کارفرمایان پروژه ها را پست می کنند، فریلنسرها برای آنها پیشنهاد می دهند</p>
        </b-col>
        <b-col md="4" class="text-center">
          <b-icon icon="currency-dollar" font-scale="4" variant="primary"></b-icon>
          <h3 class="mt-2">کار را انجام دهید</h3>
          <p>همکاری کنید، پروژه ها را تکمیل کنید و پول دریافت کنید.</p>
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

        <!-- Call to Action Section -->
    <b-container fluid class="cta-section text-white text-center py-5">
      <b-row>
        <b-col>
          <h2 class="display-4 font-weight-bold mb-3"> ! امروز به انجمن ما بپیوندید </h2>
          <p class="lead mb-4">اکنون ثبت نام کنید و با فریلنسرها و کارفرمایان برتر ارتباط برقرار کنید</p>
          <b-button variant="success" size="lg" class="mr-3">ثبت نام</b-button>
          <b-button variant="warning" size="lg">بیشتر بدانید</b-button>
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
.hero-content {
  height: 600px;
    margin: 0 auto;
    max-height: 800px;
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
.cta-section {
  background: linear-gradient(45deg, #f57c00, #fbc02d);
  color: white;
  padding: 50px 0;
}
</style>
