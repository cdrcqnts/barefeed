<template>
  <v-dialog persistent max-width="600px" v-model="show">
    <template v-slot:activator="{ on }">
      <v-list-tile v-on="on">
        <v-list-tile-action>
          <v-icon color="grey darken-3">add_circle_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="grey--text text--darken-3">Add Feeds</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
    <v-card>
      <v-tabs grow centered color="primary" dark icons-and-text>
        <v-tabs-slider color="orange"></v-tabs-slider>

        <v-tab href="#tab-add-feed" @click="resetErr();">
          Add single feed
          <v-icon>music_note</v-icon>
        </v-tab>

        <v-tab href="#tab-add-feeds" @click="resetErr();">
          Add multiple feeds
          <v-icon>queue_music</v-icon>
        </v-tab>

        <v-tab-item value="tab-add-feed">
          <AddSingle @cancel="close"></AddSingle>
        </v-tab-item>

        <v-tab-item value="tab-add-feeds">
          <AddMulti @cancel="close"></AddMulti>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
// import FileReader from "./FileReader";
import AddSingle from "./AddSingle";
import AddMulti from "./AddMulti";
import { mapActions } from "vuex";

export default {
  components: {
    AddSingle,
    AddMulti
    // FileReader
  },
  data: function() {
    return {
      show: false,
      str: {}
    };
  },
  methods: {
    ...mapActions(["resetErr"]),
    close(b) {
      if (b) {
        this.show = false;
        this.loading = false;
      }
    }
  }
};
</script>
