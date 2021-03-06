<template>
  <div
    data-column="two"
    data-size="1"
    class="column active"
    ref="projects"
    :class="[{'loading': loading}]"
  >
    <ItemLoading v-if="loading"></ItemLoading>
    <div class="reload" v-if="reload">
      <h1>Hmmm...</h1>
      <p>It seems you lost your connection, please try again.</p>
      <button class="button-pill bg-main" @click="getProjects()">Reload</button>
    </div>
    <div v-if="!loading">
      <a class="enlarge button-pill" ref="button" @click="expand()">Portfolio</a>
      <div class="flex f-space-between column-head">
        <div class="items__title" :class="[{'flex': !activefilters}, { 'none': activefilters}]">
          <span @click="expanded? shrink():expand()">Portfolio</span>
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
                :data-project-id="c.name"
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
      <div class="items">
        <Project v-for="project in allProjects" :key="project._id" :project="project"></Project>
        <!-- <h3 v-if="projects.length == 0">No projects yet..</h3> -->
        <div v-if="allProjects.length == 0">
          <img
            class="w-75 m-auto block"
            style="margin-top:15px"
            src="../../assets/images/noresult.svg"
            alt
            srcset
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Project from "@/components/Projects/project-components/ProjectComponent";
import * as helpers from "@/helpers/home";
import ItemLoading from "@/components/general/ItemLoading.vue";

import { mapState, mapGetters } from "vuex";
let $ = require("jquery");

export default {
  name: "Projetcs",
  data() {
    return {
      activefilters: false,
      allProjects: [],
      expanded: false,
      loading: false,
      reload: false
    };
  },
  components: { Project, ItemLoading },

  computed: {
    ...mapState(["one", "two", "colWidth", "categories"]),
    ...mapState("studio", ["fetching", "filtredProjects", "projects"]),

    ...mapGetters("studio", ["filterProject"])
  },
  mounted() {
    this.$emit("created", { col: "projects" });
  },
  created() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      if (this.projects.length == 0) {
        this.loading = true;
        this.reload = false;

        const res = await this.$store.dispatch({
          type: "studio/getAllProjects"
        });
        this.allProjects = this.projects;
        if (!res) {
          this.loading = false;
          this.reload = true;
        }
      } else {
        this.allProjects = this.projects;

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
        one: { right: 95, left: 5 },
        two: { right: 5, left: 95 }
      });
    },
    filter(type, e) {
      $(".filters__filter-set .button-pill").removeClass("active");
      $(e.target).addClass("active");
      this.filterProject(type);
    }
  },
  watch: {
    filtredProjects(v) {
      this.allProjects = v;
    },
    projects(v) {
      this.allProjects = v;
      this.loading = false;
    }
  }
};
</script>

<style>
</style>