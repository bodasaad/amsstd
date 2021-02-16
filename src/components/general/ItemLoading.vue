<template>
  <div class="loading-item">
    <div class="logo">
      <img src="/img/word.7c99b425.png" alt="logo" />
    </div>
    <div class="loading-item-cell">
      <div class="image"></div>
      <div class="text">
        <div class="text-line"></div>
        <div class="text-line"></div>
        <div class="text-line"></div>
        <div class="text-line"></div>
      </div>
    </div>
    <div class="loading-item-cell">
      <div class="image"></div>
      <div class="text">
        <div class="text-line"></div>
        <div class="text-line"></div>
        <div class="text-line"></div>
        <div class="text-line"></div>
      </div>
    </div>
    <div class="loading-item-cell">
      <div class="image"></div>
      <div class="text">
        <div class="text-line"></div>
        <div class="text-line"></div>
        <div class="text-line"></div>
        <div class="text-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style>
.loading-item {
  padding-top: 17vh;
  background: #fff;
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  z-index: 9999;
}

.loading-item-cell {
  margin-bottom: 30px;
  height: 300px;
  padding: var(--m-padding);
  border: 1px solid #eee;
}

@-webkit-keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
.animated-background,
.text-line,
.image {
  -webkit-animation-duration: 1.25s;
  animation-duration: 1.25s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: placeHolderShimmer;
  animation-name: placeHolderShimmer;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  background: #f6f6f6;
  background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
  background-size: 800px 104px;
  height: 96px;
  position: relative;
}

.image {
  height: 200px;
  margin-bottom: var(--m-margin);
}

.text-line {
  height: 10px;
  width: 100%;
  margin: 4px 0;
}
</style>