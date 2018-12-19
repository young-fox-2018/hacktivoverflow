<template>
  <div id="login" class="modal fade">
    <div class="modal-dialog modal-login">
      <div class="modal-content">
        <div class="modal-header">
          <div class="avatar">
            <img src="https://i.imgur.com/dGo8DOk.jpg" alt="Avatar">
          </div>				
          <h4 class="modal-title">Member Login</h4>	
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="login" method="post">
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email" required="required" v-model="email">		
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" required="required" v-model="password">	
            </div>        
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-lg btn-block login-btn">Login</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <a href="#">Create an account</a>
        </div>
      </div>
    </div>
  </div>    
</template>

<script>
import {server} from '@/config.js'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      server.request({
				method: 'POST',
        url: 'users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
					localStorage.setItem('access_token', data.token)
					localStorage.setItem('user', data.user._id)
					this.$store.dispatch('setDataUser', data.user)
					this.email = ''
					this.password = ''
					$('#login').modal('hide')
					this.$store.dispatch('isLoginAction', true)
        })
        .catch(response => {
          console.log(response)
          alert(response)
        })
    }
  }
}
</script>


<style type="text/css" scoped>
    body {
		font-family: 'Varela Round', sans-serif;
	}
	.modal-login {		
		color: #636363;
		width: 350px;
	}
	.modal-login .modal-content {
		padding: 20px;
		border-radius: 5px;
		border: none;
	}
	.modal-login .modal-header {
		border-bottom: none;   
        position: relative;
        justify-content: center;
	}
	.modal-login h4 {
		text-align: center;
		font-size: 26px;
		margin: 30px 0 -15px;
	}
	.modal-login .form-control:focus {
		border-color: #70c5c0;
	}
	.modal-login .form-control, .modal-login .btn {
		min-height: 40px;
		border-radius: 3px; 
	}
	.modal-login .close {
        position: absolute;
		top: -5px;
		right: -5px;
	}	
	.modal-login .modal-footer {
		background: #ecf0f1;
		border-color: #dee4e7;
		text-align: center;
        justify-content: center;
		margin: 0 -20px -20px;
		border-radius: 5px;
		font-size: 13px;
	}
	.modal-login .modal-footer a {
		color: #999;
	}		
	.modal-login .avatar {
		position: absolute;
		margin: 0 auto;
		left: 0;
		right: 0;
		top: -70px;
		width: 95px;
		height: 95px;
		border-radius: 50%;
		z-index: 9;
		background: #60c7c1;
		padding: 15px;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
	}
	.modal-login .avatar img {
		width: 100%;
	}
	.modal-login.modal-dialog {
		margin-top: 80px;
	}
    .modal-login .btn {
        color: #fff;
        border-radius: 4px;
		background: #60c7c1;
		text-decoration: none;
		transition: all 0.4s;
        line-height: normal;
        border: none;
    }
	.modal-login .btn:hover, .modal-login .btn:focus {
		background: #45aba6;
		outline: none;
	}
	.trigger-btn {
		display: inline-block;
		margin: 100px auto;
	}
	.modal-backdrop {
   background-image: url(https://www.aurorawatch.ca/images/stories/20180331/20180315_Baxter_01.jpg);
  }
</style>
