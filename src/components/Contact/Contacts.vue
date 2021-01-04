<template>
  <div class="column" data-size="1" data-column="two" ref="contacts">
    <a class="enlarge button-pill" ref="button">Studio</a>
    <div class="flex f-space-between column-head">
      <div class="items__title">
        <span>Contacts</span>
      </div>
    </div>
    <div class="information__text">
      <div>
        <p>Mobile: <b>00201156565910</b></p>
        <p>Mobile: <b>00201553733394</b></p>
        <p>Email: <b>amsstudio.e@gmail.com</b></p>
        <p>Address: <b>1 Main st, cairo. Egypt</b></p>
      </div>
      <div>
        <p>
          <b>Follow Us</b>
        </p>
        <p>
          <a href>LinkedIn</a>
        </p>
        <p>
          <a href>Dev</a>
        </p>
        <p>
          <a href>Facebook</a>
        </p>
      </div>
    </div>

    <!-- <div class="information__buttons">
   
      <a class="button-extend newsletter">
        <div class="button-extend__text-wrapper">
          <div class="button-extend__text">Newsletter</div>
        </div>
        <div class="button-extend__icon">
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 3L0.5 5V11.5C0.5 12.6046 1.39543 13.5 2.5 13.5H12.5C13.6046 13.5 14.5 12.6046 14.5 11.5V5L11.5 3"
              stroke="black"
            />
            <path
              d="M11.5 7V1.5C11.5 0.947715 11.0523 0.5 10.5 0.5H4.5C3.94772 0.5 3.5 0.947715 3.5 1.5V7"
              stroke="black"
            />
            <line x1="5" y1="2.5" x2="10" y2="2.5" stroke="black" />
            <line x1="5" y1="4.5" x2="10" y2="4.5" stroke="black" />
            <path d="M0.5 5.5L7.5 8.5L14.5 5.5" stroke="black" />
          </svg>
        </div>
      </a>
      <br />
      <a class="button-extend loginPortalIcon" @click="openmail($event)">
        <div class="button-extend__text-wrapper">
          <div class="button-extend__text">Client&nbsp;Portal</div>
        </div>
        <div class="button-extend__icon">
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5.5" cy="3.5" r="3" stroke="black" />
            <path
              d="M5.5 6.5C4.19094 6.5 2.98103 6.78551 2.0804 7.27196C1.19979 7.7476 0.5 8.4881 0.5 9.43056V10C0.5 10.8284 1.17157 11.5 2 11.5H5.5H9C9.82843 11.5 10.5 10.8284 10.5 10V9.43056C10.5 8.4881 9.80021 7.7476 8.9196 7.27196C8.01897 6.78551 6.80906 6.5 5.5 6.5Z"
              stroke="black"
            />
            <line x1="11" y1="3.5" x2="16" y2="3.5" stroke="black" />
            <line x1="13.5" y1="1" x2="13.5" y2="6" stroke="black" />
          </svg>
        </div>
      </a>
    </div> -->
    <div class="logo">
      <img src="@/assets/images/word.png" alt="logo" />
    </div>
    <Footer></Footer>
    <AuthPortal :visibilePortal="visibilePortal"></AuthPortal>
  </div>
</template>

<script>
import Footer from "@/components/Home/Footer.vue";
import { mapState } from "vuex";
import AuthPortal from "@/components/Home/AuthPortal.vue";
import * as helpers from "@/helpers/home";

export default {
  name: "Projetcs",
  data() {
    return {
      visibilePortal: false
    };
  },
  // props: ["width", "height"],

  components: {
    Footer: Footer,
    AuthPortal: AuthPortal
  },
  computed: {
    ...mapState(["two", "one"])
  },
  mounted() {
    this.$emit("created", { col: "studio" });
  },
  methods: {
    openmail() {
      this.visibilePortal = true;
      document.getElementById("subscription").classList.add("show");
      document.querySelector("body").classList.add("portal-pane--show");
    },
    opensearch() {
      document.querySelector("body").classList.add("search-pane--show");
    },
    shrink() {
      helpers.changePositions({
        one: { right: 66.6, left: 33.3 },
        two: { right: 33.3, left: 66.6 }
      });
      helpers.shrink();
    },
    expand() {
      helpers.changePositions({
        one: { right: 95, left: 5 },
        two: { right: 90, left: 10 }
      });
    }
  }
};
</script>

<style>
.information__text {
  padding: 0 110px 16px 16px;
}
.information__text p {
  font-size: 20px;
  margin-bottom: 24px;
}
@media (max-width: 900px) {
  .information__text {
    padding: var(--m-padding);
  }
  .information__text p {
    line-height: 24px;
  }
}
</style>