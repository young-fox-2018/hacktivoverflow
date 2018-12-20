<template>
    <div class="modal" id="modalRegister">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white ">
                        <h3 class="mx-auto">Register </h3>
                </div>
                <div class="modal-body">
                    <p v-if="form_register.succes" class="alert alert-success">
                        <strong> Succes registered! </strong>
                        <button class="close" type="button" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </p>
                    <p  v-if="form_register.error" class="alert alert-danger">{{ form_register.error}}
                        <button class="close" type="button" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </p>
                    <div class="form-group">
                        <label for="name"> Name : </label>
                        <input v-model="form_register.name" type="text" class="form-control" id="name" placeholder="enter your name ....">
                        <small id="name_muted" class="form-text text-muted"> field name must be filled</small>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-4">
                                <span class="font-weight-bold">Avatar :</span>
                                <input @change="readUrl" type="file" class="form-control">
                            </div>
                            <div v-if="form_register.avatar" class="col-lg-8">
                                <img :src="form_register.url" class="img-fluid"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email"> Email : </label>
                        <input  v-model="form_register.email" type="email" class="form-control" id="email" placeholder="enter your email ....">
                        <small id="email_muted" class="form-text text-muted"> field email must be filled</small>
                    </div>
                        <div class="form-group">
                        <label for="email"> Password : </label>
                        <input  v-model="form_register.password" type="password" class="form-control" id="password" placeholder="enter your password ....">
                        <small id="password_muted" class="form-text text-muted"> field password must be filled</small>
                    </div>

                </div>
                <div class="modal-footer">
                    <button @click="clear" class="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                    <button @click="register" class="btn btn-primary" type="button">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from '@/axios.js'
export default {
    data(){
        return{
            form_register : {
                succes : '',
                error : '',
                email : '',
                name : '',
                password: '',
                url : '',
                avatar : null
            }
        }
    },
    methods : {
        clear : function(){
            this.form_register.succes = ''
            this.form_register.error = ''
            this.form_register.email = ''
            this.form_register.name = ''
            this.form_register.password = ''
            this.form_register.avatar = null
            this.form_register.url = ''
        },
        register : function(){
            let formData = new FormData()
            formData.append('name', this.form_register.name)
            formData.append('email', this.form_register.email)
            formData.append('password', this.form_register.password)
            formData.append('avatar', this.form_register.avatar)
            request.post('/users/register', formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then( ({ data }) => {
                this.clear() 
                this.form_register.succes = 'Succes Registrasi, silakan login!'
            })
            .catch( ( { response }) =>{
                this.form_register.error = response.data.message
            })
        },
        readUrl(e){
            let image = e.target.files[0]   
            this.form_register.avatar = image
            let fileReader = new FileReader()
            fileReader.onload = (e) =>{
                this.form_register.url = e.target.result
            }
            fileReader.readAsDataURL(e.target.files[0])
        }
    }
    
}
</script>
