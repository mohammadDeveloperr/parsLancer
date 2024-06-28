<template>
    <div class="not-found">
      <div class="error-container">
        <h1 class="error-code">404</h1>
        <p class="error-message">اوه ! صفحه درخواستی شما پیدا نشد</p>
        <router-link to="/" class="btn btn-primary">برگشت به خانه</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  };
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #3498db, #8e44ad); /* Gradient from blue to purple */
  }
  
  .error-container {
    text-align: center;
    color: #fff; /* White text color */
    font-family: 'Arial', sans-serif;
  }
  
  .error-code {
    font-size: 8rem;
    margin-bottom: 20px;
  }
  
  .error-message {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .btn {
    font-size: 1.5rem;
    padding: 12px 24px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3); /* Semi-transparent white background */
    color: #fff; /* White text color */
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: rgba(255, 255, 255, 0.5); /* Lighter semi-transparent white on hover */
  }
  </style>
  