<template>
    <div>
        <div v-for="(question,index) in questions" :key="index" class="post">
            <div class="wrap-ut pull-left">
                <div class="userinfo pull-left">
                    <div class="avatar">
                        <img src="https://hovasia.com/uploads/member_picture/93/85/93852227-BD4A-5AC2-E27A-BDAF8ABD2540.jpg" alt="">
                        <div class="status green">&nbsp;</div>
                    </div>

                    <div class="icons">
                        <div class="float-right">
                            <a v-if="isLogin" href="#" style="color: #1379ee"> {{question.upVote.length}} <i @click="upVote(question._id)" class="fas fa-arrow-up fa-sm"/> </a>
                            <a v-else v-b-modal.loginModal href="#" style="color: #1379ee"> {{question.upVote.length}} <i @click="upVote(question._id)" class="fas fa-arrow-up fa-sm"/> </a>

                        </div> 
                        <div class="float-right">
                            <a href="#" v-if="isLogin" style="color: #a01111"> {{question.downVote.length}} <i @click="downVote(question._id)" class="fas fa-arrow-down fa-sm"/> </a>
                            <a href="#" v-else  v-b-modal.loginModal style="color: #a01111"> {{question.downVote.length}} <i @click="downVote(question._id)" class="fas fa-arrow-down fa-sm"/> </a>

                        </div>
                    </div>
                    
                </div>
                <div class="posttext pull-left">
                    <h2><router-link :to="'/question/detail/' + question._id ">{{question.title}}</router-link></h2>
                    <p id="test">Asked by: {{question.userId.name}}</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="postinfo pull-left">
                <div v-if="question.userId._id == userId">
                    <div class="comments">
                        <a href="" @click.prevent="editQuestion(question._id)"> <i class="fa fa-edit"></i></a>
                    </div>
                    <div class="comments">
                        <a href="" @click.prevent="deleteQuestion(question._id)"><i class="fa fa-trash-alt"></i></a>
                    </div>
                </div>
                <div class="views"><i class="fa fa-eye"></i> 0</div>
                <div class="time"><i class="fa fa-clock-o"></i> 24 min</div>                                    
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import blogapi from '@/api/axios'
export default {
    created(){
        this.getQuestions()
    },
    computed: {
        ...mapState(['questions', 'userId'])
    },
    methods: {
        ...mapActions(['getQuestions']),
        upVote(params){
            console.log(params)
            let data = {
                userId : localStorage.getItem('userId')
            }
            blogapi.put(`/questions/upvote/${params}`, data,
            {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(result =>{
                this.getQuestions()
            })
            .catch(err=>{
                alert(err.message.message)
                console.log(err.message.message)
            })
        },
        downVote(params){
            let data = {
                userId : localStorage.getItem('userId')
            }
             blogapi.put(`/questions/downvote/${params}`, data,
            {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(result =>{
                this.getQuestions()
            })
            .catch (err=>{
                alert(err.message.message)
                console.log(err.message.message)
            })
        },
        fetchCommentByArticle(params){
            blogapi.get(`/answers/${params}`)
            .then(({data})=>{
                console.log(data.length)
                
            })
            .catch(({message})=>{

            })
        },
        editQuestion(params){
            console.log("masukk ke function edit article",params)
            this.$router.push('/question/edit/'+params);
        },
        deleteQuestion(params){
            console.log("masukk ke delete")
            blogapi.delete('/questions/'+params, {
                headers :{
                    token : localStorage.getItem('token')
                }
            })
            .then(success => {
                console.log("data udah di delete...........")
                console.log(success,"======")
                this.getQuestions()
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
}
</script>

<style>
#id{
    position: absolute; 
    bottom: 0;
}
.card-header h3 {
    color: #363838;
    font-size: 14px;
    font-family: 'Open Sans Bold', sans-serif;
    margin: 0;
    padding: 0px;
}
.post {
    background-color: #ffffff;
    border-radius: 2px;
    box-shadow: 0 1px 2px #c9cccd;
    margin-bottom: 20px;
}
.post .wrap-ut {
    width: 85%;
}
.pull-left {
    float: left!important;
}
.post .userinfo {
    width: 15%;
    padding: 20px 0 15px 15px;
}
.post .posttext {
    width: 85%;
    padding-right: 30px;
    padding-top: 20px;
    padding-bottom: 15px;
    color: #989c9e;
    font-size: 14px;
    font-family: 'Open Sans Light', sans-serif;
    line-height: 25px;
}
.post .avatar {
    width: 37px;
    margin-left: 5px;
}
.avatar {
    position: relative;
}
.avatar img {
    max-width: 50px;
    max-height: 50px;
    border-radius: 50%;
}
.avatar .green {
    background-color: #80d3ab;
}
.avatar .status {
    position: absolute;
    right: 0;
    top: 0;
    width: 12px;
    height: 12px;
    line-height: 12px;
    border-radius: 50%;
    border: solid 2px #ffffff;
}
.post h2 {
    color: #363838;
    font-size: 18px;
    font-family: 'Open Sans', sans-serif;
    margin-top: 10px;
    margin-bottom: 10px;
}
a {
    color: #363838;
}
img {
    vertical-align: middle;
}
.post .icons {
    width: 48px;
    border-top: solid 1px #f1f1f1;
    margin-top: 12px;
    padding-top: 7px;
}
.post .comments {
    border-bottom: solid 1px #f1f1f1;
    padding: 5px 0 10px 0;
    text-align: center;
}
.post .comments .commentbg {
    background-color: #bdc3c7;
    border-radius: 2px;
    display: inline-block;
    padding: 12px 17px;
    color: #ffffff;
    font-size: 14px;
    font-family: 'Open Sans Bold', sans-serif;
    position: relative;
}
.post .comments .commentbg .mark {
    width: 11px;
    height: 11px;
    background-color: #bdc3c7;
    position: absolute;
    bottom: 0;
    left: 43%;
    margin-bottom: -5px;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
.post .views {
    border-bottom: solid 1px #f1f1f1;
    color: #9da6aa;
    font-size: 12px;
    font-family: 'Open Sans Regular', sans-serif;
    text-align: center;
    line-height: 29px;
}
.post .time {
    color: #9da6aa;
    font-size: 12px;
    font-family: 'Open Sans Regular', sans-serif;
    text-align: center;
    line-height: 29px;
}

@media (max-width: 767px) {
.post .userinfo {
    width: 30%;
    padding: 15px 0 15px 15px;
}
}
@media (max-width: 767px){
.post .posttext {
    width: 70%;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
} 
}
</style>