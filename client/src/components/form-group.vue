<template>
  <b-form-group
      id="fieldset1"
      :description="description"
      :label="label"
      label-for="input1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
  >
    <b-form-input :id="id" :type="type" :state="state" v-model.trim="value"  @change="sendValue()"></b-form-input>
  </b-form-group>
</template>

<script>
export default {

    computed: {
        state () {
            if(this.type === 'password'){
                return this.value.length >= 8 ? true : false
            } else if(this.type === 'email'){
                return this.isEmail(this.value) ? true: false
            }
        },
        invalidFeedback () {
            if(this.type== 'email'){
                if(this.isEmail(this.value)===false || this.value.length < 6){
                    return 'Please enter a valid email'
                }
            } else if (this.type === 'password'){
                if (this.value.length > 8) {
                    return ''
                } else if (this.value.length > 0) {
                    return 'Enter at least 8 characters'
                } else {
                    return 'Please enter something'
                }
            }
        },
        validFeedback () {
            return this.state === true ? 'Thank you' : ''
        },
    },
    data () {
        return {
            value: ''
        }
    },
    methods: {
        isEmail(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if(re.test(String(email).toLowerCase())){
                return true
            } else {
                return false
            };
        },
        sendValue(){
            this.$emit('get-value', this.value)
        }
    }, 
    props: ['description', 'label', 'type', 'id']
}
</script>

<!-- form-group-1.vue -->
