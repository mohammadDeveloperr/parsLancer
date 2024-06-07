<template>
  <div>
    <sidebar></sidebar>
    <div class="edit-profile">
      <b-container fluid class="py-5">
        <div class="edit-form bg-white shadow rounded-lg">
          <h1 class="text-center mb-4">Edit Profile</h1>
          <b-form @submit.prevent="saveProfile">
            <!-- Username Field -->
            <b-form-group label="Username">
              <b-form-input v-model="user.username" required autofocus></b-form-input>
            </b-form-group>
            <!-- Email Field -->
            <b-form-group label="Email">
              <b-form-input v-model="user.email" type="email" required></b-form-input>
            </b-form-group>
            <!-- Bio Field -->
            <b-form-group label="Bio">
              <b-form-textarea v-model="user.bio" rows="5"></b-form-textarea>
            </b-form-group>
            <!-- Skills Field -->
            <b-form-group label="Skills">
              <b-form-input v-model="user.skills" placeholder="Enter comma-separated skills"></b-form-input>
              <small class="text-muted">Separate skills with commas (e.g., HTML, CSS, JavaScript)</small>
            </b-form-group>
            <!-- Save Button -->
            <b-button type="submit" variant="primary" class="w-100 mt-4">
              <i class="fas fa-save mr-2"></i> Save Changes
            </b-button>
          </b-form>
        </div>
      </b-container>
    </div>

  </div>
</template>

<script>
import Sidebar from './sideBar.vue';

export default {
  name: 'EditProfile',
  data() {
    return {
      user: {
        username: '',
        email: '',
        bio: '',
        skills: ''
      },
     
    };
  },
  methods: {
    saveProfile() {
      // Save updated profile information (implement your save logic here)
      // For example, update user data in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(this.user));
      // Navigate back to profile page after saving
      this.$router.push('/');
    }
  }, components: {
    Sidebar
  },
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