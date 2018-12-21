<template>
 <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="Full Name" label="Full Name" type="text" v-model="name"></v-text-field>
                  <v-text-field prepend-icon="email" name="email" label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                  <v-text-field prepend-icon="cake" name="birthday" label="Birthday" type="date" v-model="birthday"></v-text-field>
                    <div class="file-field input-field col s12 ">
                            <div class="btn indigo accent-2 white-text">
                                <span black darken-1 white-text>Upload Avatar</span>
                                <input type="file" @change="uploadAvatar">
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text">
                            </div>
                        </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark @click="register">
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
const localhost = `http://localhost:3000`
export default {
    name: 'signup',
    data () {
        return {
            name: '',
            email: '',
            password: '',
            birthday: '',
            avatar: ''
        }
    },
    methods: {
        register () {
            let formData = new FormData()
            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('birthday', this.birthday)
            formData.append('avatar', this.avatar)
            axios({
                method: `POST`,
                url: `http://hacktivoverflow.vinco.icu/users`,
                data: formData
            })
            .then((user) => {
                console.log(user)
                this.$router.push('/signin')
            })
            .catch((err) => {
                console.log(err.response)
            })
        },
        uploadAvatar: function (img) {
            this.avatar = img.target.files[0]
        }
    }
}
</script>

<style>

</style>


