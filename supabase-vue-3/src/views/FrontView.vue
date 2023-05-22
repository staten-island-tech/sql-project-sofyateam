<template>
  <div>
    <h1 v-if="session" :session="session">enter info</h1>
  </div>
</template>

<script>
export default {};
const session = ref();
</script>

<style scoped></style>
