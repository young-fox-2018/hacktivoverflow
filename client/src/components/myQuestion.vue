<template>
    <div>
        <h2>My Questions</h2>
        <br>
        <hr>
        <b-row>
            <b-col cols="4"><h5>Title</h5></b-col>
            <b-col cols="4"><h5>Posted Date</h5></b-col>
            <b-col cols="4"><h5>Options</h5></b-col>
        </b-row>
        <hr>
        <div v-for="(question, index) in myQuestions" :key="index">
        <b-row>
          <b-col cols="4">
            <p>{{question.title}}</p>
          </b-col>
          <b-col cols="4">
            <p>{{question.date}}</p>
          </b-col>
          <b-col cols="4">
            <router-link :to="`/question/${question._id}`"><b-button variant="outline-primary" class="mr-2"><i class="fa fa-eye" aria-hidden="true"></i></b-button></router-link>
            <b-button-group>
                <b-button @click="editDataQuestion(question)" variant="outline-secondary"><i class="fa fa-edit" aria-hidden="true"></i></b-button>
                <b-button @click="deleteQuestion(question._id)" variant="outline-danger"><i class="fa fa-trash" aria-hidden="true"></i></b-button>
            </b-button-group>
          </b-col>
        </b-row>
        <hr>
      </div>
      <b-modal id="modalAddArticle" size="lg" title="Edit question" centered hide-footer ref="myModalRef">
          <b-form>
              <b-form-input
                  v-model="editQuestion.title"
                  type="text"
                  required
                  placeholder="Article title"
                  style="margin-bottom: 10px;">
              </b-form-input>
              <b-textarea v-model="editQuestion.body" :rows="3"></b-textarea>
              <b-btn @click="questionEdit" class="mt-3" variant="primary" block>Submit</b-btn>
              <b-btn class="mt-1" variant="secondary" block @click="hideModal">Cancel</b-btn>
          </b-form>
      </b-modal>
    </div>
</template>

<script>
import db from '@/api/server.js'
import { mapState } from "vuex"

export default {
    name: 'myQuestion',
    data () {
        return {
            myQuestions: [],
            editQuestion: {
                id: '',
                title: '',
                body: ''
            }
        }
    },
    methods: {
        GetMyQuestions() {
            return db.request({
                url: `questions/myQuestions/${this.userProfile._id}`,
                method: 'GET',
                headers: {
                token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.myQuestions = data
            })
            .catch(error => {
                console.log(error)
            })
        },
         
        editDataQuestion(question) {
            this.$refs.myModalRef.show()
            this.editQuestion.id = question._id
            this.editQuestion.title = question.title
            this.editQuestion.body = question.body
        },

        questionEdit() {
            let data = {
                title: this.editQuestion.title,
                body: this.editQuestion.body
            }
            db.request({
                url: `questions/${this.editQuestion.id}`,
                method: 'PUT',
                data,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.GetMyQuestions()
                this.$refs.myModalRef.hide()
            })
            .catch(error => {
                console.log(error)
            })
        },

        deleteQuestion(questionId) {
            db.request({
                url: `questions/${questionId}`,
                method: 'DELETE',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.GetMyQuestions()
            })
            .catch(error => {
                console.log(error)
            })
        },

        hideModal () {
            this.$refs.myModalRef.hide()
        },
    },
    watch: {
        $route() {
            this.$store.dispatch('actionAllQuestion')
        },
        userProfile(user) {
            if (user) {
                this.GetMyQuestions()
            }
        }
    },
    computed: {
        ...mapState(['userProfile', 'questionDetail'])
    },
    created() {
        this.$store.dispatch('actionAllQuestion')
        if (this.userProfile._id) {
            this.GetMyQuestions()
        }

    }
}
</script>
