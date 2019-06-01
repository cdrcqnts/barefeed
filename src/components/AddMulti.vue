<template>
  <v-card flat class="text-xs-center" justify-center>
    <br>
    <p>
      You can add multiple feeds by uploading a text file containing a list of valid feed URLs.
      Each line must contain a feed URL. Existing feeds are ignored, valid new feeds are added. Download your current feeds to see the expected file structure.
    </p>
    <!-- <FileReader @load="addNewFeeds($event)"></FileReader> -->
    <v-card-actions class="pb-4">
      <v-spacer></v-spacer>
      <input type="file" ref="file" style="display: none" hidden @change="loadURLsFromFile">
      <v-btn color="primary" @click="$refs.file.click()">Select File</v-btn>
      <v-btn @click="closeDlg()" color="primary" flat>Cancel</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-card-text v-if="err.length > 0">
      <h4 class="pb-4">
        Errors occured when reading file
        <code>{{ fname }}</code>
      </h4>
      <p class="red--text" v-for="(e, idx) in err" :key="idx">{{e}}</p>
    </v-card-text>
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
      fname: "",
      str: {
        fileTooBig: STR.ERR_FILE_TOO_BIG,
        fileTooLong: STR.ERR_FILE_TOO_LONG,
        lineTooLong: STR.ERR_LINE_TOO_LONG,
        notURL: STR.ERR_NOT_URL
      }
    };
  },
  computed: mapState(["err"]),
  methods: {
    ...mapActions(["addFeed", "setErr", "resetErr"]),
    closeDlg() {
      this.loading = false;
      this.resetErr();
      this.$emit("cancel", true);
    },
    loadURLsFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      this.fname = file.name;
      if (file.size > 524288) {
        this.setErr(this.str.fileTooBig);
        return;
      }
      var lines = [];
      reader.onload = e => {
        lines = e.target.result.split("\n");
        lines = lines.filter(Boolean);

        if (lines.length > 30) {
          this.setErr(this.str.tooLong);
          return;
        }
        for (var idx = 0; idx < lines.length; idx++) {
          const ln = " Line (" + (idx + 1) + ").";
          if (lines[idx].length > 2000) {
            this.setErr(this.str.lineTooLong + ln);
          }
          if (!validate.isURL(lines[idx])) {
            this.setErr(this.str.notURL + ln);
          }
        }
        if (this.err.length > 0) {
          return;
        }
        this.addNewFeeds(lines);
      };
      reader.readAsText(file);
    },
    async addNewFeeds(urls) {
      this.resetErr();
      this.loading = true;
      let sid = this.$route.params.sid;
      for (const [idx, url] of urls.entries()) {
        const res = await API_POST.feed(sid, url);
        if (res.ok) {
          this.addFeed(res.data);
        } else {
          let ln = " Line (" + (idx + 1) + ")";
          this.setErr(res.data + ln);
        }
      }
      if (!this.err.length > 0) {
        console.log(this.err);
        this.closeDlg();
      }
    }
  }
};
</script>
