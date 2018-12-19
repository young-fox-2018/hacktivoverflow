<template>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                 <textarea v-model="edit_section" class="form-control"
                  id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="editQuestion" type="button" class="btn btn-primary">Edit </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
// /question/-LU0gQL88vvL4EAt89SZ/question
export default {
  name: 'edit_box',
  props: ['question'],
  data() {
    return {
      edit_section: this.question.question,
      edit_id: this.question.key,
    };
  },
  methods: {
    editQuestion() {
      const editData = this.edit_section;
      const updates = {};
      updates[`/question/${this.edit_id}/question`] = editData;
      this.edit_section = '';
      return firebase.database().ref().update(updates);
    },
  },
};
</script>
