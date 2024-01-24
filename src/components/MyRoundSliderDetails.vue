<template>
  <div class="text-center text-h5">
    {{ answer.question }}
  </div>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="pa-2 ma-2 text-center">
        <p>
          Vous aviez répondu :
          <br>
          <b>{{ answer.your_answers[0] }}%</b>
        </p>
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ma-2 text-center">
        <p>
          La réponse étaient :
          <br>
          <b>{{ answer.true_answers[0] }}%</b>
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MyRoundSliderDetails",
  props: {
    answer: Object
  }
}
</script>
