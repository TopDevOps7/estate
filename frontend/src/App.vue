<template>
    <div id="app">
        <navbar v-if="showNav"/>
        <router-view  />
    </div>
</template>

<script>
import Navbar from './components/Navbar1.vue';
import { mapActions, mapState } from "vuex";
export default {
    name: 'App',
    components: {
        Navbar
    },
    computed: {
        ...mapState('users', ['user','showNav']),
    },
    methods: {
        ...mapActions('users', ['signout'])
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-bottom: 30%;
}
</style>
