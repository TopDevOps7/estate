<template>
    <div class="container" id="login">
        <div class="row row justify-content-center">
            <div class="col-xs-12">
                <form name="login" @submit.prevent="handleSubmit" method="POST" class="box needs-validation" >
                    <h1 class="h3">Please sign in</h1>
                    <div class="form-group">
                        <label for="defaultFormLoginEmailEx" class="grey-text">User Name</label>
                        <b-form-input
                            type="email"
                            id="input-live"
                            v-model="username"
                            :state="nameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                            :va="username"
                            ></b-form-input>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="defaultFormLoginPasswordEx" class="grey-text">User Password</label>
                        <b-form-input
                            type="password"
                            id="input-live1"
                            v-model="password"
                            :state="passState"
                            aria-describedby="input-live1-help input-live1-feedback"
                            placeholder="Enter your name"
                            trim
                            :value="password"
                            ></b-form-input>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                        <!-- <b-form-input name="password" placeholder="Enter your password" v-model="password" type="password" class="form-control input is-rounded" dir="auto" value="Pass" required></b-form-input>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div> -->
                    </div>
                    <div class="form-group text-center mt-4">
                        <router-link to="/signup" class="btn btn-link float-left">Sign Up</router-link>
                        <input href="#" type="submit" class="btn btn-primary float-right" value="Sign In" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: "login",
    data() {
        return {
            username: "",
            password: "",
            isSubmit: false
        }
    },
    computed: {
        ...mapState('users', ['user']),
        nameState() {
            return this.isSubmit ? this.username.length > 0 ? true : false : null
        },
        passState() {
            return this.isSubmit ? this.password.length > 0 ? true : false : null
        }
    },
    created() {
        this.signout();
        // this.manageShowNav(localStorage.getItem('user'));
    },
    methods: {
        ...mapActions('users', ['signin', 'signout']),
        handleSubmit() {
            this.isSubmit = true;
            const { username, password } = this;
            if (username && password) {
                this.signin({ username, password })
            }
        }
    }
}

</script>

<style scoped>

#login form {
    margin-top: 60%;
    margin-bottom: 50%;
}
#login h1 {
    margin-bottom: 30px; 
}
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>