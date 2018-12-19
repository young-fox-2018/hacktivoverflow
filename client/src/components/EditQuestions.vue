<template>
    <div>
        <div class="card">
          <div class="card-header" style="background-color: #00A5E2">
            <h5> What's your question? </h5>
          </div>
          <ul class="p-4">
                <form @submit.prevent="update" @reset="onReset">
                    <b-form-group
                    id="fieldset1"
                    description="Let others know your problems..."
                    label="Enter your question title"
                    label-for="input1"
                    >
                        <b-form-input id="input1" v-model="question.title"></b-form-input>
                    </b-form-group>
                    <b-form-group> 
                        <wysiwyg v-model="question.description" /> 
                    </b-form-group>
                    <b-form-group class="float-right"> 
                        <b-button type="submit" size="sm" variant="primary"> Post </b-button>
                        <b-button type="reset" class="ml-1" size="sm" variant="secondary"> Reset </b-button>
                    </b-form-group>
                </form>
          </ul>
        </div>
        
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import blogapi from '@/api/axios'

export default {
    name: 'addquestion',
    
    data () {
        return{
            question : {
                title: '',
                description: ''
            }
        }
    },
    created() {
        this.fetchQuestion()
    },
    methods:{
        fetchQuestion(){
            blogapi.get(`/questions/${this.$route.params.id}`)
            .then(({data}) => {
                this.question = data
                // console.log(this.comments)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        update(){
            let data = this.question
            blogapi.put(`/questions/${data._id}`, data,{
                headers : {
                    token : localStorage.getItem('token')
                }
            }) 
            .then(({ data }) => {
                console.log("data setelah update=====",data)
                this.$router.push('/')
            })
            .catch((err) => {
                console.log(err);
            });
        },
        onReset (evt) {
            evt.preventDefault();
            /* Reset our form values */
            this.question.title = ''
            this.question.description = ''
        }
    }
    
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>


