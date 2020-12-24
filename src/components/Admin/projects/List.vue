<template>
  <div>
    <h1>All Projects</h1>
    <div class="content" :class="{'loader-effect':loading}">
      <div v-if="!loading" class="grid g-three">
        <div v-for="a of allprojects" :key="a._id" class="content-item p-relative">
          <router-link :to="{name:'newproject',params: { id: a._id }}">
            <div class="content-item_bar">
              <span>{{a.date}}</span>

              <div class="flex">
                <i class="fas fa-edit c-b m-r-3"></i>
                <i class="fas fa-trash c-r m-l-3" @click="deleteProject(a._id)"></i>
              </div>
            </div>
            <h3>{{a.title}}</h3>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "List",
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState(["url"]),
    ...mapState("admin", ["allprojects"])
  },
  created() {
    if (this.allprojects.length == 0) {
      this.$store.dispatch({ type: "admin/getProjects" });
    } else {
      this.loading = false;
    }
  },
  methods: {
    async deleteProject(id) {
      this.loading = true;
      await this.$store.dispatch({
        type: "admin/deleteProject",
        data: { id: id }
      });
      this.loading = false;
    }
  },
  watch: {
    allprojects(val) {
      if (val) {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
</style>