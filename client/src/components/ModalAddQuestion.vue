<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        Add Question
                    </div>

                    <div class="modal-body">
                        <input type="text" class="form-control mb-2" placeholder="Title" v-model="title" />
                        <vue-tags-input
                            class="mb-2"
                            v-model="tag"
                            :tags="tags"
                            @tags-changed="newTags => tags = newTags"
                        />
                        <wysiwyg v-model="content" />
                    </div>

                    <div class="modal-footer">
                        <Loading width="30px" v-if="loading" />
                        <button @click="saveQuestion" class="btn btn-outline-warning btn-sm">Save</button>
                        <button @click="$emit('close')" class="btn btn-outline-warning btn-sm">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Loading from '@/components/Loading.vue';
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    import VueTagsInput from '@johmun/vue-tags-input'; // http://www.vue-tags-input.com
    
    export default {
        name: 'ModalAddQuestion',
        data() {
            return {
                title: '',
                tags: [],
                content: '',
                loading: false,
                tag: '',
            };
        },
        components: {
            Loading, VueTagsInput,
        },
        methods: {
            saveQuestion() {
                this.loading = true;
                apiHacktiv.post(`/questions`,
                    {
                        title: this.title,
                        tags: this.tags,
                        content: this.content,
                    },
                    {
                        headers: {
                            token: localStorage.getItem('token-hacktiv'),
                        },
                    }
                )
                    .then(result => {
                        this.$store.dispatch('getAllQuestion');
                        this.$emit('close');
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error.response.data);
                    });
            },
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