<template>
  <v-app>
    <v-content>
      <!--            <ErrMsg></ErrMsg>-->
      <v-container fill-height fluid>
        <v-layout align-center justify-center>
          <v-flex md4 sm8 xs12>
            <h1 class="text-xs-center">
              {{ str.title }}
              <v-icon large>rss_feed</v-icon>
            </h1>
            <h2 class="subheading text-xs-center">{{ str.subtitle }}</h2>
            <br>
            <v-text-field
              :autofocus="true"
              :disabled="loading"
              :error-messages="err"
              :loading="loading"
              @keyup.enter.native="addNewFeed()"
              :hint="str.hintUrl"
              :label="str.labelUrl"
              v-model.trim="url"
            ></v-text-field>
            <br>
            <v-flex text-xs-center>
              <v-btn
                :disabled="loading || !url.length > 0"
                @click="addNewFeed()"
                class="align-center"
                color="primary"
                depressed
                large
              >Get this feed</v-btn>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "./Footer";
import API_POST from "@/services/API_POST";
import { mapActions, mapState } from "vuex";
import validate from "@/aux/validate";
import { STR } from "@/aux/constants.js";

export default {
  components: {
    Footer
  },
  data: () => ({
    drawer: null,
    loading: false,
    url: "",
    str: {
      title: STR.PAGE_TITLE,
      subtitle: STR.PAGE_SUBTITLE,
      hintUrl: STR.URL_HINT,
      labelUrl: STR.URL_LABEL_FIRST,
      notURL: STR.ERR_NOT_URL
    }
  }),
  computed: {
    ...mapState(["feeds", "err"])
  },
  watch: {
    url: function() {
      if (!this.url) {
        this.resetErr();
      }
    }
  },
  methods: {
    ...mapActions(["addFeed", "resetErr", "setErr"]),
    async addNewFeed() {
      this.loading = true;
      let sid = "";
      if (this.err.length > 0) {
        this.resetErr();
      }
      if (!validate.isURL(this.url)) {
        this.setErr(this.str.notURL);
        this.loading = false;
        return;
      }
      const res = await API_POST.feed(sid, this.url);
      if (res.ok) {
        let sid = res.data.sid;
        this.addFeed(res.data);
        this.loading = false;
        this.$router.push({ name: "pageMain", params: { sid: sid } });
      } else {
        this.setErr(res.data);
        this.loading = false;
      }
    }
  }
};
</script>