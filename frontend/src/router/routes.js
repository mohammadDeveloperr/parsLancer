import test from '../components/test.vue';
import login from '../components/login.vue';
import register from '../components/register.vue';
import home from '../components/home.vue';
import dashboard from '../components/dashboard.vue';
import projects from '../components/projects.vue';
import project from '../components/project.vue';
import profile from '../components/profile.vue';
import editProfile from '../components/editProfile.vue';
import EmployerProject from '@/components/employerProject.vue';
import freelancerProject  from '../components/freelancerProject.vue';
import createProject  from '../components/createProject.vue';


export default [
    {path:'/test',component:test},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'/dashboard',component:dashboard},
    {path:'/project',component:projects},
    {path:'/project/:id',component:project},
    {path:'/profile',component:profile},
    {path:'/edit-profile',component:editProfile},
    {path:'/employer-project',component:EmployerProject},
    {path:'/freelancer-project',component:freelancerProject},
    {path:'/create-project',component:createProject},
    {path:'/',component:home},


]