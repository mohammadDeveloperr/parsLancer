import test from '../components/test.vue';
import login from '../components/login.vue';
import register from '../components/register.vue';
import home from '../components/home.vue';
import dashboard from '../components/dashboard.vue';
import projects from '../components/projects.vue';
import project from '../components/project.vue';
import profile from '../components/profile.vue';
import freeLancerProfile from '../components/freeLancerProfile.vue';
import editProfile from '../components/editProfile.vue';
import editPassword from '../components/editPassword.vue';
import EmployerProject from '@/components/employerProject.vue';
import suggestProjects from '@/components/suggestProjects.vue';
import freelancerProject  from '../components/freelancerProject.vue';
import createProject  from '../components/createProject.vue';
import updateProject  from '../components/updateProject.vue';
import users  from '../components/users.vue';
import aboutUs  from '../components/aboutUs.vue';
import contactUs  from '../components/contactUs.vue';
import notFound  from '../components/notFound.vue';
import skill  from '../components/skill.vue';
import manageUsers  from '../components/manageUsers.vue';
import manageUser  from '../components/manageUser.vue';
import message  from '../components/message.vue';


export default [
    {path:'/test',component:test},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'/dashboard',component:dashboard},
    {path:'/project',component:projects},
    {path:'/project/:id',component:project},
    {path:'/profile',component:profile},
    {path:'/about',component:aboutUs},
    {path:'/contact',component:contactUs},
    {path:'/edit-profile',component:editProfile},
    {path:'/edit-password',component:editPassword},
    {path:'/employer-project',component:EmployerProject},
    {path:'/freelancer-project',component:freelancerProject},
    {path:'/suggest-project',component:suggestProjects},
    {path:'/create-project',component:createProject},
    {path:'/update-project/:id',component:updateProject},
    {path:'/user',component:users},
    {path:'/admin/skill',component:skill},
    {path:'/admin/users',component:manageUsers},
    {path:'/admin/edit-user/:username',component:manageUser},
    {path:'/profile/:username',component:freeLancerProfile},
    {path:'/message/:suggestId',component:message},
    {path:'/',component:home},
    {path:'*',component:notFound},


]