<template>
    <div>
        
        <h3 style="font-family: 'Lobster', cursive;">
            My Question
            <button class="btn btn-outline-warning btn-sm" @click="modalAddQuestion=true">Add Question</button>
        </h3>
        <hr>

        <Card
            v-for="(data, index) in allQuestion" :key="index"
            :question="data"
            :user-aktif="userAktif"
            @delete="actionDelete"
            @edit="actionEdit"
        />

        <router-view />
        
        <ModalAddQuestion
            v-if="modalAddQuestion"
            @close="close('modalAddQuestion')"
            @add-succes="succes('modalAddQuestion')"
        />
        <ModalEditQuestion
            v-if="modalEditQuestion"
            @close="close('modalEditQuestion')"
            @edit-succes="succes('modalEditQuestion')"
            :question="questionActive"
        />
        <ModalDeleteQuestion
            v-if="modalDeleteQuestion"
            @close="close('modalDeleteQuestion')"
            @delete-succes="succes('modalDeleteQuestion')"
            :question="questionActive"
        />

    </div>
</template>

<script>
    import Card from '@/components/Card.vue';
    import ModalAddQuestion from '@/components/ModalAddQuestion.vue';
    import ModalEditQuestion from '@/components/ModalEditQuestion.vue';
    import ModalDeleteQuestion from '@/components/ModalDeleteQuestion.vue';
    import apiHacktiv from '@/config/api-hacktivoverflow.js';
    import { mapState } from 'vuex';
    import { mapActions } from 'vuex';
    
    export default {
        name: 'MyQuestion',
        data() {
            return {
                modalAddQuestion: false,
                modalEditQuestion: false,
                modalDeleteQuestion: false,
                questionActive: null,
            };
        },
        components: {
            Card, ModalAddQuestion, ModalEditQuestion, ModalDeleteQuestion 
        },
        created() {
            this.getAllQuestion();
        },
        computed: {
            ...mapState({
                allQuestion: state => state.allQuestion,
                userAktif: state => state.userAktif,
            }),
        },
        methods: {
            ...mapActions(['getAllQuestion']),
            close(whatModal) {
                this[whatModal] = false;
            },
            succes(whatModal) {
                this.getAllQuestion()
                    .then(() => {
                        this[whatModal] = false;
                        this.questionActive = null;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            actionEdit(question) {
                this.questionActive = question;
                this.modalEditQuestion = true;
            },
            actionDelete(question) {
                this.questionActive = question;
                this.modalDeleteQuestion = true;
            },
        },
    };
</script>
