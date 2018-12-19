<template>
  <div class="myquestion">
    <h1>Things i have asked:</h1>
      <div class="container">
    <!-- <div  class="card"> -->
    <div v-for = "(question, index) in myQuestion_list" :key="`question-${index}`" class="card">
      <!-- <div class="card-header">
        @{{ question.name }} asked
      </div> -->
      <div class="card-body">
        <h5 class="card-title">{{ question.question }}</h5>
         <div class="panel panel-default">
          <!-- <div class="panel-heading"><a href="#" class="pull-right">View all</a></div> -->
          <div class="panel-body">
            <form>
              <div class="input-group">
                <div class="input-group-btn">
                  <button @click="removeArticle(question.key)" class="btn btn-default">Delete</button><button class="btn btn-default"><i class="glyphicon glyphicon-share"></i></button>
                  <button class="btn btn-default" data-toggle="modal" :data-target="'#edit_box'+index">Edit</button><button class="btn btn-default"><i class="glyphicon glyphicon-share"></i></button>
                </div>
                <EditBox :question="question" :id="'edit_box'+index"></EditBox>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import EditBox from '@/components/EditBox.vue';

export default {
  name: 'myquestion',
  components: {
    EditBox
  },
  data() {
    return {
      myQuestion_list: [],
    }
  },
  methods: {
    getMyArticle() {
      var my_articles = firebase.database().ref('/question')
      my_articles.on('value', (snapshot) => {
        let object = snapshot.val();
        console.log(object, 'ini object dari get my article');
        let temp = [];
         for (const key in object) {
              const element = object[key];
              element['key'] = key;
              if (element.email == firebase.auth().currentUser.email) {
                temp.push(element)
              }
          }
          this.myQuestion_list = temp;
      });
    },
    removeArticle(delete_key) {
      console.log(delete_key);
      firebase.database().ref(`/question/${delete_key}`).remove()
    },
  },
  created() {
    this.getMyArticle();
  },
}
</script>

