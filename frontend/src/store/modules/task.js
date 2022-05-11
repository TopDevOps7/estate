import { config } from '../../config.js';
import axios from 'axios';

const state = {
	tasks: [],
	status: null,
	rate: '{}',
	modalFlag: '',
	mode: 'all'
};

const actions = {
	addTask({dispatch, commit}, task) {
		const baseURI = config.$backend_url + '/api/task/add';
		axios.post(baseURI, task).then((response) => {
			alert(response.data ? "Insert successfully" : 'Taks is repeated.');
			commit('ChangeState', true);
		}, (error) => {
			dispatch(error);
		});
	},
    getList({dispatch, commit}, search) {
		const baseURI = config.$backend_url + '/api/task/list';
		var allLength = null;
		commit('ChangeMode', search.status)
		axios.post(baseURI, search).then((response) => {
			const oldsum = JSON.parse(this.state.tasks.rate).sum;
			var sum_complete = 0;
			var sum_pendding = 0;
			allLength = (search.status === "all") ?  response.data.resdata.length : oldsum;
			for(var j=0; j< response.data.resdata.length; j++ ) {
				if(response.data.resdata[j].status == 1) 
				sum_complete++;
				else 
				sum_pendding++;
			}
			
			// if(search.status === 'pending' && this.state.tasks.status) sum_complete = JSON.parse(this.state.tasks.rate).success + 1
			const rate = JSON.stringify({pendding: sum_pendding,success: sum_complete, sum: allLength})
			commit("GetRate", rate);
			commit('GetAll', response.data.resdata);
			commit('ChangeState', null);
			var statusArr = []
			for(var i in response.data.status) {
				statusArr[i] = (response.data.status[i] == 1) ? 'complete' : 'pending';
			}
			localStorage.setItem('status', statusArr)
		}, (error) => {
			dispatch(error);
		});
	},
	deleteTasks({dispatch, commit}, deletelist) {
		const baseURI = config.$backend_url + '/api/task/delete';
		axios.post(baseURI, deletelist).then(() => {
			alert( "Delete successfully.")
			commit('ChangeState', true);
		}, (error) => {
			dispatch(error);
		});
	},
	updateTask({commit, dispatch}, data) {
		const baseURI = config.$backend_url + '/api/task/update';
		axios.post(baseURI, data).then((response) => {
			alert(response.data.message)
			commit('ChangeState', true);
		}, (error) => {
			dispatch(error);
		});
	},
	setModalFlag({commit}, flag) {
		commit("SetModalFlag", flag);
	}
};

const mutations = {
	ChangeMode(state, mode) {
		state.mode = mode
	},
	ChangeState(state, isSuccess) {
		state.status = isSuccess;
	},
	GetAll(state, data) {
		state.tasks = data;
	},
	GetRate(state, rate) {
		state.rate = rate;
	},
	SetModalFlag(state, flag) {
		state.modalFlag = flag;
	}
};

export const tasks =  {
	namespaced: true,
	state,
	actions,
	mutations
};