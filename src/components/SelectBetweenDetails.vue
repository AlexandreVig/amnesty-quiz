<template>
  <div class="text-center text-h5">
    {{ answer.question }}
    <div class="text-h6">
      Entre {{ answer.available_answers.join(' , ').replaceLast(",", "et").toLowerCase() }}
      <br>
      {{ answer.label }}
    </div>
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
  name: "SelectBetweenDetails",
  props: {
    answer: Object
  },
  beforeMount() {
    if (!String.prototype.replaceLast) {
      String.prototype.replaceLast = function(find, replace) {
        let index = this.lastIndexOf(find);
        if (index >= 0) {
          return this.substring(0, index) + replace + this.substring(index + find.length);
        }
        return this.toString();
      };
    }
  }
}
</script>
