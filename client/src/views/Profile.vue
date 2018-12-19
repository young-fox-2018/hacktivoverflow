<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <h5><b>{{ dataUser.name }}</b></h5>
                    </div>

                    <div class="modal-body">
                        <Loading v-if="loading" />
                        <div class="card m-3 p-5">
                            <div class="row">
                                <div class="col-4">
                                    <img :src="'http://localhost:3000/'+dataUser.image" class="img-fluid img-thumbnail" style="width: 100%; height: auto;" />
                                </div>
                                <div class="col-8">
                                    <table cellpadding="5">
                                        <tr>
                                            <td valign="top">Email</td>
                                            <td valign="top">:</td>
                                            <td valign="top">{{ dataUser.email }}</td>
                                        </tr>
                                        <tr>
                                            <td valign="top">Popularity</td>
                                            <td valign="top">:</td>
                                            <td valign="top">{{ dataUser.popularity }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button @click="$router.go(-1)" class="btn btn-outline-warning btn-sm">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    import Loading from '@/components/Loading.vue';
    
    export default {
        name: 'Profile',
        data() {
            return {
                loading: false,
                dataUser: {},
            };
        },
        components: {
            Loading,
        },
        created() {
            this.loading = true;
            apiHacktiv.get(`/users/${this.$route.params.userId}`)
                .then(result => {
                    this.dataUser = result.data;
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
</script>

<style scoped>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
    
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        max-width: 90%;
        height: 90%;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        overflow-y: auto;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container, .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>