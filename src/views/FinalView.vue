<script setup>
import {mdiArrowRight, mdiCheckCircleOutline} from '@mdi/js'
import ListAnswerDetails from "@/components/ListAnswerDetails.vue";
import MyRoundSliderDetails from "@/components/MyRoundSliderDetails.vue";
import SelectBetweenDetails from "@/components/SelectBetweenDetails.vue";
import TrueFalseDetails from "@/components/TrueFalseDetails.vue";
import VerticalSliderDetails from "@/components/VerticalSliderDetails.vue";
</script>

<template>
  <main>
    <div class="candle-banner w-100 text-right elevation-3">
      <img :src="candle" alt="Amnesty Candle" height="40">
    </div>
    <v-container>
      <v-card variant="tonal" class="text-center">
        <template v-slot:title>
          <div class="text-h3 font-weight-bold text-uppercase ma-4">Votre score...</div>
        </template>

        <template v-slot:text>
          <div class="text-h5">
          Vous avez bien répondu à <b>{{ $store.state.score }}</b> question{{ $store.state.score > 1 ? 's' : '' }} sur <b>{{ $store.state.answers.length }}</b>
          </div>
        </template>
      </v-card>
      <br>
      <v-expansion-panels>
        <v-expansion-panel
            title="Voir les détails"
        >
          <v-expansion-panel-text>
            <v-expansion-panels>
              <v-expansion-panel
                  v-for="(answer, index) of $store.state.answers"
              >
                <v-expansion-panel-title>
                  <v-row no-gutters class="align-center">
                    <v-col cols="2" class="d-flex justify-start">
                      Question {{ index + 1 }}
                    </v-col>
                    <v-col cols="2" class="d-flex">
                      <div class="rounded-circle" :class="answer.is_valid ? 'bg-green' : 'bg-red'">
                        <v-icon v-if="answer.is_valid" :icon="mdiCheck" color="white"></v-icon>
                        <v-icon v-else :icon="mdiClose" color="white"></v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ListAnswerDetails v-if="answer.type === 'list-answer'" :answer="answer"/>
                  <MyRoundSliderDetails v-else-if="answer.type === 'round-slider'" :answer="answer"/>
                  <SelectBetweenDetails v-else-if="answer.type === 'select-between'" :answer="answer"/>
                  <TrueFalseDetails v-else-if="answer.type === 'true-false'" :answer="answer"/>
                  <VerticalSliderDetails v-else-if="answer.type === 'vertical-slider'" :answer="answer"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <div class="text-center">
      <v-btn class="custom-button ma-16" size="x-large" :prepend-icon-icon="mdiArrowRight" @click="returnHome" color="yellow">Retour</v-btn>
    </div>
  </main>
</template>

<script>
  import candle from "@/assets/bougie_RVB_noire.png";
  import {mdiCheck, mdiClose} from "@mdi/js";

  export default {
    name: "FinalView",
    data() {
      return {
        questions: this.$store.state.questions,
        candle: candle,
        mdiCheck: mdiCheck,
        mdiClose: mdiClose
      }
    },
    methods: {
      returnHome() {
        this.$router.push("/")
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
</style>