<template>
  <div class="pageContent">
    <h1>Have Something in Your Thoughts?</h1>
    <form>
    <div class="form-group">
      <label for="question_title">Question Title</label>
      <input type="text" class="form-control" v-model="addQ_title" id="question_title" placeholder="What Should I Name My Question?">
    </div>

    <div class="form-group">
      <label for="question_tags">Question Tags</label>
      <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
      :validation="validation"
      placeholder= "please use lowercase only | 8 letters max "
      :autocomplete-items="filteredItems"
      style="height:30px;"
      />
    </div>

    <div class="form-group">
      <label for="question_description">Question Description</label>
      <wysiwyg v-model="addQ_description" style="background-color:white"/>
      <!-- <input type="text" class="form-control" v-model="addQ_description" id="question_description" placeholder="Description . . ."> -->
    </div>

    <button v-if="token" type="submit" class="btn" style="background-color:#6610f2; color:white" @click.prevent="addQuestion()">Submit</button>
    <div v-else>
      <button disabled class="btn" style="background-color:#6610f2; color: white">Submit</button>
      <p>Only registered user may submit a Question!</p>
    </div>
  </form>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: "Add-Question",
  components: {
    VueTagsInput,
  },
  data () {
    return {
      token: localStorage.getItem('token'),
      addQ_title: "",
      addQ_description: "",
      error_status: false,
      error_msg: "",
      tag: '',
      tags: [],
      validation: [{
        type: 'lowercase',
        rule: /^[a-z]{1,8}$/,
        disableAdd: true,
      }],
      autocompleteItems: [],
    }
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
    });
    },
    tagsList() {
      return this.$store.state.tagsList
    }
  },
  methods: {
    addQuestion: function() {
      let data = {
        title: this.addQ_title,
        description: this.addQ_description,
        userId: this.$store.state.decoded._id,
        tags: this.tags
      }
      this.$store.dispatch('addQuestion_Action', data)
      this.addQ_title = ''
      this.addQ_description = ''
      this.tag = ''
    }
  },
  watch: {
    tagsList: function(val) {
      this.autocompleteItems = []
      val.forEach(tag => {
        let obj = {
          text: tag
        }
        this.autocompleteItems.push(obj)
      });
    }
  },
  mounted: function() {
    this.autocompleteItems = []
      this.$store.state.tagsList.forEach(tag => {
        let obj = {
          text: tag
        }
        this.autocompleteItems.push(obj)
      });
  }
}
</script>

<style scoped>
.separator {
  border: 1px solid lightgray;
  margin: 10px
}
.pageContent {
  margin-left: 180px;
  padding: 50px
}

</style>
