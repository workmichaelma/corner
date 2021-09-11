<template>
  <v-flex>
    <span class="red--text darken-1 front">{{ v.front }}</span>
    {{ v.v }}
  </v-flex>
</template>

<script>
import { startsWith } from "lodash";
export default {
  name: "FakeHDC",
  props: {
    value: {
      default: "",
      required: true
    }
  },
  computed: {
    v() {
      const hasMinus = startsWith(this.value, "-");
      return {
        front: (hasMinus && "*") || "",
        v: hasMinus ? this.value.substr(1) : this.value
      };
    }
  }
};
</script>

<style lang="stylus">
.front
  margin-right -3px
</style>
