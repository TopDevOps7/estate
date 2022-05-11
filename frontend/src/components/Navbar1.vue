<template>
    <div>
        <b-navbar class="container-fluid bg-white shadow cus_border font-weight-bold" toggleable="lg" type="light" variant="info" >
            <b-navbar-brand href="#">
                <img src="../../public/logo.jpg" class="img-fluid" width="">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="cus_nav_css ml-auto">
                <b-nav-item v-on:click="changeTItle" href="/task">Estate Tasks</b-nav-item>
                <b-nav-item v-on:click="changeTItle" href="/task">Estate Accounting</b-nav-item>
                <b-nav-item v-on:click="changeTItle" href="/task">Estate Details</b-nav-item>
                <b-nav-item v-on:click="changeTItle" href="/task">Distribution</b-nav-item>
                <b-nav-item v-on:click="changeTItle" href="/task">Closure</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                    <template #button-content>
                        <b style="color: black ">{{firstname}}  {{lastname}}</b><br>
                        <span style="font-size:14.5px">Estate of {{firstname}} {{lastname}}</span>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item v-on:click="signout" href="/">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
    data() {
        return {
            firstname: "",
            lastname: ""
        }
    },
    computed: {
        ...mapState('users', ['user'])
    },
    methods: {
        ...mapActions('users', ['signin', 'signout', 'changetitle']),
        handleSubmit() {
            const { username, password } = this;
            if (username && password) {
                this.signin({ username, password })
            }
        },
        signout() {
            localStorage.removeItem('user');
        },
        changeTItle(e) {
            this.changetitle(e.target.text)
        }
    },
    created() {
        if(localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user')).data;
            this.firstname = user.firstName
            this.lastname = user.lastName
        }
    }
}
</script>

<style scoped>
.cus_nav_css li {
    margin: 0 20px 0 20px;
}
</style>