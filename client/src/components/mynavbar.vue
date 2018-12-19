<template>
<div>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/">
                  <a class="navbar-brand" href="#">Home</a>
            </router-link>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <router-link to="/tags">
                        <li class="nav-item ">
                            <a class="nav-link" href="#">Tags And Popular<span class="sr-only">(current)</span></a>
                        </li>
                    </router-link>
                    
                    <router-link to="/profile" >
                         <li class="nav-item">
                            <button class="nav-link bg-dark border-0" href="#" :disabled= "!jtoken" >Profile <span class="sr-only">(current)</span></button>
                        </li>
                    </router-link>
                </ul>

                <div v-if="!jtoken" class="form-inline my-2 my-lg-0">
                    <input v-model="form_login.email" :autofocus="form_login.email_salah" class="form-control mr-sm-2" :class="{'border border-danger':form_login.email_salah}" type="email" placeholder="email" aria-label="email">
                    <input v-model="form_login.password" :autofocus="form_login.password_salah" :class="{'border border-danger':form_login.password_salah}" class="form-control mr-sm-2" type="password" placeholder="password" aria-label="password">
                    <button  v-if="!jtoken" @click="login" class="btn btn-outline-default my-2 my-sm-0" type="submit">Login</button>
                </div>
                <button v-if="!jtoken" class="btn btn-outline-default my-2 my-sm-0 mx-2" type="submit" data-toggle="modal" data-target="#modalRegister">Register</button>
                <mymodalregister id="modalRegister"></mymodalregister>
                <button v-if="jtoken" @click="logout" class="btn btn-outline-default my-2 my-sm-0 mx-2" type="submit">Log Out</button>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
        </div>
    </nav>
</div>
   
</template>

<script>
import mymodalregister from '@/components/modal-register.vue'
export default {
    props : ['jtoken'],
    components : { mymodalregister},
    data(){
        return{
            form_login : {
                email_salah :'',
                password_salah:'',
                email : '',
                password : '',
            },
        }
    },
    methods : {
        onSignIn(response){
            console.log('ini adalah methods in components :', response)
        },
        clear : function(){
            this.form_login.email = ''
            this.form_login.password = ''
            this.form_login.email_salah=''
            this.form_login.password_salah=''
        },
        login : function(){
             let data = { email : this.form_login.email, password : this.form_login.password }
            axios.post('http://localhost:3000/users/signin', data)
            .then( ({data }) => {
                let token = data.token
                localStorage.setItem('token', token)
                localStorage.setItem('user_id', data.user._id)
                 this.clear()
                this.$emit('login')
            })
            .catch( error =>{
                console.log('ini adalah error :', error.response)
                let message = error.response.data.message
                if( message === 'email tidak terdaftar!'){
                    this.form_login.email_salah = true
                }else{
                    this.form_login.password_salah = true
                }
            })
        },
        logout: function(){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            localStorage.clear()
            this.clear()
            this.$emit('logout')
        }
    }
}
</script>

