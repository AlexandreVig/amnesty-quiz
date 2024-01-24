<template>
  <div class="text-center text-h5">
    {{ answer.question }}
  </div>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="pa-2 ma-2 text-center">
        <dl>
          <dt>Vous aviez répondu :</dt>
          <dd v-for="a of answer.your_answers">- {{ a }}</dd>
        </dl>
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ma-2 text-center">
        <dl>
          <dt>Les réponses étaient :</dt>
          <dd v-for="a of answer.true_answers">- {{ a }}</dd>
        </dl>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ListAnswerDetails",
  props: {
    answer: Object
  }
}
</script>
