<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-3">
                <h5 class="font-weight-bold">Profile User :</h5>
                <div class="card">
                    <img class="card-img-top" :src="user.avatar" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{user.name}}</h5>
                        <h5 class="font-weight-bold">Popularity : {{user.popularity}}</h5>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">

            </div>
            <div class="col-lg-3">
                <ul class="list-group">
                    <li v-for="(user, index) in userPopular" :key="index" class="list-group-item" >
                        <div class="row">
                            <div class="col-sm-4">
                                <img :src="user.avatar" class="img-fluid"/>
                            </div>
                            <div class="col-sm-8">
                                <h5 class="font-weight-bold">{{ user.name}}</h5>
                                <h5 class="font-weight-bold"><i class="fas fa-crown mr-1"></i>{{ user.popularity}}</h5>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import request from '@/axios.js'
export default {
    name : 'profile',
    data(){
        return {
            user : {
                name : '',
                avatar : '',
                popularity : null
            },
            userPopular : []
        }
    },
    methods : {
        readDataUser(){
            request.get('/users', {
                headers : {
                    jtoken : localStorage.getItem('token')
                }
            })
            .then( ({ data }) => {
                this.user = data
            })
            .catch( ({ response }) => {
                console.log( response.data )
            })
        },
        readTopPopular(){
            request.get('/users/popular',{
                headers : {
                    jtoken : localStorage.getItem('token')
                }
            })
            .then( ({ data }) => {
                this.userPopular= data
            })
            .catch( ({ response }) => {
                console.log( response.data)
            })
        }
    },
    mounted(){
        this.readDataUser()
        this.readTopPopular()
    }
}
</script>

