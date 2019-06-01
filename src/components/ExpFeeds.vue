<template>
  <v-list-tile @click="save()">
    <v-list-tile-action>
      <v-icon color="grey darken-3">import_export</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title class="grey--text text--darken-3">Export Feeds</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>


<script>
import { mapState } from "vuex";
import time from "@/aux/time";
const FileSaver = require("file-saver");

export default {
  computed: {
    ...mapState(["feeds"])
  },
  methods: {
    save() {
      let urls = this.feeds.map(f => f.url + "\n");
      let now = time.now();
      let blob = new Blob(urls, {
        type: "text/plain;charset=utf-8"
      });
      let fname = "feeds_" + now + ".txt";
      FileSaver.saveAs(blob, fname);
    }
  }
};
</script>
