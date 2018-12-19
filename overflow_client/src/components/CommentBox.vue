<template>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Comment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p v-for="(ans, index) in question.answer" :key="`ans-${index}`"> @{{ ans.name }} answered: {{ ans.comment }}</p>
            </div>
            <div class="modal-footer">
                <input v-model="comment_section" type="text" name="" placeholder="weirdest comment section">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="addComment" type="button" class="btn btn-primary">Add Comment</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'comment_box',
  props: ['question'],
  data() {
   return {
     comment_section: '',
   };
  },
  methods: {
    addComment() {
      firebase.database().ref(`/question/${this.question.key}/answer`).push({
        name: this.getUserName(),
        email: this.getUserEmail(),
        comment: this.comment_section,
      });
      this.comment_section = '';
    },
    // getAllComment() {
    //   var comments = firebase.database().ref(`/question/${this.question.key}/answer`);
    //     comments.on('value', (snapshot) => {
    //     let object = snapshot.val(); 
    //     for (const key in object) {
    //       const element = object[key];
    //     }
    //   });
    // },
    getUserName() {
      return firebase.auth().currentUser.displayName;
    },
    getUserEmail() {
      return firebase.auth().currentUser.email;
    },
  },
  created() {
    this.getAllComment();
  },
};
</script>
