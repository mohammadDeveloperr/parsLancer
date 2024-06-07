import test from '../components/test.vue';
import login from '../components/login.vue';
import register from '../components/register.vue';
import home from '../components/home.vue';
import dashboard from '../components/dashboard.vue';
import projects from '../components/projects.vue';
import project from '../components/project.vue';


export default [
    {path:'/test',component:test},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'/dashboard',component:dashboard},
    {path:'/project',component:projects},
    {path:'/project/:id',component:project},
    {path:'/',component:home},


]