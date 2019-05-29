<template>
  <v-footer app inset dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-text v-if="playing">
        <v-layout row>
          <v-flex shrink>
            <v-card-text>
              <h2>{{ slider }}</h2>
            </v-card-text>
          </v-flex>

          <v-flex class="px-3">
            <v-slider v-model="slider"></v-slider>
          </v-flex>
          <v-flex shrink>
            <v-card-text>
              <h2>23:45</h2>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-title class="primary">
        <v-btn
          @click="playing = !playing; playing ? pause() : play()"
          class="mx-3"
          medium
          dark
          icon
        >
          <v-icon medium v-if="playing">pause</v-icon>
          <v-icon medium v-else>play_arrow</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <strong class="subheading">{{ podcast.title }}</strong>
        <v-spacer></v-spacer>
        <v-btn :href="podcast.url" target="_blank" class="mx-3" medium icon>
          <v-icon medium color>get_app</v-icon>
        </v-btn>
        <v-btn @click="info()" class="mx-3" medium icon>
          <v-icon medium color>info</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <DlgPodcast :podcast="podcast"></DlgPodcast>
  </v-footer>
</template>

<script>
import DlgPodcast from "./DlgPodcast";
import { mapActions } from "vuex";
export default {
  props: ["podcast"],
  components: {
    DlgPodcast
  },
  data: () => ({
    playing: false,
    slider: 45
  }),
  methods: {
    ...mapActions(["podcastDlgOn"]),
    play() {
      console.log("Pressed PLAY");
    },
    pause() {
      console.log("Pressed PAUSE");
    },
    info() {
      console.log("Pressed INFO");
      this.podcastDlgOn();
    },
    download() {
      console.log("Pressed DOWNLOAD");
    }
  }
};
</script>

