<template>
  <div>
    <v-btn-toggle class="btn-list mt-4" :class="verify ? 'pointer-event-none': ''" multiple selected-class="btn--selected">
      <v-btn v-for="answer in answers" ref="buttons" size="x-large" class="mb-4 w-75 btn-list-element btn-color">{{ answer }}</v-btn>
    </v-btn-toggle>
    <v-container>
      <v-alert v-if="verify && explanation && explanation !== ''"
               type="info"
               :text="explanation"
               variant="tonal"
               class="text-left"
      ></v-alert>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ListAnswer",
  data() {
    return {
    }
  },
  props: {
    question: String,
    answers: Array,
    verify: Boolean,
    trueValue: Array,
    explanation: String,
  },
  watch: {
    verify() {
      let buttons = this.$refs.buttons
      let good_answer = 0
      let bad_answer = 0
      let answer = {
        question: this.question,
        type: "list-answer",
        your_answers: [],
        true_answers: [],
        is_valid: false,
      }
      for (let i = 0; i < buttons.length; i++) {
        if (this.trueValue.includes(i)) {
          buttons[i].$el.style.backgroundColor = "#1B5E20"
          buttons[i].$el.style.color = "white"
          answer.true_answers.push(buttons[i].$el.getElementsByClassName("v-btn__content")[0].innerHTML)
          if (buttons[i].$el.classList.contains("btn--selected")) {
            answer.your_answers.push(buttons[i].$el.getElementsByClassName("v-btn__content")[0].innerHTML)
            good_answer++
          }
        } else {
          if (buttons[i].$el.classList.contains("btn--selected")) {
            answer.your_answers.push(buttons[i].$el.getElementsByClassName("v-btn__content")[0].innerHTML)
            buttons[i].$el.style.backgroundColor = "#B71C1C"
            buttons[i].$el.style.color = "#BDBDBD"
            bad_answer++
          } else {
            buttons[i].$el.style.backgroundColor = "#FFEE58"
            buttons[i].$el.style.color = "#616161"
          }
        }
      }
      if (bad_answer === 0 && good_answer === this.trueValue.length) {
        this.$store.commit('incrementScore')
        answer.is_valid = true
      }
      this.$store.commit('addAnswer', answer)
    }
  }
}
</script>

<style>
.btn-list {
  display: grid;
  height: unset !important;
  justify-items: center;
}
.btn-list-element {
  height: calc(var(--v-btn-height) + 0px) !important;
  box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}
.btn-color {
  background-color: #FFEB3B;
}
.btn-color.btn--selected {
  background-color: #1B5E20;
  color: white;
}
.pointer-event-none {
  pointer-events: none;
}
</style>
