import Vue from 'vue';
import Vuex from 'vuex';
import app from './store';
import {users} from './modules/users';
import {tasks} from './modules/task'

Vue.use(Vuex);

export const store = new Vuex.Store({
	debug: false,
	modules: {
		app,
		users,
		tasks
	}
});

export default store;
