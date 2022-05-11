<template>
    <div class="container" id="signup">
        <div class="row row justify-content-center">
            <div class="col-xs-12 bg-whtie">
                <form name="signup" @submit.prevent="handleSubmit" method="POST" class="box needs-validation">
                    <h1 class="h3">Please sign up</h1>
                    <div class="form-group">
                        <label for="defaultFormsignupEmailEx" class="grey-text">Fist Name</label>
                        <b-form-input
                            type="text"
                            v-model="firstName"
                            :state="firstnameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                            ></b-form-input>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-group">
                        <label for="defaultFormsignupEmailEx" class="grey-text">Last Name</label>
                        <b-form-input
                            type="text"
                            v-model="lastName"
                            :state="lastnameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                            ></b-form-input>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-group">
                        <label for="defaultFormsignupEmailEx" class="grey-text">User name</label>
                        <!-- <input name="email" v-model="email" type="email" id="defaultFormsignupEmailEx" class="form-control input is-rounded" dir="auto" required /> -->
                        <b-form-input
                            type="email"
                            v-model="userName"
                            :state="usernameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your user name"
                            trim
                            ></b-form-input>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-group">
                        <label for="defaultFormsignupPasswordEx" class="grey-text">Password</label>
                        <!-- <input name="password" v-model="password" type="password" class="form-control input is-rounded" dir="auto" required /> -->
                        <b-form-input
                            type="password"
                            v-model="password"
                            :state="passwordState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your user name"
                            trim
                            ></b-form-input>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="form-group">
                        <label for="defaultFormsignupPasswordEx" class="grey-text">Confirm password</label>
                        <!-- <input name="confirm_password" v-model="password" type="password" class="form-control input is-rounded" dir="auto" required /> -->
                        <b-form-input
                            type="password"
                            v-model="confpassword"
                            :state="confpasswordState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your user name"
                            trim
                            ></b-form-input>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="text-center mt-4">
                        <router-link to="/signin" class="btn btn-link float-left">Sign In</router-link>
                        <input href="#" type="submit" class="btn btn-primary float-right" value="signup" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import { config } from '../config.js';
import { mapState, mapActions } from 'vuex'
export default {
    name: "signup",
    data() {
        return {
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            confpassword: "",
            isSubmit: false
        }
    },
    computed: {
        ...mapState('users', ['signupStatus']),
        firstnameState() {
            return this.isSubmit ? this.firstName.length > 0 ? true : false : null
        },
        lastnameState() {
             return this.isSubmit ? this.lastName.length > 0 ? true : false : null
        },
        usernameState() {
             return this.isSubmit ? this.userName.length > 0 ? true : false : null
        },
        passwordState() {
             return this.isSubmit ? this.password.length > 0 && this.password === this.confpassword ? true : false : null
        },
        confpasswordState() {
             return this.isSubmit ?  this.confpassword.length > 0 && this.confpassword == this.password ? true : false : null
        },
    },
    methods: {
        ...mapActions('users', ['signup']),
        
        handleSubmit () {
            this.isSubmit = true;
            const { firstName, lastName, userName, password } = this;
            if (this.firstnameState && this.lastnameState && this.usernameState && this.passwordState && this.confpasswordState)
                this.signup({ firstName, lastName, userName, password })
        }
    },
}
</script>

<style scoped>

#signup form {
    margin-top: 60%;
    margin-bottom: 50%;
}
#signup h1 {
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