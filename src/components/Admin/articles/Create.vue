<template>
  <form
    style="background-color: transparent"
    class="parent-card form"
    method="POST"
    enctype="multipart/form-data"
  >
    <div>
      <div class="form_inputs">
        <h2 v-if="!edit">Create Article</h2>
        <h2 v-if="edit">Edit Article</h2>
        <div class="p-medium">
          <div class="form-control">
            <label for="name">Title</label>
            <input type="text" name="title" id="name" v-model="title" />
          </div>
          <div class="form-control">
            <label for="site_description">Site Description</label>
            <input
              type="text"
              name="site_description"
              id="site_description"
              v-model="site_description"
            />
          </div>
          <div class="form-control">
            <input type="checkbox" name="active" id="active" v-model="active" />
            <label for="active">{{ active ? "Active" : "Not Active" }}</label>
          </div>
          <div class="form-control">
            <label for="image">image</label>
            <input
              type="file"
              name="image"
              id="itemImg"
              @change="previewFiles"
            />
          </div>
          <div class="form-control grid">
            <label for="category">category</label>

            <select name="category" id="category" v-model="category">
              <option
                v-for="t in categories"
                :key="t.name"
                :data-val="t.name"
                :value="t.name"
                class="options"
              >
                {{ t.name }}
              </option>
            </select>
          </div>
          <div class="form-control grid">
            <label for="location">location</label>

            <select name="location" id="location" v-model="location">
              <option value="all" class="options">All</option>
              <option value="blog" class="options">Blog</option>
              <option value="portfolio" class="options">Portfolio</option>
            </select>
          </div>
          <div class="form-input">
            <label for="tags">Article Tags:</label>
            <input
              class="currentInput input"
              id="tags"
              type="text"
              placeholder="Type Tags Then Press Enter"
              @keyup="getTag($event)"
            />
            <div class="tags flex">
              <li
                v-for="t in tags"
                :key="t"
                :data-val="t"
                class="options btn btn-info tag-span"
              >
                {{ t }}
                <i class="fas fa-times" @click="removetag(t)"></i>
              </li>
            </div>
          </div>
        </div>
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        ></quill-editor>
        <input
          type="file"
          id="getFile"
          @change="uploadImage($event)"
          class="none"
        />

        <!-- <quill v-model="content" :config="config" :options="editorOption"></quill> -->
        <button
          v-if="!edit"
          id="addNewitem"
          @click.prevent="createArticle()"
          class="btn btn-success"
          type="button"
        >
          Save
        </button>
        <button
          v-if="edit"
          id="addNewitem"
          @click.prevent="createArticle()"
          class="btn btn-success"
          type="button"
        >
          Update
        </button>
      </div>
    </div>
    <!--Image Here-->
  </form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import hljs from "highlight.js";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "createarticle",
  data() {
    return {
      edit: false,
      active: true,
      title: null,
      category: "",
      image: "",
      location: null,
      site_description: "",
      tags: [],
      content: "<p>example content</p>",
      editorOption: {
        modules: {
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },

          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"],
              ["link", "image", "emoji"],
            ],
            handlers: {
              image: function () {
                document.getElementById("getFile").click();
              },
            },
          },
        },
      },
    };
  },
  components: {
    quillEditor,
  },
  computed: {
    ...mapState(["categories"]),
    ...mapState("admin", ["allarticles"]),
    ...mapGetters("admin", ["articleById"]),
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.startEditing(id);
    }
  },
  methods: {
    onEditorBlur(quill) {
      return quill;
    },
    onEditorFocus(quill) {
      return quill;
    },
    onEditorReady(quill) {
      return quill;
    },
    onEditorChange({ quill, html, text }) {
      return { text, html, quill };
    },
    async startEditing(id) {
      this.edit = true;
      if (this.allarticles.length == 0) {
        await this.$store.dispatch("admin/getArticles");
      }
      const article = this.articleById(id);
      this.title = article.title;
      this.active = article.active;
      this.location = article.location || "all";
      this.tags = article.tags;
      this.site_description = article.site_description;
      this.category = article.category;
      this.content = article.content;
      return article && (this.loading = false);
    },
    async uploadImage(e) {
      this.selectedFile = e.target.files[0];
      var form = new FormData();
      form.append("image", this.selectedFile);
      form.append("name", this.selectedFile.name);
      //upload image to server
      const res = await fetch("https://ams-server.xyz/admin/media", {
        method: "Post",
        body: form,
      });
      const json = await res.json();
      if (res.status === 200 || res.status === 201) {
        //this code to set your position cursor
        const range = this.$refs.myQuillEditor.quill.getSelection();
        //this code to set image on your server to quill editor
        this.$refs.myQuillEditor.quill.insertEmbed(
          range.index,
          "image",
          `https://ams-server.xyz${json}`
        );
      }
    },

    getTag(e) {
      var keyBoardKey = e.keyCode || e.which;
      if (keyBoardKey === 13) {
        var thisValue = e.target.value.toLowerCase();
        if (thisValue != "") {
          if (!this.tags.includes(thisValue)) {
            this.tags.push(thisValue);
          }
          e.target.value = "";
        }
      }
    },
    removetag(tag) {
      this.tags = this.tags.filter((t) => t != tag);
    },
    previewFiles(e) {
      var file = e.target.files[0];
      //   var output = $(".images-perview");
      var validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
      var fileType = file["type"];
      if (!validImageTypes.includes(fileType)) {
        return "";
      } else {
        this.image = file;
      }
    },
    async createArticle() {
      let res;
      const data = new FormData();
      // data.append("delta", JSON.stringify(this.content));
      data.append("content", this.content);
      data.append("active", this.active);
      data.append("tags", JSON.stringify(this.tags));
      data.append("title", this.title);
      data.append("location", this.location);
      data.append("category", this.category);
      data.append("site_description", this.site_description);
      data.append("image", this.image);
      if (this.edit) {
        const id = this.$route.params.id;

        res = await this.$store.dispatch({
          type: "admin/editArticle",
          data,
          id,
        });
      } else {
        res = await this.$store.dispatch({ type: "admin/addArticle", data });
      }
      if (res) {
        this.content = "";
        this.title = "";
        this.tags = [];
        this.site_description = "";
        this.image = "";
      }
    },
  },
  watch: {},
};
</script>

<style scoped>
body {
  background-color: #f9f9f9 !important;
}
</style>