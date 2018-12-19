<template>
      <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Edit Your Answer</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="edit" name="content" label="New Answer" type="text" v-model="content"></v-text-field>         
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark @click="editAnswer">
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
    name: 'editanswer',
    data () {
        return {
            content: ''
        }
    },
    methods: {
          editAnswer() {
            axios({
                method: `PUT`,
                url:`${IP}/answers/one/${this.$route.params.id}`,
                data: {
                    content: this.content
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((answer) => {
                console.log(answer)
                this.$router.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        findAnswer() {
            axios({
                method: `GET`,
                url: `${IP}/answers/${this.$route.params.id}`
            })
            .then((answer) => {
                console.log(answer)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

