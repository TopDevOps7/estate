import { config } from '../../config.js';
import axios from 'axios';
import router from '../../router';

const state = {
	user: null,
	showNav: true,
	title: 'Estate of Tasks'
};

const getters = {
	username: (state) => state.username
};

const actions = {
	signup({ dispatch, commit }, user) {
		const baseURI = config.$backend_url + '/api/users/signup';
		axios.post(baseURI, user).then((response) => {
			if (!response.data) {
				alert("This user already signup")
			} else {
				commit('signupStatus', true);
				alert("Sign up successfully!");
				router.push('/signin');
			}
		}, (error) => {
			dispatch(error);
		});
	},
	signin({dispatch, commit}, user) {
		const baseURI = config.$backend_url + '/api/users/signin';
		axios.post(baseURI, user).then((response) => {
			if (response.data) {
				const userData = {isAuth: true, data: response.data}
				commit('setUser', userData);
				alert('Sign in successfully!');
				router.push('/');
			} else {
				alert('Please type email and password correctly!');
			}
		}, (error) => {
			dispatch(error);
		});
	},
	signout({commit}) {
		commit('resetSignin');
	},
	changetitle({commit}, text) {
		commit("change_title", text)
	}
};

const mutations = {
	setUser(state, user) {
		localStorage.setItem('user', JSON.stringify(user));
		state.user = user;
		state.showNav = true;
	},
	signupStatus(state, status) {
		state.signupStatus = status
	},
	resetSignin(state) {
		localStorage.removeItem('user');
		state.user = null;
		state.showNav = false;
	},
	change_title(state, text) {
		state.title = text;
	}
};

export const users =  {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
