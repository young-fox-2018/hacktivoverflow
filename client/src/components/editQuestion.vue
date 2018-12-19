<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title> Your Question</v-toolbar-title>
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
                <v-btn dark @click="editQuestion">
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
const IP = `http://35.240.198.92`
export default {
    name: 'editQuestion',
    data () {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        editQuestion () {
            axios({
                method: `PUT`,
                url: `${IP}/questions/${this.$route.params.id}`,
                data: {
                    title: this.title,
                    content: this.content
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((question) => {
                this.$router.push('/myquestion')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

