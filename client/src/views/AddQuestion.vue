<template>
<div id="newQuestion">
    <form>
    <b-alert :show="dismissCountDown"
            dismissible
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
        <p>{{errorMessage}}</p>
    </b-alert>
        <div class="form-group mt-3 mb-3" id="form-title">
            <input type="text" class="form-control input-group-lg" v-model="form.title"
            id="questionTitle" aria-describedby="emailHelp" placeholder="Title">
        </div>
        <!-- <div class="form-group" id="form-content"> -->
            <!-- <textarea type="text" class="form-control" v-model="form.content"
            id="questionContent" rows="10" placeholder="Start typing ......"/> -->
            <wysiwyg v-model="form.content" />
        <!-- </div> -->
        <b-form-group label="Button style checkboxes with variant <code>primary</code> and large buttons">
          <b-form-checkbox-group v-model="form.tags"
                                buttons
                                button-variant="primary"
                                size="lg"
                                name="buttons2"
                                :options="tags">
          </b-form-checkbox-group>
        </b-form-group>
        <button type="submit" class="btn btn-light" @click.prevent="submitQuestion">Submit</button>
    </form>
</div>
</template>

<script>
import axios from '@/helpers/axios';

export default {
  name: 'AddQuestion',
  data() {
    return {
      form: {
        title: '',
        content: '',
        tags: [],
      },
      dismissCountDown: 0,
      errorMessage: '',
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    submitQuestion() {
      this.form.created_at = new Date();
      axios({
        method: 'POST',
        url: '/questions',
        data: this.form,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          this.$router.push('/');
        })
        .catch(({ response: { data } }) => {
          this.errorMessage = data.message;
          this.countDownChanged(3);
        });
    },
  },
  computed: {
      tags(){
          return this.$store.state.tags
      }
  },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

#newQuestion{
    display: flex;
    justify-content: center;
}
form{
    width: 50%
}
#questionTitle{
    font-size: 2rem;
    outline: none;
    border: none;
}
#questionContent {
    outline: none;
    border: none;
}
</style>
