<template>
  <div>
    <div class="container">
      <h1 class="my-4">Projects</h1>
      <div class="row">
        <div v-for="(project, index) in paginatedProjects" :key="index" class="col-md-4 mb-4">
          <b-card :title="project.title">
            <p>{{ project.description }}</p>
            <b-button variant="primary">View Details</b-button>
          </b-card>
        </div>
      </div>
      <b-pagination v-model="currentPage" :total-rows="totalProjects" :per-page="perPage" aria-controls="projects"
        class="my-4"></b-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'test',
  data() {
    return {
      currentPage: 1,
      perPage: 6,
      projects: [
        { title: 'Project 1', description: 'Description 1' },
        { title: 'Project 2', description: 'Description 2' },
        { title: 'Project 3', description: 'Description 3' },
        { title: 'Project 4', description: 'Description 4' },
        { title: 'Project 5', description: 'Description 5' },
        { title: 'Project 6', description: 'Description 6' },
        { title: 'Project 7', description: 'Description 7' },
        { title: 'Project 8', description: 'Description 8' },
        { title: 'Project 9', description: 'Description 9' },
        { title: 'Project 10', description: 'Description 10' },
        { title: 'Project 11', description: 'Description 11' },
        { title: 'Project 12', description: 'Description 12' },
      ],
    };
  },
  computed: {
    totalProjects() {
      return this.projects.length;
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.projects.slice(start, end);
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
