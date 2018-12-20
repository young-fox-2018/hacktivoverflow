<template>
  <div class="row-fluid border-top" id="footer">
    <footer class="page-footer font-small blue bg-light">
      <div class="footer-copyright text-center py-3">© 2018 Copyright:
        <a href="https://hacktiv8.com/"> HacktivOverflow</a>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style>

#footer {
    position: fixed;
    height: 4%;
    margin-bottom: 25px;
    bottom: 0;
    width: 100%;
}
a {
  color: coral
}
</style>
