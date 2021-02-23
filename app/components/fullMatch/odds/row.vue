<template>
  <v-flex class="d-flex text-center py-1" v-if="valid">
    <v-flex class="oddsType flex-grow-1 caption d-flex align-center justify-center">
      <template v-if="!isDefault">
        {{ getTypeName(type) }}
      </template>
    </v-flex>
    <v-flex class="odd">
      <template v-if="isDefault">
        初盤
      </template>
      <component v-else :is="getComponent(type)" v-bind="{ time: 'first', odds, result }" />
    </v-flex>
    <v-flex class="odd">
      <template v-if="isDefault">
        終盤
      </template>
      <component v-else :is="getComponent(type)" v-bind="{ time: 'latest', odds, result }" />
    </v-flex>
  </v-flex>
</template>

<script>
import { get } from 'lodash'
import HAD from './HAD'
import HHA from './HHA'
import HL from './HL'
import HDC from './HDC'
export default {
  props: {
    type: {
      required: true,
      default: 'default'
    },
    odds: {
      required: false,
      default: () => {
        return []
      }
    },
    result: {
      required: false,
      default: null
    }
  },
  computed: {
    isDefault () {
      return this.type === 'default'
    },
    valid () {
      return get(this, 'odds', []).length === 2
    }
  },
  components: {
    HAD,
    HHA,
    HL,
    HDC,
  },
  methods: {
    getComponent (type) {
      switch (type) {
        case 'HAD':
        case 'FHA':
          return 'HAD'
        case 'HIL':
        case 'FHL':
        case 'CHL':
          return 'HL'
        default:
          return type
      }
    },
    getTypeName (type) {
      return {
        HAD: '主客和',
        FHA: '半場主客和',
        HHA: '讓球主客和',
        HDC: '讓球',
        HIL: '大細',
        FHL: '半場大細',
        CHL: '角球',
      }[type]
    }
  }
}
</script>

<style lang="stylus" scoped>
.oddsType
  width 70px
  flex-basis 70px

.odd
  width calc( 50% - 35px )
  flex-basis calc( 50% - 35px )
</style>