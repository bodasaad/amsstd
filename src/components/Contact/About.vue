<template>
  <div class="column active" data-column="one" id="colOne" data-size="1" ref="about">
    <a class="enlarge button-pill" ref="button">About</a>
    <div class="flex f-space-between column-head">
      <div class="items__title" :class="[{'flex': !activefilters}, { 'none': activefilters}]">
        <span>About</span>
      </div>
    </div>
    <div class="information__text">
      <p>What does it mean to elevate the human experience?</p>
      <p>AMS-Studio is a software and digital resources studio based in Egypt with a timeless approach that fosters connection.</p>
      <p>Every detail is thoughtfully considered, coalescing in work that forges new ground while remaining true to our philosophy and vision.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import * as helpers from "@/helpers/home";
let $ = require("jquery");

export default {
  name: "Articles",
  data() {
    return {
      activefilters: false,
      allarticles: []
    };
  },
  computed: {
    ...mapState(["one", "two", "colWidth", "categories"]),
    ...mapState("studio", ["fetching", "filtredArticles"]),
    ...mapGetters("studio", ["filterArticle"])
  },
  props: ["articles"],
  mounted() {
    this.$emit("created", { col: "articles" });
  },
  created() {
    this.allarticles = this.articles;
  },
  methods: {
    shrink() {
      helpers.changePositions({
        one: { right: 66.6, left: 33.3 },
        two: { right: 33.3, left: 66.6 }
      });
      helpers.shrink();
    },

    filter(type, e) {
      $(".filters__filter-set .button-pill").removeClass("active");
      $(e.target).addClass("active");
      this.filterArticle(type);
    }
  },
  watch: {
    filtredArticles(v) {
      this.allarticles = v;
    },
    articles(v) {
      this.allarticles = v;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#editBox {
  position: absolute;
  background: #ffffffeb;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: 999999;
}
.post .create-post_pop-up.Unactive {
  display: none;
}
.allarticles #loading {
  height: 35px;
  width: 100px;
}
#imgPrv {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.598);
  height: 100%;
  width: 100%;
  z-index: 99999;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: 0.5s all ease-in-out;
}
#imgPrv img {
  height: auto;
  position: relative;
  max-width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (min-width: 320px) and (max-width: 557px) {
}
</style>
