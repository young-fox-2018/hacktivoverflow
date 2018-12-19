<template>
    <div id="alert-dismiss">
        <b-alert :variant="varAlert"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
            {{alertMessage}}
        </b-alert>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            showDismissibleAlert: false
        }
    },
    computed: {
        ...mapState(['varAlert', 'alertMessage', 'mustLogin'])
    },
}
</script>

