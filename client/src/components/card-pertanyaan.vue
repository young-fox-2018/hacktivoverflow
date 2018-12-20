<template>
    <div class="card mb-3">
        <div class="card-header">
            <headercard :tanya="tanya"/>
        </div>
        <div :id="'k'+tanya._id" class="collapse">
            <div class="card-body py-2">
                <h5 class="display-5 text-success font-weight-bold bg-dark py-2 px-1" style="text-transform : capitalize">{{ tanya.title}}</h5>
                <hr>
                <div class="container">
                    <blockquote class="blockqoute text-center py-3" style="background : #b8b894">
                        {{tanya.description}}
                    </blockquote>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <listjawaban :jawaban ="tanya.jawaban"/>
                    </div>
                    <div class="col-lg-6">
                        <formjawab :idpertanyaan="tanya._id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headercard from '@/components/header-card-pertanyaan.vue'
import listjawaban from '@/components/jawaban-list.vue'
import formjawab from '@/components/form-jawab.vue'
export default {
    components : {
        headercard, listjawaban, formjawab
    },
    props : ['tanya']
}
</script>
