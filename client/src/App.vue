<template>
    <div id="app">
        <Header />
        <div class="row p-4">
            <div class="col-4"><LeftBar /></div>
            <div class="col-8"><router-view /></div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import Header from '@/components/headers/Header.vue';
    import Footer from '@/components/footers/Footer.vue';
    import LeftBar from '@/components/bodies/LeftBar.vue';
    
    export default {
        name: 'app',
        components: {
            Header, Footer, LeftBar
        },
    };
</script>