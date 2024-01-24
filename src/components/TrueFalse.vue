<template>
  <div>
    <div class="label text-center mt-16">
      <div class="text-h2 pb-4">
        {{ this.title }}
      </div>
      <img :src="this.img">
      <div class="text-h3" :class="this.showAnswer === null ? 'pb-16' : ''">
        {{ this.label }}
      </div>
      <div v-if="this.showAnswer !== null" class="text-h1 rounded-circle mt-4 validation-icon" :class="this.showAnswer ? 'bg-green' : 'bg-red'">
        <div v-if="this.showAnswer">
          <v-icon :icon="mdiCheck()" color="white"></v-icon>
        </div>
        <div v-else>
          <v-icon :icon="mdiClose()" color="white"></v-icon>
        </div>
      </div>
    </div>
    <v-btn-toggle class="v-row justify-space-around btn-list-true-false w-100 py-16 my-4 mx-0" :class="showAnswer !== null ? 'pointer-event-none': ''" selected-class="active-btn" ref="true-false">
      <v-btn class="btn-list-element ma-2 px-16 py-8 align-content-center text-white bg-green-lighten-2" color="green-darken-4" size="x-large" value="true">Vrai</v-btn>
      <v-btn class="btn-list-element ma-2 px-16 py-8 align-content-center text-white bg-red-lighten-2" color="red-darken-4" size="x-large" value="false">Faux</v-btn>
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
import {mdiCheck, mdiClose} from "@mdi/js";

export default {
  name: "TrueFalse",
  methods: {
    mdiClose() {
      return mdiClose
    },
    mdiCheck() {
      return mdiCheck
    }
  },
  data() {
    return {
      showAnswer: null,
    }
  },
  props: {
    title: String,
    label: String,
    img: String,
    verify: Boolean,
    trueValue: Boolean,
    explanation: String,
  },
  watch: {
    verify(newValue) {
      if (newValue) {
        let answer = {
          question: this.title,
          type: "true-false",
          label: this.label,
          your_answers: [],
          true_answers: [this.trueValue ? "Vrai" : "Faux"],
          is_valid: false,
        }
        let selected_btn = this.$refs["true-false"].$el.getElementsByClassName("active-btn")
        for (let btn of selected_btn) {
          answer.your_answers.push(btn.getElementsByClassName("v-btn__content")[0].innerHTML)
        }
        if (this.trueValue) {
          if (!this.$refs["true-false"].$el.children[0].classList.contains("active-btn")) {
            this.$refs["true-false"].$el.children[0].click()
          }
        } else {
          if (!this.$refs["true-false"].$el.children[1].classList.contains("active-btn")) {
            this.$refs["true-false"].$el.children[1].click()
          }
        }
        this.showAnswer = selected_btn.length !== 0 && this.trueValue.toString() === selected_btn[0].value
        if (this.showAnswer) {
          this.$store.commit('incrementScore')
          answer.is_valid = true
        }
        this.$store.commit('addAnswer', answer)
      }
    }
  },
}
</script>

<style>
.btn-list-true-false {
  height: unset !important;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.btn-list-element {
  height: calc(var(--v-btn-height) + 0px) !important;
  box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  font-size: xx-large;
}
.pointer-event-none {
  pointer-events: none;
}
.validation-icon {
  width: min-content;
  margin: auto auto -96px;
}
</style>
