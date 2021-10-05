<template>
  <v-flex class="body-2 align-center d-flex">
    <v-flex class="d-flex text-right odd flex-grow-1 justify-end">
      <v-flex class="flex-grow-0">
        {{ HAD.H }}
      </v-flex>
      <v-flex class="flex-grow-0 mx-2">
        {{ HAD.D }}
      </v-flex>
      <v-flex class="flex-grow-0">
        {{ HAD.A }}
      </v-flex>
      <fake-hdc class="flex-grow-1" v-bind="{ value: FAKE_HDC.value }" />
    </v-flex>
    <v-flex class="result flex-grow-0 flex-shrink-0 text-center">
      <template v-if="!isEmpty(HT)">
        {{ `${HT.home}-${HT.away}` }}
      </template>
    </v-flex>
    <v-flex class="d-flex text-left odd flex-grow-1">
      <template v-if="!isEmpty(HIL)">
        <v-flex class="flex-grow-0 grey--text lighten-2">
          {{ HIL.H }}
        </v-flex>
        <v-flex class="flex-grow-0 mx-2">
          {{ HIL.LINE }}
        </v-flex>
        <v-flex class="flex-grow-0 grey--text lighten-2">
          {{ HIL.L }}
        </v-flex>
      </template>
    </v-flex>
  </v-flex>
</template>

<script>
import { isEmpty } from "lodash";
import FakeHDC from "~/components/fakeHdc";
export default {
  name: "match-header-odds",
  props: {
    HIL: {
      default: {}
    },
    HT: {
      default: {}
    },
    HAD: {
      default: {}
    },
    FAKE_HDC: {
      default: {}
    }
  },
  methods: {
    isEmpty
  },
  components: {
    FakeHDC
  }
};
</script>

<style lang="stylus" scoped>
.result
  flex-basis 50px
  width 50px

.odd
  flex-basis calc( 100% - 50px )
</style>
