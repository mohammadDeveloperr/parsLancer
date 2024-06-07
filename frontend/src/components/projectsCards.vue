<template>
    <div id="projectPage">
     
        <!-- Project List -->
        <b-container fluid class="project-list my-5">
            <b-row justify="center">
                <b-col lg="8" md="10">
                    <b-card v-for="project in filteredProjects" :key="project.id" class="mb-4 project-card">
                        <b-card-body class="text-right">
                            <b-card-title>{{ project.title }}</b-card-title>
                            <b-card-text>{{ project.explain.slice(0,50) }}</b-card-text>
                            <div class="d-flex justify-content-between align-items-center mt-3" dir="rtl">
                                <small class="text-muted mt-2">تاریخ : {{ project.createdAt.slice(0,10) }}</small>
                            </div>

                            <div class="d-flex justify-content-between align-items-center mt-3" dir="rtl">
                                <div>
                                    <span class="text-muted mr-2">هزینه:</span>
                                    <span>{{ project.minPrice }} ریال</span>
                                </div>
                                <b-button class="mt-5" variant="success" @click="viewProject(project.id)">مشاهده پروژه</b-button>


                            </div>
                            <div>
                                <!-- <b-badge v-for="skill in project.skills" :key="skill" variant="primary" class="mr-1">{{
                                    skill }}</b-badge> -->
                            </div>
                            <br>
                            <small class="text-muted mt-5 text-dark">  وضعیت پروژه :
                                 <span style="color: green" v-if="project.status=='pending'">باز </span>
                                 <span style="color: red" v-else>بسته</span>
                                
                                </small>

                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProjectList',
    data() {
        return {
            searchQuery: '',
            projects: [
                {
                    id: 1,
                    title: 'Web Development',
                    description: 'Building a modern and responsive website for a new startup company.',
                    skills: ['Web Design', 'UI/UX', 'HTML', 'CSS'],
                    price: 1500,
                    posted: '2 days ago',
                }
            ],
        };
    },
    props:{query:{}},
    computed: {
        filteredProjects() {
            if (!this.searchQuery) {
                return this.projects;
            }
            const normalizedQuery = this.searchQuery.toLowerCase().trim();
            return this.projects.filter(project =>
                project.title.toLowerCase().includes(normalizedQuery) ||
                project.description.toLowerCase().includes(normalizedQuery)
            );
        },
    },
    created(){
        this.fetchProject()
    },
    methods: {
        async fetchProject(){
            try {
    
                let config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3000/project',
                    headers: {},
                    params: this.query
                };
                console.log('this is config')
                console.log(config)

                // axios.request(config)
                const response = await axios.request(config)
                console.log('response is ')
                console.log(response.data.projects)
                this.projects=response.data.projects
            } catch (err) {
                console.log(err)
                this.projects=[]
            }
          
        },
        viewProject(id) {
            // Navigate to project details page
            console.log('in linking')
            this.$router.push(`/project/${id}`);
        },
        searchProjects() {
            // Optional: Implement server-side or local filtering logic
        },
    },
};
</script>

<style scoped>
#projectPage {
    margin-top: 10%
}

.page-header {
    background-color: #f5f5f5;
    padding: 20px 0;
}

.search-box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.project-list {
    margin-left: 16%;
    padding: 0 15px;
}

.project-card {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.b-card-body {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.b-card-title {
    color: #343a40;
    font-size: 1.2rem;
    font-weight: bold;
}

.b-card-text {
    color: #6c757d;
}

.b-badge {
    background-color: #007bff;
    color: #ffffff;
    padding: 0.3rem 0.75rem;
    font-size: 0.9rem;
}

.b-button {
    background-color: #28a745;
    border-color: #28a745;
    color: #ffffff;
}

.b-button:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.text-muted {
    color: #6c757d;
}
</style>