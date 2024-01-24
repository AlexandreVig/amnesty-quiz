<template>
  <round-slider
      v-model="sliderValue"
      class="round-slider"
      start-angle="90"
      radius="275"
      width="125"
      handleSize="300"
      :range-color="verify ? '#4CAF50' : colorPalette[color].range"
      :path-color="colorPalette[color].path"
      :editable-tooltip="false"
      :tooltip-format="formatSlide"
      :disabled="verify"
      ref="round-slider"
      :key="verify"
  />
  <v-container>
    <v-alert v-if="verify && explanation && explanation !== ''"
             type="info"
             :text="explanation"
             variant="tonal"
             class="text-left"
    ></v-alert>
  </v-container>
</template>

<script>
import RoundSlider from '@artem9989/vue-three-round-slider'
export default {
  name: "MyRoundSlider",
  components: {
    RoundSlider
  },
  data() {
    return {
      sliderValue: 0,
      colorPalette: {
        orange: {
          range: "orange",
          path: "#FFF7B4"
        },
        purple: {
          range: "purple",
          path: "#D9ADE1"
        },
        blue: {
          range: "blue",
          path: "#ABD7FA"
        }
      }
    }
  },
  props: {
    question: String,
    label: String,
    color: {
      type: String,
      default: "orange"
    },
    verify: Boolean,
    trueValue: Number,
    explanation: String,
  },
  watch: {
    verify(newValue) {
      if (newValue) {
        let answer = {
          question: this.question,
          type: "round-slider",
          your_answers: [this.sliderValue],
          true_answers: [this.trueValue],
          is_valid: this.sliderValue === this.trueValue,
        }
        if (this.sliderValue === this.trueValue) {
          this.$store.commit('incrementScore')
        }
        this.sliderValue = this.trueValue
        this.$store.commit('addAnswer', answer)
      }
    }
  },
  methods: {
    formatSlide(e) {
      return e.value + " %"
    }
  }
}
</script>

<style>
.rs-tooltip-text {
  font-size: 4.5rem !important;
}
.rs-handle {
  opacity: 0 !important;
}
.rs-disabled {
  opacity: 1 !important;
}
.round-slider {
  left: 50%;
  transform: translateX(-50%);
}
</style>
