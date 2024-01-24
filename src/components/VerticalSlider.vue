<script setup>
import {mdiPlusCircleOutline, mdiMinusCircleOutline} from '@mdi/js'
</script>
<template>
  <img ref="sliderOverlay" class="slider-overlay" src="@/assets/ruler_overlay-min.svg" alt="ruler-overlay" />
  <v-slider
      ref="slider"
      :class="{ 'disable-for-verify' : verify }"
      v-model="value"
      direction="vertical"
      :label="label"
      track-size="200"
      rounded="0"
      min="0"
      max="100"
      step="0.05"
      :track-color="color"
      :color="color"
      :thumb-label="verify ? 'always' : false"
      hide-details
  >
    <template v-slot:prepend>
      <v-text-field
          v-model="value"
          hide-details
          single-line
          density="compact"
          type="number"
          style="width: 70px"
      ></v-text-field>
      <div style="width: min-content">
        <v-btn :icon="mdiPlusCircleOutline" variant="plain" size="x-small" @click="addValue"></v-btn>
        <v-btn :icon="mdiMinusCircleOutline" variant="plain" size="x-small" @click="minusValue"></v-btn>
      </div>
    </template>
  </v-slider>
</template>

<script>
export default {
  name: "VerticalSlider",
  data() {
    return {
      value: 0,
    }
  },
  props: {
    label: String,
    color: String,
    verify: Boolean,
    trueValue: Number,
    explanation: String,
  },
  mounted() {
    let slider = this.$refs.slider.$el.querySelector(".v-slider__container")
    let slider_rect = slider.getBoundingClientRect();
    this.$refs.sliderOverlay.style.left = slider_rect.x + "px"
    this.$refs.sliderOverlay.style.top = slider_rect.y + "px"
  },
  watch: {
    verify(newValue) {
      if (newValue) {
        this.$store.commit('addVerticalSliderDetails', parseFloat(this.value))
        if (parseFloat(this.value) === this.trueValue) {
          this.$store.commit('incrementVerticalSliderScore')
        }
        this.value = this.trueValue
        let element = this.$refs.slider.$el.getElementsByClassName("v-slider-thumb__label")[0].children[0]
        element.innerHTML = this.trueValue + ' %'
      }
    }
  },
  methods: {
    addValue() {
      this.value = parseFloat((this.value + 0.05).toFixed(2))
      if (this.value > 100) {
        this.value = 100
      }
    },
    minusValue() {
      this.value = parseFloat((this.value - 0.05).toFixed(2))
      if (this.value < 0) {
        this.value = 0
      }
    }
  }
}
</script>

<style>
.v-slider {
  height: 850px;
}
.v-input__prepend {
  margin-top: 5em;
}
.v-slider-thumb__surface {
  display: none;
}
.v-slider-thumb__label {
  z-index: 9999;
  position: absolute;
  left: 50% !important;
  transform: translateX(-50%);
  font-size: 28px;
  padding: 20px 15px;
  height: 1em;
  width: max-content;
  text-align: center;
}
.v-slider-thumb__label:before {
  display: none;
}
.disable-for-verify {
  pointer-events: none;
}
.disable-for-verify .v-slider-thumb__label {
  color: #00e100;
}
.slider-overlay {
  z-index: 999;
  width: 200px;
  height: 770px;
  position: absolute;
  pointer-events: none;
}
</style>
