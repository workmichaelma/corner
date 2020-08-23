<template>
  <v-toolbar dense height="80">
    <v-flex class="d-flex flex-column col-12 pa-0" :style="{height: '100%'}">
      <v-flex class="d-flex" :style="{minHeight: 'fit-content'}">
        <v-flex class="d-flex align-center switch">
          <div>
            <v-switch v-model="showSameSide" label="只顯示同主客" dense inset hide-details :disabled="disabled" />
          </div>
        </v-flex>
        <v-flex class="d-flex align-center switch">
          <div>
            <v-switch v-model="showSameLeague" label="只顯示同賽事" dense inset hide-details :disabled="disabled" />
          </div>
        </v-flex>
      </v-flex>
      <v-divider class="my-2" />
      <v-flex class="d-flex col-12 pa-0" :style="{minHeight: 'fit-content'}">
        <v-flex class="d-flex align-center switch flex-grow-0">
          <div>
            <v-switch v-model="showSimilarOdd" label="只顯示相近主勝" dense inset hide-details :disabled="disabled" />
          </div>
        </v-flex>
        <v-flex class="d-flex slider caption">
          <v-range-slider
            :value="sliderPositions"
            class="align-center"
            min="0"
            :max="slider.max"
            :tick-size="slider.tick.length"
            :tick-labels="slider.tick"
            :disabled="!showSimilarOdd || disabled"
            ticks="always"
            step="1"
            hide-details
            @change="update"
          />
        </v-flex>
      </v-flex>
    </v-flex>
  </v-toolbar>
</template>
<script>
import isEmpty from 'lodash/isEmpty'
import Match from '~/mixins/match'
export default {
  mixins: [
    Match
  ],
  props: {
    match: {
      required: true,
      default: {}
    },
    updateControlConfig: {
      required: true,
      type: Function
    },
    disabled: {
      required: true,
      default: false
    }
  },
  data () {
    return {
      showSameSide: false,
      showSameLeague: false,
      showSimilarOdd: false,
      sliderPositions: [0, 4]
    }
  },
  computed: {
    slider () {
      const H = this.HAD_1.H
      return {
        max: 4,
        tick: [
          (H * 0.9).toFixed(2),
          (H * 0.95).toFixed(2),
          H,
          (H * 1.05).toFixed(2),
          (H * 1.1).toFixed(2)
        ]
      }
    },
    oddsRange () {
      const [min, max] = this.sliderPositions
      if (isEmpty(this.sliderPositions)) return null
      return {
        min: this.slider.tick[min] || head(this.slider.tick),
        max: this.slider.tick[max] || last(this.slider.tick)
      }
    },
    config () {
      return {
        showSameSide: this.showSameSide,
        showSameLeague: this.showSameLeague,
        showSimilarOdd: this.showSimilarOdd,
        oddsRange: this.showSimilarOdd ? this.oddsRange : null
      }
    }
  },
  methods: {
    update (e) {
      this.sliderPositions = e
    }
  },
  watch: {
    config: {
      handler (v) {
        if (!v.showSimilarOdd) {
          this.sliderPositions = [0, 4]
        }
        this.updateControlConfig(v)
      },
      deep: true
    },
  }
}
</script>
<style lang="stylus" scoped>
.switch
  height 25px
  > div:not(.slider)
    transform scale(0.7)
    transform-origin 0 100%
.slider
  height 30px
  transform translateY(-5px)
  margin-left -30px
  >>> .v-slider__tick-label
    font-size 11px

</style>