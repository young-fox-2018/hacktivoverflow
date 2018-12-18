<template>
    <div class="row">
        <div class="col-2 d-flex flex-column">
            <i class="fas fa-caret-up fa-3x vote"></i>
            <!-- isi dengan firebase -->
            0
            <i class="fas fa-caret-down fa-3x vote"></i>
        </div>
        <div class="col-10">
            <p>{{answer.content}}</p>

            <p> answered "time"</p>
                {{answer.author}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: ['answer', 'answerId']
}
</script>

