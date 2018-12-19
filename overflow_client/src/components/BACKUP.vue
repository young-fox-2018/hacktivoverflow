<template>
  <div class="container">
    <!-- <div  class="card"> -->
    <div v-for = "(question, index) in question_list" :key="`question-${index}`" class="card">
      <div class="card-header">
        @{{ question.name }} asked
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ question.question }}</h5>
         <div class="panel panel-default">
          <!-- <div class="panel-heading"><a href="#" class="pull-right">View all</a></div> -->
          <div class="panel-body">
            <form>
              <div class="input-group">
                <div class="input-group-btn">
                  <button @click="like(question)" class="btn btn-default">Like ({{ question.like_qty }})</button><button class="btn btn-default"><i class="glyphicon glyphicon-share"></i></button>
                  <button @click="dislike(question)" class="btn btn-default">Dislike ({{ question.dislike_qty }})</button><button class="btn btn-default"><i class="glyphicon glyphicon-share"></i></button>
                  <button class="btn btn-default" data-toggle="modal" :data-target="'#comment_box'+index">View All Comment</button><button class="btn btn-default"><i class="glyphicon glyphicon-share"></i></button>
                </div>
              <CommentBox :question="question" :id="'comment_box'+index"></CommentBox>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase';
import Main from '@/components/Main.vue';
import CommentBox from '@/components/CommentBox.vue';

export default {
  name: 'Main',
  components: {
    CommentBox,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      question_list: [],
      likes_qty: 0,
      dislikes_qty: 0,
    };
  },
  methods: {
    getArticles() {
      var articles = firebase.database().ref('/question');
        articles.on('value', (snapshot) => {
          let object = snapshot.val()
          let temp = [] 
          for (const key in object) {
              const element = object[key];
              element['key'] = key;
              let count_likes = 0;
              let count_dislikes = 0;
              for (const key in element.like) {
                count_likes += 1;
              }
              element['like_qty'] = count_likes;
              for (const key in element.dislike) {
                count_dislikes += 1;
              }
              element['dislike_qty'] = count_dislikes;
              temp.push(element);
          }
          this.question_list = temp
        });
    },
    like(val) {
      if (typeof(val.like) == 'string') {
        firebase.database().ref(`/question/${val.key}/like`).push({
          name: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
        });

        // var dislikes = firebase.database().ref(`/question/${val.key}/dislike`)
        // dislikes.on('value', (snapshot) => {
        //   let object = snapshot.val();
        //   let dislike_key = null
        //   for (const key in object) {
        //     const element = object[key];
        //     if (element.email == firebase.auth().currentUser.email) {
        //       dislike_key = key;
        //     }
        //   }

        //   console.log("----",dislike_key)
        //   // if (dislike_key != null) {
        //   //   firebase.database().ref(`/question/${val.key}/dislike/${dislike_key}`).remove()
        //   // } 
        // })
        // alert('success like');
      } else {
        var likes = firebase.database().ref(`/question/${val.key}/like`);
        likes.on('value', (snapshot) => {
          let object = snapshot.val();
          let state = true;
          for (const key in object) {
              const element = object[key];
              if (element.email == firebase.auth().currentUser.email) {
                alert('u already vote this like');
                state = false;
              }
          }
          if (state) {
            firebase.database().ref(`/question/${val.key}/like`).push({
              name: firebase.auth().currentUser.displayName,
              email: firebase.auth().currentUser.email,
            })
          }
        })
        var dislikes = firebase.database().ref(`/question/${val.key}/dislike`)
        dislikes.on('value', (snapshot) => {
          let object = snapshot.val();
          let dislike_key = null
          for (const key in object) {
            const element = object[key];
            if (element.email == firebase.auth().currentUser.email) {
              dislike_key = key;
            }
          }
          if (dislike_key != null) {
            firebase.database().ref(`/question/${val.key}/dislike/${dislike_key}`).remove()
          } 
        })
      }
    },
    dislike(val) {
      if (typeof(val.dislike) == 'string') {
        firebase.database().ref(`/question/${val.key}/dislike`).push({
          name: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
        });
        var likes = firebase.database().ref(`/question/${val.key}/like`)
        likes.on('value', (snapshot) => {
          let object = snapshot.val();
          let like_key = null
          for (const key in object) {
            const element = object[key];
            if (element.email == firebase.auth().currentUser.email) {
              like_key = key;
            }
          }
          if (like_key != null) {
            firebase.database().ref(`/question/${val.key}/like/${like_key}`).remove()
          } 
        })
        alert('success dislike');
      } else {
        var dislikes = firebase.database().ref(`/question/${val.key}/dislike`);
        dislikes.on('value', (snapshot) => {
          let object = snapshot.val();
          let state = true;
          for (const key in object) {
              const element = object[key];
              if (element.email == firebase.auth().currentUser.email) {
                alert('u already vote this dislike');
                state = false;
              }
          }
          if (state) {
            firebase.database().ref(`/question/${val.key}/dislike`).push({
              name: firebase.auth().currentUser.displayName,
              email: firebase.auth().currentUser.email,
            })
          } 
        })
        var likes = firebase.database().ref(`/question/${val.key}/like`)
        likes.on('value', (snapshot) => {
          let object = snapshot.val();
          let like_key = null
          for (const key in object) {
            const element = object[key];
            if (element.email == firebase.auth().currentUser.email) {
              like_key = key;
            }
          }
          if (like_key != null) {
            firebase.database().ref(`/question/${val.key}/like/${like_key}`).remove()
          } 
        }) 
      } 
    },
    countLikes() {
      let object = this.question.like;
      let count = 0;
      for (const key in object) {
        count += 1
      }
      this.likes_qty = count;
    },
    countDislikes() {
      let object = this.question.dislike;
      let count = 0;
      for (const key in object) {
        count += 1
      }
      this.dislikes_qty = count;
    }
  },
  created() {
    this.getArticles();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

  .panel .btn i,.btn span{
  color:#666666;
  }
  .panel .panel-heading {
  background-color:#ffffff;
  font-weight:700;
  font-size:16px;
  color:#262626;
  border-color:#ffffff;
  }
  .panel .panel-heading a {
  font-weight:400;
  font-size:11px;
  }
  .panel .panel-default {
  border-color:#cccccc;
  }
  .panel .panel-thumbnail {
  padding:0;
  }
  .panel .img-circle {
  width:50px;
  height:50px;
  }
</style>
