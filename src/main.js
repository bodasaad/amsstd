import Vue from "vue";
import App from "./App.vue";
import router from "@/routerRepo/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/css/main.css"
import "@/assets/css/classes.css"
import "@/assets/css/admin.css"
import store from "./store";
import * as moment from 'moment'
import VDragged from "v-dragged";
import LazyLoadDirective from "./directives/LazyLoadDirective.jsLazyLoadDirective";

// import VueHead from 'vue-head'
import VueDragResize from 'vue-drag-resize'
import VueMeta from 'vue-meta'

import hljs from 'highlight.js'
hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
})

window.hljs = hljs;

import VueQuillEditor from 'vue-quill-editor'
Vue.directive("lazyload", LazyLoadDirective);


// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './registerServiceWorker'

Vue.use(VueQuillEditor)

Vue.component('vue-drag-resize', VueDragResize)

Vue.use(moment)
// Vue.use(VueHead)
Vue.use(VueMeta)

Vue.use(VDragged);


library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
export const bus = new Vue();

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
