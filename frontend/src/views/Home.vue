<template>
    <div>
        <h1>Home</h1>
        <span v-show="loggedInStatus">You are already loggin in. Go to <a v-bind:href="samples_URL">samples ready for interpretation. </a></span>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            loggedInStatus: "",
            samples_URL: "/samples"
        }
    },
    computed: {
        ...mapState('users', ['user'])
    },
    created: function() {
        if (localStorage.getItem('user')) {
            this.manageShowNav(localStorage.getItem('user'));
        }
    },
    methods: {
        ...mapActions('users', ['manageShowNav'])
    },
    
}


</script>
<style lang="scss" scoped>
</style>

