<template>
  <div class="row-fluid border-bottom">
    <nav class="navbar navbar-expand-lg bg-light justify-content-end">
      <router-link to="/">
        <img id="navbarIcon" src="../assets/hacktivOverflow.png" alt="">
      </router-link>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/signin"> Sign In </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signup"> Sign Up </router-link>
        </li>
        <li class="nav-item">

        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style>
.nav-item {
  margin-right: 20px;
}
#navbarIcon {
  max-height: 30px;
  margin-bottom: 2%
}
.navbar-brand {
  color: darkgrey
}
.nav-item {
  color: darkgrey;
  font-size: 20px;
  align-self: flex-end;
  text-emphasis-color: green
}
a {
  color: silver;
}
</style>

