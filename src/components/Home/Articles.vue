<template>
  <div
    class="column"
    data-column="one"
    id="colOne"
    data-size="1"
    ref="articles"
    :class="[{'loading': loading}]"
  >
    <ItemLoading v-if="loading"></ItemLoading>
    <div class="reload" v-if="reload">
      <h1>Hmmm...</h1>
      <p>It seems you lost your connection, please try again.</p>
      <button class="button-pill bg-main" @click="getArticles()">Reload</button>
    </div>

    <div v-if="!loading">
      <a class="enlarge button-pill" ref="button" @click="expand()">Articles</a>
      <div class="flex f-space-between column-head">
        <div class="items__title" :class="[{'flex': !activefilters}, { 'none': activefilters}]">
          <span @click="expanded ? shrink() : expand()">Blog</span>
          <span>
            <i
              class="fas"
              :class="[{'fa-arrows-alt-h': !expanded}, { 'fa-times': expanded}]"
              @click="expanded? shrink():expand()"
            ></i>
          </span>
        </div>
        <div class="filters" style="right: 124px;">
          <div :class="[{'none': !activefilters}, { 'filters__filters': activefilters}]">
            <div class="filters__filter-set">
              <a
                class="button-pill button-pill--small active all"
                @click="filter('all', $event)"
              >All</a>

              <a
                v-for="c in categories"
                :key="c._id"
                class="button-pill button-pill--small"
                :data-article-id="c.name"
                @click="filter(c.name , $event)"
              >{{c.name}}</a>
            </div>
          </div>
          <div class="filters__toggle">
            <div class="button-extend button-extend--small button-extend--with-hover show">
              <div class="button-extend__icon" v-on:click="activefilters = !activefilters">
                <svg
                  v-if="!activefilters"
                  class="icon-filter"
                  width="7"
                  height="5"
                  viewBox="0 0 7 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 4.5H7" stroke="black" />
                  <path d="M0 0.5H7" stroke="black" />
                </svg>

                <svg
                  v-if="activefilters"
                  class="icon-cross"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.146484 9.14722L9.14722 0.146484L9.85433 0.853591L0.853591 9.85433L0.146484 9.14722Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.853637 0.14712L9.85361 9.14706L9.1465 9.85417L0.146531 0.854228L0.853637 0.14712Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="items" v-if="allarticles.length > 0">
        <!-- <img id="loading" v-if="fetching" class="loading" src="@/assets/loading2.gif" /> -->
        <Article v-for="article in allarticles" :key="article._id" :article="article"></Article>
      </div>
      <div v-if="allarticles.length == 0">
        <img
          class="w-75 m-auto block"
          src="../../assets/images/noresult.svg"
          style="margin-top:15px"
          alt
          srcset
        />
      </div>
    </div>
  </div>
</template>

<script>
import Article from "@/components/Articles/article-components/ArticleComponent";
import ItemLoading from "@/components/general/ItemLoading.vue";
import { mapGetters, mapState } from "vuex";
import * as helpers from "@/helpers/home";
let $ = require("jquery");

export default {
  name: "Articles",
  data() {
    return {
      activefilters: false,
      allarticles: [],
      expanded: false,
      loading: false,
      reload: false
    };
  },
  components: {
    Article,
    ItemLoading
  },
  computed: {
    ...mapState(["one", "two", "colWidth", "categories"]),
    ...mapState("studio", ["fetching", "filtredArticles", "articles"]),
    ...mapGetters("studio", ["filterArticle"])
  },
  mounted() {
    this.$emit("created", { col: "articles" });
  },
  created() {
    // this.allarticles = this.articles;
    this.getArticles();
  },
  methods: {
    async getArticles() {
      if (this.articles.length == 0) {
        this.loading = true;
        this.reload = false;

        const res = await this.$store.dispatch({
          type: "studio/getAllArticles"
        });
        this.allarticles = this.articles;
        if (!res) {
          this.loading = false;
          this.reload = true;
        }
      } else {
        this.allarticles = this.articles;

        this.loading = false;
      }
    },
    shrink() {
      this.expanded = false;
      helpers.changePositions({
        one: { right: 66.6, left: 33.3 },
        two: { right: 33.3, left: 66.6 }
      });
      helpers.shrink();
    },
    expand() {
      this.expanded = true;

      helpers.changePositions({
        one: { right: 10, left: this.two.min - 5 },
        two: { right: 100 - this.two.min, left: this.two.min }
      });
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
      this.loading = false;
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
