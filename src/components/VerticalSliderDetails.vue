<template>
  <div class="text-center text-h5">
    {{ answer.question }}
  </div>
  <div v-for="i in answer.labels.length">
    <div class="text-center text-h6">
      {{ answer.labels[i - 1] }}
    </div>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2 text-center">
          <p>
            Vous aviez répondu :
            <br>
            <b>{{ answer.your_answers[i - 1] }}%</b>
          </p>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2 text-center">
          <p>
            La réponse étaient :
            <br>
            <b>{{ answer.true_answers[i - 1] }}%</b>
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </div>

</template>

<script>
export default {
  name: "VerticalSliderDetails",
  props: {
    answer: Object
  }
}
</script>
