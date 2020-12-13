<template>
  <center>
    <img src="@/assets/images/Mix.png" class="w-50" alt="logo" />

    <h1>404 Page Not Found!</h1>
    <p>
      <a href="/">Go home?</a>
    </p>
  </center>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped>
center {
  margin: 8vw;
}

img {
  width: 250px;
  display: block;
  margin: auto;
}
h1 {
  color: var(--border);
  font-size: 2em;
}
</style>