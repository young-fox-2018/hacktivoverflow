<template>
     <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Post Your Question</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="edit" name="title" label="Title" type="text" v-model="title"></v-text-field>
                  <v-text-field prepend-icon="edit" name="content" label="Question" type="text" v-model="content"></v-text-field>            
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark @click="postQuestion">
                    <v-icon dark left>send</v-icon>Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>

export default {
    name: 'newquestion',
    data () {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        postQuestion () {
            axios({
                method: `POST`,
                url: `http://localhost:3000/questions`,
                data: {
                    title: this.title,
                    content: this.content
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((question) => {
                this.$store.dispatch('getAllQuestionAction')
                this.$router.push('/myquestion')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>

