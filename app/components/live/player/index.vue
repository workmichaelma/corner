<template>
  <iframe :src="src" width="100%" height="390px" />
</template>

<script>
export default {
  name: "player",
  props: {
    src: {
      required: true,
      default: ""
    }
  }
};
</script>

<style></style>
