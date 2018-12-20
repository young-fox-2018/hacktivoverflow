<template>
  <div class="home">
    <div class="row">
      <div class="col-3" id="sideBarLeft">

      </div>
      <div class="col-6 h-100" id="mainContainer">
        <div class="row h-10 justify-content-between" id="question">
          <h3> Questions</h3>
          <button class="btn btn-primary" id="newQuestionButton">Write New Question</button>
        </div>
        <div class="row ">
          <!-- questions components-->
          <Question></Question>
        </div>
        <div class="row h-10 justify-content-between" id="answer">
            <h3 id="answerTitle"> Answer</h3>
            <button class="btn btn-primary"  id="newAnswerButton">Answer This Question</button>
        </div>
      </div>
      <div class="col-2 " id="sidebarRight">

      </div>
    </div>
  </div>
</template>

<script>
import Question from '@/components/Question.vue'

export default {
  name: 'home',
  components: {
    Question
  }
}
</script>

<style>
#newAnswerButton {
  margin-right: 20px;
  margin-top: 20px;
}
#newQuestionButton {
  margin-right: 20px;
  justify-self:self-end
}
#sideBarLeft {
  height: 100vh;
  border-right: 4px dotted gray;
}
#sidebarRight {
  height: 100vh;
  border-left: 4px dotted gray;
}
#questionContainer {
  height: 100vh;
}
#question {
  margin-top: 10px;
  margin-left: 15px;
  margin-bottom: 30px
}
#mainContainer {
  margin-top: 10px;
}
#answer {
  margin-bottom: 30px;
  border-top: 5px dotted silver;
}
#answerTitle {
  margin-left: 30px;
  margin-top: 20px
}
</style>
