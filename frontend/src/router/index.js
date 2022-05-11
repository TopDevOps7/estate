import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import SignIn from '../views/SignIn.vue';
import TaskManager from '../views/TaskManager.vue';
import Profile from '../views/Profile.vue';
import SignUp from '../views/SignUp.vue';
import "bootstrap";
const routes = [
	
	{
		path: '/',
		name: 'TaskManger',
		component: TaskManager
	},
	{
		path: '/signin',
		name: 'Signin',
		component: SignIn
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: SignUp
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile
	},
	{
		path: '*',
		name: 'TaskManger',
		component: TaskManager
	}
];
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});
router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/signin', '/signup'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');
	if (authRequired && !loggedIn) {
		return next('/signin');
	}

	next();
})
export default router;
