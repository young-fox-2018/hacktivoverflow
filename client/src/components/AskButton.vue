<template>
    <div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
            Ask Question
        </button>   
        <!-- Modal -->
        <div class="text-left">
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Question</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                Title
                                <input  v-model="question.title" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label >Content</label>
                                <label for="comment">Your Question:</label>
                                <wysiwyg v-model="question.content" />
                            </div>
                            <button type="button" class="btn btn-primary" @click="createQuestion" data-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            question : {}
        }
    },
    methods : {
        createQuestion () {
            this.$store.dispatch('createQuestion', this.question) 
        }
    }
}
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
