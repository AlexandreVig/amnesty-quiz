<script setup>
import {mdiArrowLeft, mdiArrowRight, mdiCheckCircleOutline} from '@mdi/js'
</script>

<template>
  <main>
    <div class="candle-banner w-100 elevation-3 text-center">
      <img v-if="question.is_french" :src="fr_emoji" alt="french-emoji" height="40">
      <img v-else :src="earth_emoji" alt="international-emoji" height="40">
      <img class="float-right" :src="candle" alt="Amnesty Candle" height="40">
    </div>
    <div v-if="question.type === 'list-answer'" class="text-center">
      <h1 class="text-h3 ma-16 pt-5">{{question.question}}</h1>
      <ListAnswer :true-value="question.true_answers" :answers="question.answers" :verify="verify" :question="question.question" :explanation="question.explanation"></ListAnswer>
      <v-btn v-if="!next" class="mt-16 custom-button" size="x-large" :append-icon="mdiCheckCircleOutline" @click="validateQuestion" color="green-darken-3">Valider</v-btn>
    </div>
    <div v-else-if="question.type === 'round-slider'" class="text-center">
      <h1 class="text-h3 ma-16 pt-5">{{question.question}}</h1>
      <MyRoundSlider :true-value="question.answer" :verify="verify" :question="question.question" :explanation="question.explanation"></MyRoundSlider>
      <v-btn v-if="!next" class="mt-16 custom-button" size="x-large" :append-icon="mdiCheckCircleOutline" @click="validateQuestion" color="green-darken-3">Valider</v-btn>
    </div>
    <div v-else-if="question.type === 'vertical-slider'" class="text-center">
      <h1 class="text-h3 pa-5">{{question.question}}</h1>
      <v-row no-gutters>
        <v-col v-for="i in question.answers.length" :key="i">
          <VerticalSlider :label="question.labels[i-1]" :color="question.color[i-1]" :true-value="question.answers[i-1]" :verify="verify" :explanation="question.explanation"></VerticalSlider>
        </v-col>
      </v-row>
      <v-container class="py-0">
        <v-alert v-if="next && question.explanation && question.explanation !== ''"
                 type="info"
                 :text="question.explanation"
                 variant="tonal"
                 class="text-left"
        ></v-alert>
      </v-container>
      <v-btn v-if="!next" class="mt-5 custom-button" size="x-large" :append-icon="mdiCheckCircleOutline" @click="validateQuestion" color="green-darken-3">Valider</v-btn>
    </div>
    <div v-else-if="question.type === 'true-false'" class="text-center">
      <TrueFalse :title="question.question" :img="question.image" :label="question.label" :verify="verify" :true-value="question.answer" :explanation="question.explanation"></TrueFalse>
      <v-btn v-if="!next" class="mt-16 custom-button" size="x-large" :append-icon="mdiCheckCircleOutline" @click="validateQuestion" color="green-darken-3">Valider</v-btn>
    </div>
    <div v-else-if="question.type === 'select-between'" class="text-center">
      <SelectBetween :title="question.question" :answers_available="question.answers_available" :label="question.label" :img="question.image" :verify="verify" :true-value="question.answer" :explanation="question.explanation"></SelectBetween>
      <v-btn v-if="!next" class="mt-16 custom-button" size="x-large" :append-icon="mdiCheckCircleOutline" @click="validateQuestion" color="green-darken-3">Valider</v-btn>
    </div>
  <div class="text-center">
    <v-btn v-if="next" class="custom-button" :class="question.type === 'vertical-slider' || (question.explanation && question.explanation !== '') ? 'mt-5' : 'mt-16'" size="x-large" :append-icon="mdiArrowRight" @click="nextQuestion" color="yellow">Prochaine question</v-btn>
  </div>
  <div class="text-center">
    <v-btn class="ma-8 mt-16" size="x-large" :prepend-icon="mdiArrowLeft" @click="prevQuestion" color="yellow">{{parseInt($route.params.id) > 0 ? "Question précédente" : "Retour"}}</v-btn>
  </div>
  </main>
</template>

<script>
  import MyRoundSlider from "@/components/MyRoundSlider.vue";
  import ListAnswer from "@/components/ListAnswer.vue";
  import VerticalSlider from "@/components/VerticalSlider.vue";
  import TrueFalse from "@/components/TrueFalse.vue";
  import SelectBetween from "@/components/SelectBetween.vue";
  import candle from "@/assets/bougie_RVB_noire.png";
  import fr_emoji from "@/assets/french-emoji.png";
  import earth_emoji from "@/assets/earth-emoji.png";

  export default {
    name: "PlayView",
    components: {
      SelectBetween,
      TrueFalse,
      VerticalSlider,
      ListAnswer,
      MyRoundSlider
    },
    data() {
      return {
        question: this.$store.state.questions[parseInt(this.$route.params.id)],
        verify: false,
        next: false,
        candle: candle,
        fr_emoji: fr_emoji,
        earth_emoji: earth_emoji,
      }
    },
    mounted() {
      if (this.question.type === 'vertical-slider') {
        this.$store.commit('initVerticalSliderScore')
      }
    },
    methods: {
      validateQuestion() {
        this.verify = true
        this.next = true
      },
      nextQuestion() {
        if (this.question.type === 'vertical-slider') {
          let answer = {
            question: this.question.question,
            type: "vertical-slider",
            labels: this.question.labels,
            your_answers: this.$store.state.verticalSliderDetails,
            true_answers: this.question.answers,
            is_valid: this.$store.state.verticalSliderScore === this.question.answers.length,
          }
          if(this.$store.state.verticalSliderScore === this.question.answers.length) {
            this.$store.commit('incrementScore')
          }
          this.$store.commit('addAnswer', answer)
        }
        if ((parseInt(this.$route.params.id) + 1) !== this.$store.state.questions.length) {
          this.$router.push('/play/' + (parseInt(this.$route.params.id) + 1))
        } else {
          this.$router.push('/result')
        }
      },
      prevQuestion() {
        if (parseInt(this.$route.params.id) === 0) {
          this.$router.push('/')
        } else {
          this.$store.commit('popAnswer')
          this.$router.push('/play/' + (parseInt(this.$route.params.id) - 1))
        }
      }
    }
  }
</script>

<style>
.candle-banner {
  background: #ff0;
  padding: 10px;
  height: 60px;
}

.custom-button {
  padding: 15px 35px !important;
  height: unset !important;
}

.custom-button > .v-btn__content {
  font-size: 1.875rem !important;
  line-height: 2.25rem !important;
}
</style>