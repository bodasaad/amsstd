<template>
  <div>
    <router-link :to="{name:'home'}" class="button-pill button-pill--icon m-medium close">
      <svg
        data-v-4fdd230d
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon-cross">
        <path
          data-v-4fdd230d
          d="M0.146484 9.14722L9.14722 0.146484L9.85433 0.853591L0.853591 9.85433L0.146484 9.14722Z"
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="black"
        />
        <path
          data-v-4fdd230d
          d="M0.853637 0.14712L9.85361 9.14706L9.1465 9.85417L0.146531 0.854228L0.853637 0.14712Z"
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="black"
        />
      </svg>
    </router-link>
    <loadingCom v-if="enter"></loadingCom>
    <div v-if="!enter" class="columns opacity-none">
      <Contacts ref="contacts"></Contacts>
      <About ref="about"></About>
      <!-- <People ref="people"></People> -->
      <!-- <Rails :loading="loading" ref="rails" :refs="this.$refs"></Rails> -->
    </div>
    <div class="columns-footer" v-if="!enter">
      <div class="columns-footer__menu">
        <div class="columns-footer__menu-item" @click="activeColumn('one', $event)">
          <div class="button-pill active" data-column="one">About</div>
        </div>
        <div class="columns-footer__menu-item" @click="activeColumn('two', $event)">
          <div class="button-pill" data-column="two">Contacts</div>
        </div>
        <!-- <div class="columns-footer__menu-item" @click="activeColumn('three', $event)">
          <div class="button-pill" data-column="three">Studio</div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import loadingCom from "@/components/general/homeloading.vue";
import Contacts from "@/components/Contact/Contacts.vue";
import About from "@/components/Contact/About.vue";
import People from "@/components/Contact/People.vue";
import Rails from "@/components/Contact/Rails.vue";
import * as helpers from "@/helpers/home";
let $ = require("jquery");

import { mapState } from "vuex";
export default {
  name: "Contact",
  data() {
    return {
      windowWidth: window.innerWidth,
      shiftX: null,
      shiftY: null,
      loading: true,
      enter: true
    };
  },
  components: {
    Contacts: Contacts,
    About: About,
    People: People,
    Rails: Rails,
    loadingCom: loadingCom
  },
  computed: {
    ...mapState(["one", "two", "colWidth"]),
    ...mapState("studio", ["articles", "projects", "ready"])
  },
  mounted() {
    // if (this.ready == 2) {
    this.start();
    // }
    this.loading = false;

    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  async created() {
    // if (this.articles.length == 0) {
    //   this.$store.dispatch({ type: "studio/getAllArticles" });
    // }
    // if (this.projects.length == 0) {
    //   this.$store.dispatch({ type: "studio/getAllProjects" });
    // }
    // helpers.calcColumn();
  },

  methods: {
    start() {
      helpers.shrink();
      this.enter = false;
    },
    checkFiltertion() {
      const type = this.$route.query.type;
      const category = this.$route.params.category;
      if (type && category) {
        if (type === "article") {
          this.$refs.articles.activefilters = true;
          document.querySelector(`a[data-article-id="${category}"]`).click();
          this.$refs.articles.expand();
        } else {
          this.$refs.projects.activefilters = true;
          document.querySelector(`a[data-project-id="${category}"]`).click();
          this.$refs.projects.expand();
        }
      }
    },
    activeColumn(col) {
      $(".column").addClass("none");
      $(`[data-column]`).removeClass("active");
      $(".column").removeClass("none");
      $(`[data-column="${col}"]`).addClass("active");
    }
  },
  watch: {
    // "$route.params.type": function(id) {
    //   console.log(v);
    // },
    windowWidth() {
      helpers.calcColumn();
    },
    ready(v) {
      if (v == 2) {
        setTimeout(() => {
          this.start();
        }, 2000);
      }
    }
  }
  // beforeRouteLeave(to, from, next) {
  //   this.$store.dispatch({ type: "calcColumns" });

  //   this.$store.dispatch("shrink");

  //   console.log("beforeRouteLeave: HOME");
  //   setTimeout(() => next(), 1000);
  // }
};
</script>

<style scoped>
.vdr.active:before {
  outline: 0;
}
.columns-footer .columns-footer__menu {
  display: -webkit-box;
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #000;
}

.columns-footer {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1.4px solid var(--main-color);
  box-shadow: 2px 4px 8px 0px rgb(161 161 161 / 37%),
    -2px -4px 8px 0px rgb(193 193 193 / 37%);
  z-index: 25;
  -webkit-transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}
.columns-footer .columns-footer__menu .columns-footer__menu-item {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-flex: 0;
  flex: 0 0 33.33%;
}
.columns-footer .columns-footer__menu .columns-footer__menu-item .button-pill {
  border: 1px solid transparent;
  -webkit-transition: border-color 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  transition: border-color 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}
.columns-footer
  .columns-footer__menu
  .columns-footer__menu-item
  .button-pill.active {
  border: 1px solid #000;
  background: var(--main-color);
  color: #fff;
}
.columns-footer .columns-footer__buttons {
  display: -webkit-box;
  display: flex;
  padding: 16px;
}
@media (max-width: 900px) {
  .columns-footer {
    display: block;
  }
}
</style>
