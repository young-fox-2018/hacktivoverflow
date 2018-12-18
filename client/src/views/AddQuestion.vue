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
        <div class="form-group" id="form-content">
            <textarea type="text" class="form-control" v-model="form.content"
            id="questionContent" rows="10" placeholder="Start typing ......"/>
        </div>
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
        body: '',
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
};
</script>

<style scoped>
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
