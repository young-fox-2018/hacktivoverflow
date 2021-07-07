<template>
    <div style="position: fixed">
        <ul class="mt-2 sidebar">
            <li style="text-align: left"><router-link to="/" >Home</router-link></li>
            <li style="text-align: left"><router-link to="/tags" >Tags</router-link></li>
            <li style="text-align: left"><router-link to="/users">Users</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
}
</script>

<style>
ul.sidebar  {
   list-style: none;
   margin-left: 0;
   padding-left: 1em;
   text-indent: -1em;
   font-size: 13px;
   line-height: 23px;
}

a .router-link-exact-active .router-link-active{
    color: black !important;
    background-color: antiquewhite;
}
</style>


