<template>
  <v-card flat>
    <v-card-text class="pl-5 pr-5 pt-4 pb-4">
      <v-text-field
        :error-messages="err"
        :loading="loading"
        @keyup.enter.native="addNewFeed()"
        :hint="str.hintUrl"
        :label="str.labelUrl"
        v-model.trim="url"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="pb-4">
      <v-spacer></v-spacer>
      <v-btn
        depressed
        :disabled="loading || !url.length > 0"
        @click="addNewFeed()"
        color="primary"
      >Add</v-btn>
      <v-btn @click="closeDlg()" color="primary" flat>{{str.no}}</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import API_POST from "@/services/API_POST.js";
import { STR } from "@/aux/constants.js";
import { mapActions, mapState } from "vuex";
import validate from "@/aux/validate";
export default {
  data: function() {
    return {
      loading: false,
      url: "",
      str: {
        hintUrl: STR.URL_HINT,
        labelUrl: STR.URL_LABEL,
        no: STR.BTN_ADD_NO,
        yes: STR.BTN_ADD_YES,
        notURL: STR.ERR_NOT_URL
      }
    };
  },
  watch: {
    url: function() {
      if (!this.url) {
        this.resetErr();
      }
    }
  },
  computed: mapState(["err"]),
  methods: {
    ...mapActions(["addFeed", "setErr", "resetErr"]),
    closeDlg() {
      this.url = "";
      this.loading = false;
      this.resetErr();
      this.$emit("cancel", true);
    },
    async addNewFeed() {
      if (this.url) {
        this.resetErr();
        this.loading = true;
        let sid = this.$route.params.sid;
        if (!validate.isURL(this.url)) {
          this.setErr(this.str.notURL);
          this.loading = false;
          return;
        }
        const res = await API_POST.feed(sid, this.url);
        if (res.ok) {
          this.addFeed(res.data);
          this.closeDlg();
        } else {
          this.setErr(res.data);
        }
        this.loading = false;
      }
    }
  }
};
</script>
