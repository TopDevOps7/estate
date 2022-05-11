<template>
  <b-navbar class="bg-white shadow cus_border font-weight-bold" toggleable="lg" type="light" variant="info">
      <b-navbar-brand to="/">
        <img src="../../public/logo.jpg" class="img-fluid" width="">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav>
          <!-- <b-nav-item to="/samples">Samples</b-nav-item>           -->
          <b-nav-item to="/task">Task Manager</b-nav-item>          
              
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>Leonard Wolters</em>
            </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/signin">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { config } from '../config.js';
export default {
    name: "navbar",
    data() {
      return {
        signOut_URL: config.$signout_url()
      }
    },
    
}
</script>
<style>
.cus_border {
  border-radius: 3px;
  padding-left: 20%;
  padding-left: 20%;
}
</style>