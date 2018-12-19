<template>
    <div class="container border bg-dark p-2 text-success">
         <p v-if="form_add_question.succes" class="alert alert-success">
            <strong> Succes Add Qusetion! </strong>
            <button class="close" type="button" data-dismiss="alert">
                <span @click="clear">&times;</span>
            </button>
        </p>
        <p  v-if="form_add_question.error" class="alert alert-danger">{{ form_add_question.error}}
            <button class="close" type="button" data-dismiss="alert">
                <span @click="clear">&times;</span>
            </button>
        </p>
        <div class="form-group">
            <label class="display-5 font-weight-bold" >Title : </label>
            <input v-model="form_add_question.title" type="text" class="form-control" placeholder="title pertanyaan...">
        </div>
        <div class="form-group">
            <label class="display-5 font-weight-bold" >Description : </label>
            <textarea style="width: 100%" v-model="form_add_question.description" placeholder="description pertanyaan..."></textarea>
        </div>
        <div class="form-group">
            <label class="display-5 font-weight-bold" >Tags : </label>
            <vue-tags-input
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"/>
        </div>
        <button @click="add_question" type="submit" class="btn btn-primary mr-2">Submit</button>
        <button @click="clear" type="submit" class="btn btn-primary">Clear</button>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import VueTagsInput from '@johmun/vue-tags-input';
export default {
    components :{
        VueTagsInput
    },
    data(){
        return{
            form_add_question : {
                succes : '',
                error : '',
                title : '',
                description : ''
            },
            tags : [],
            tag : ''
        }
    },
    methods : {
        ...mapActions(['initializePertanyaan']),
        clear : function(){
            this.form_add_question.succes = ''
            this.form_add_question.error= ''
            this.form_add_question.title = ''
            this.form_add_question.description = ''
            this.tags = []
            this.tag = ''
        },
        add_question : function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/pertanyaan',
                headers : { jtoken : localStorage.getItem('token')},
                data : { title : this.form_add_question.title, description : this.form_add_question.description, tags : this.tags}
            })
            .then( ({ data }) => {
                this.clear()
                this.form_add_question.succes = 'Succes Add Question'
                this.initializePertanyaan()
            })
            .catch( ({response}) =>{
                this.form_add_question.error = response.data.message
            })
        }
    },
    created() {
        this.clear()
    }
    
}
</script>
