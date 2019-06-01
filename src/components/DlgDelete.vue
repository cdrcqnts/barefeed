<template>
  <v-dialog max-width="400" v-model="show">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>delete_outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Delete {{ feeds[idx].title }}?</v-card-title>
      <v-card-text v-if="err" class="red--text pb-4">
        <p v-for="(e, idx) in err" :key="idx">{{e}}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel" color="green darken-1" flat>{{ str.no }}</v-btn>
        <v-btn
          :disabled="loading"
          :loading="loading"
          @click="deleteFeed(idx)"
          color="red darken-1"
          flat
        >{{ str.yes }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import API_DELETE from "@/services/API_DELETE.js";
import { mapActions, mapState } from "vuex";
import { STR } from "@/aux/constants.js";

export default {
  props: ["idx"],
  data: function() {
    return {
      show: false,
      loading: false,
      str: {
        no: STR.BTN_DELETE_NO,
        yes: STR.BTN_DELETE_YES
      }
    };
  },
  computed: mapState(["feeds", "err"]),
  methods: {
    ...mapActions(["delFeed", "resetErr", "setErr"]),
    async deleteFeed(idx) {
      this.loading = true;
      let sid = this.$route.params.sid;
      let cid = this.feeds[idx].cid;
      if (this.err.length > 0) {
        this.resetErr();
      }
      const res = await API_DELETE.feed(sid, cid);
      if (res.ok) {
        this.delFeed(idx);
        this.cancel();
      } else {
        this.setErr(res.data);
      }
      this.loading = false;
    },
    cancel() {
      this.show = false;
      this.loading = false;
      if (this.err.length > 0) {
        this.resetErr();
      }
    }
  }
};
</script>
