<template>
    <img src="../assets/loading.gif" :style="'width:' + width" />
</template>

<script>
    export default {
        name: 'Loading',
        props: ['width'],
    };
</script>