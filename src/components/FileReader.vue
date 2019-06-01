<template>
  <div>
    <input type="file" ref="file" style="display: none" hidden @change="loadTextFromFile">
    <v-btn color="primary" class="ma-3" @click="$refs.file.click()">Select File ...</v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { STR } from "@/aux/constants.js";
import validate from "@/aux/validate";
export default {
  data: function() {
    return {
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
    ...mapActions(["setErr", "resetErr"]),
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      this.resetErr();

      if (file.size > 524288) {
        this.setErr(this.str.fileTooBig);
        return;
      }
      var lines = [];
      reader.onload = function(e) {
        lines = e.target.result.split("\n");
        lines = lines.filter(Boolean);
      };
      let error = this.validate(lines);
      if (error) {
        console.log(error);
        this.setErr(error);
      } else {
        this.$emit("load", lines);
      }
      reader.readAsText(file);
    },
    validate(lines) {
      if (lines.length > 100) {
        return this.str.tooLong;
      }
      for (var idx = 0; idx < lines.length; idx++) {
        const ln = " Line (" + (idx + 1) + ").";
        if (lines[idx].length > 2000) {
          return this.str.lineTooLong + ln;
        }
        if (!validate.isURL(lines[idx])) {
          return this.str.notURL + ln;
        }
      }
      return;
    }
  }
};
</script>