<template>
    <div>
        <!-- question -->
        <div class="post">
            <div class="wrap-ut pull-left">
                <div class="userinfo pull-left">
                    <div class="avatar">
                        <img src="http://forum.azyrusthemes.com/images/avatar.jpg" alt="">
                        <div class="status green">&nbsp;</div>
                    </div>
                    <!-- <div class="icons">
                        <div class="float-right">
                            <a href="#" style="color: #1379ee"> {{question.upVote.length}} <i @click="upVote(question._id)" class="fas fa-arrow-up fa-sm"/> </a>
                        </div> 
                        <div class="float-right">
                         <a href="#" style="color: #a01111"> {{question.downVote.length}} <i @click="downVote(question._id)" class="fas fa-arrow-down fa-sm"/> </a>
                        </div>
                    </div> -->
                </div>
                <div class="posttext pull-left">
                    <h2><router-link :to="'/question/detail/'">{{question.title}}</router-link></h2>
                    <div v-html="question.description" id="test"></div>
                </div>
                <div class="postinfo pull-left">
                    <div class="comments">
                        <div class="commentbg">
                            0
                            <div class="mark"></div>
                        </div>
                    </div>
                    <div class="views"><i class="fa fa-eye"></i> 0</div>
                    <div class="time"><i class="fa fa-clock-o"></i> 24 min</div>                                    
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="postinfobot">
                <div class="likeblock pull-left">
                    <a href="#" v-if="isLogin" @click.prevent="upQuestionVote(question._id)" class="up"><i class="fas fa-thumbs-up"></i>{{question.upVote.length}}</a>
                    <a href="#" v-else v-b-modal.loginModal @click.prevent="upQuestionVote(question._id)" class="up"><i class="fas fa-thumbs-up"></i>{{question.upVote.length}}</a>
                    <a href="#"  v-if="isLogin" @click.prevent="downQuestionVote(question._id)" class="down"><i class="fas fa-thumbs-down"></i>{{question.downVote.length}}</a>
                    <a href="#"  v-else v-b-modal.loginModal @click.prevent="downQuestionVote(question._id)" class="down"><i class="fas fa-thumbs-down"></i>{{question.downVote.length}}</a>

                </div>
                <div class="prev pull-left">                                        
                    <a href="#answerform"><i class="fas fa-reply"></i></a>
                </div>
                <div class="posted pull-left"><i class="fas fa-clock-o"></i> Posted on : {{question.createdAt | formatDate}}</div>
                <div class="clearfix"></div>
            </div>
        </div>
        <!-- answeeeerrr -->
        <div v-for="(answer,index) in answers" :key="index" class="post" >
            <div class="wrap-ut pull-left">
                <div class="userinfo pull-left">
                    <div class="avatar">
                        <img src="http://forum.azyrusthemes.com/images/avatar.jpg" alt="">
                        <div class="status green">&nbsp;</div>
                    </div>

                    <div class="icons">
                        <div class="float-right" style="color: #1379ee">
                         {{answer.upVote.length}}<i @click.prevent="upAnswerVote(answer._id)" class="fas fa-arrow-up fa-sm"/>
                        </div> 
                        <div class="float-right ml-2" style="color: #a01111">
                         {{answer.downVote.length}} <i @click.prevent="downAnswerVote(answer._id)" class="fas fa-arrow-down fa-sm"/> 
                        </div>
                    </div>
                    
                </div>
                <button v-if="userId == answer.userId._id" class="float-right btn btn-sm btn-danger">x</button>
                <div class="posttext pull-left">
                    <h5><router-link :to="'/question/detail/'">{{answer.userId.name}}</router-link></h5>
                    <!-- <p></p> -->
                    <p v-html="answer.message" id="test"></p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- form answer -->
        <div class="post" id="answerform">
            <div class="wrap-ut pull-left">
                <div class="userinfo pull-left">
                    <div class="avatar">
                        <img src="http://forum.azyrusthemes.com/images/avatar4.jpg" alt="">
                        <div class="status green">&nbsp;</div>
                    </div>
                </div>
                <div class="posttext pull-left">
                    <h5>From: <router-link :to="`/profile/detail/`">{{email}}</router-link></h5>
                    <form @submit.prevent="addAnswer">
                        <p id="test"><wysiwyg v-model="message"/></p>
                        <button v-if="isLogin" type="submit" class="btn btn-primary"> Send </button> 
                        <button v-else v-b-modal.loginModal class="btn btn-primary"> Send </button> 
                    </form>
                </div>
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
        this.fetchQuestions()
        this.fetchAnswers()
    },
    data () {
        return{
            question : {},
            answers : [],
            answer : {},
            message : ''
        }
    },
    computed: {
        ...mapState(['isLogin','userId','email'])
    },
    methods: {
        fetchQuestions(){
            blogapi.get(`/questions/${this.$route.params.id}`)
            .then(({data})=>{
                console.log(data)
                this.question = data
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        fetchAnswers(){
            blogapi.get(`/answers/${this.$route.params.id}`)
            .then(({data})=>{
                // console.log("answerrr",data.length)
                this.answers = data
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        addAnswer(){
            this.answer.questionId = this.question._id
            this.answer.message = this.message
            blogapi.post('/answers/', this.answer, {
                headers : {
                    token : localStorage.getItem('token')
                }
            }) 
            .then(({ data }) => {
                console.log("answer created",data)
                this.message = ''
                this.fetchQuestions()
                this.fetchAnswers()
                this.$router.push('/question/detail/'+this.question._id)

            })
            .catch((err) => {
                console.log(err);
            });
        },
        upQuestionVote(params){
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
                this.fetchAnswers()
                this.fetchQuestions()
            })
            .catch (err=>{
                console.log(err)
            })
        },
        downQuestionVote(params){
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
                this.fetchAnswers()
                this.fetchQuestions()
            })
            .catch (err=>{
                console.log(err)
            })
        },
        upAnswerVote(params){
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
                this.fetchAnswers()
                this.fetchQuestions()
            })
            .catch (err=>{
                console.log(err)
            })
        },
        downAnswerVote(params){
            let data = {
                userId : localStorage.getItem('userId')
            }
             blogapi.put(`/answers/downvote/${params}`, data,
            {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(result =>{
                this.fetchAnswers()
                this.fetchQuestions()
            })
            .catch (err=>{
                console.log(err)
            })
        } 
    },
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
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
    width: 100%;
}
.pull-left {
    float: left!important;
}
.post .userinfo {
    width: 15%;
    padding: 20px 0 15px 15px;
}
.post .posttext {
    width: 70%;
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
    padding: 18px 0 25px 0;
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

.postinfobot {
    border-top: solid 1px #f1f1f1;
    line-height: 50px;
    padding: 0 30px 0 94px;
}
.postinfobot .likeblock {
    width: 120px;
}
.up {
    color: #1abc9c;
    font-size: 12px;
}
.up i, .down i {
    font-size: 20px;
    padding-right: 10px;
}
.down {
    color: #db7a7a;
    font-size: 12px;
    margin-left: 20px;
}
.postinfobot .prev {
    width: 30px;
}
.postinfobot .prev a {
    font-size: 18px;
    color: #bdc3c7;
}
.postinfobot .posted {
    width: 300px;
    margin-left: 18px;
    font-size: 12px;
    color: #bdc3c7;
    font-family: 'Open Sans', sans-serif;
}
.postinfobot .posted i {
    font-size: 18px;
    color: #bdc3c7;
    padding-right: 8px;
}
.postinfobot .next {
    width: 90px;
    text-align: right;
}
.postinfobot .next a {
    font-size: 18px;
    color: #bdc3c7;
}
</style>