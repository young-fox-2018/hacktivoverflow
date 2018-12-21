<template>
  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags" v-if="usage== 'create'">
    </vue-tags-input>
    <vue-tags-input
      v-model="tag"
      :tags="currentTags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags" v-if="usage== 'edit'">
    </vue-tags-input>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [{
        text: 'Spain',
      }, {
        text: 'France',
      }, {
        text: 'USA',
      }, {
        text: 'Germany',
      }, {
        text: 'China',
      }],
    };
  },
  computed: {
    filteredItems: function(){
        this.autocompleteItems.filter(i => {
          return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
        });
      },
    },
    watch: {
        tags(){
            this.$emit('get-tags', this.tags)
        }
    },
    props: {
      currentTags: Array, 
      usage: {
        type: String,
        default: 'create'
      }
    } 
};
</script>