<script setup>
import { mdiSync, mdiArrowRight } from '@mdi/js'
</script>

<template>
  <main>
    <div class="logo-banner w-100 text-center elevation-3">
      <img :src="logo" alt="Amnesty Logo">
    </div>
    <div class="position-absolute w-50 text-center quiz-selection-input">
      <v-select
          v-model="selectValue"
          :items="selectItems"
          item-title="title"
          item-value="value"
          return-object
      ></v-select>
      <v-btn class="mt-16" size="x-large" :append-icon="mdiArrowRight" @click="selectTheme">Démarrer</v-btn>
    </div>
    <v-btn :icon="mdiSync" size="x-large" class="sync-button position-absolute">
    </v-btn>
  </main>
</template>

<script>
  import logo from '@/assets/logo.svg'

  export default {
    name: "HomeView",
    data() {
      return {
        logo: logo,
        lastSelectBool: false,
        selectValue: { title: 'EDH', value: 1 },
        selectItems: [
          { title: 'EDH', value: 1 },
        ]
      }
    },
    mounted() {
      this.$store.commit('initScore')
      this.$store.commit('initAnswer')
    },
    methods: {
      selectTheme() {
        window.localStorage.setItem("QuizThemeName", this.selectValue.title)
        window.localStorage.setItem("QuizThemeIndex", this.selectValue.value)
        this.$router.push('/play/0')
      },
    }
  }
</script>

<style>
.logo-banner {
  background: #ff0;
}

.sync-button {
  right: 0;
  bottom: 0;
  margin: 3rem;
}

.quiz-selection-input {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>