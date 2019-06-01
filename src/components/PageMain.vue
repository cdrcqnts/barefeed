<template>
  <v-app v-if="loading">
    <v-content>
      <!-- <ErrMsg></ErrMsg>-->
      <v-container fill-height fluid>
        <v-layout align-center justify-center>
          <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  <v-app v-else>
    <v-navigation-drawer app clipped fixed v-model="drawer">
      <v-list dense>
        <ExpFeeds></ExpFeeds>
        <DlgAdd></DlgAdd>
      </v-list>
      <v-list dense subheader two-line>
        <v-subheader class="grey--text text--darken-1">{{str.channels}}</v-subheader>
        <v-list-tile
          :class="highlightChannel(idx, currIdx)"
          :key="feed.title"
          @click="currIdx = idx"
          v-for="(feed, idx) in feeds"
        >
          <v-list-tile-content>
            <v-list-tile-title class="grey--text text--darken-3">{{feed.title}}</v-list-tile-title>
            <v-list-tile-sub-title>{{updated(feed.updated)}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      app
      color="blue darken-3"
      dark
      fixed
      flat
    >
      <v-toolbar-title class="ml-0 pl-3" style="width: 500px">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">{{ feeds[currIdx].title }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        class="hidden-sm-and-down"
        flat
        :label="str.search"
        prepend-icon="search"
        solo-inverted
        v-model="search"
      ></v-text-field>

      <DlgFeed :idx="currIdx"></DlgFeed>
      <DlgDelete :idx="currIdx"></DlgDelete>
    </v-toolbar>
    <v-content>
      <v-card>
        <v-card-title class="hidden-md-and-up">
          <v-text-field
            append-icon="search"
            flat
            hide-details
            :label="str.search"
            single-line
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :expand="false"
          :headers="headers"
          :items="feeds[currIdx].podcasts"
          :loading="loadingTbl"
          :must-sort="true"
          :pagination.sync="pagination"
          :rows-per-page-items="rowsPerPage"
          :search="search"
          class="elevation-1"
          item-key="pid"
        >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded;" style="cursor:pointer">
              <td :class="highlightRow(props.expanded)">{{ props.item.title }}</td>
              <td class="text-xs-right">{{ props.item.duration }}</td>
              <td class="text-xs-right">{{ size(props.item.size) }}</td>
              <td class="text-xs-right">{{ released(props.item.released) }}</td>
            </tr>
          </template>
          <template v-slot:expand="props">
            <v-layout row>
              <v-flex shrink pa-1>
                <v-card flat>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn :href="props.item.url" class="mx-3" icon target="_blank" v-on="on">
                        <v-icon size="24px">get_app</v-icon>
                      </v-btn>
                    </template>
                    <span>Download</span>
                  </v-tooltip>
                </v-card>
              </v-flex>
              <v-flex grow pa-1>
                <v-card flat>
                  <v-card-text>{{ props.item.description }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import ExpFeeds from "./ExpFeeds";
import DlgDelete from "./DlgDelete";
import DlgFeed from "./DlgFeed";
import DlgAdd from "./DlgAdd";

import API_GET from "@/services/API_GET";
import time from "@/aux/time";
import filesize from "@/aux/filesize";
import { mapActions, mapState } from "vuex";
import { STR } from "@/aux/constants.js";

export default {
  components: {
    ExpFeeds,
    DlgDelete,
    DlgFeed,
    DlgAdd
  },
  data: () => ({
    drawer: null,
    source: "String",
    currIdx: 0,
    loading: true,
    loadingTbl: false,
    search: "",
    podcast: {},
    str: {
      search: STR.SEARCH,
      noData: STR.NO_DATA,
      channels: STR.CHANNELS
    },
    headers: [
      {
        text: "Title",
        align: "left",
        sortable: true,
        value: "title"
      },
      {
        text: "Duration",
        align: "right",
        value: "duration"
      },
      {
        text: "Size",
        align: "right",
        value: "size"
      },
      {
        text: "Released",
        align: "right",
        value: "released"
      }
    ],
    pagination: {
      sortBy: "released",
      descending: true,
      rowsPerPage: 25
    },
    rowsPerPage: [
      10,
      25,
      100,
      {
        text: "$vuetify.dataIterator.rowsPerPageAll",
        value: -1
      }
    ]
  }),
  mounted() {
    this.$store.subscribeAction({
      before: (action, state) => {
        let deleting = action.type === "delFeed";
        let lastFeed = state.feeds.length <= 1;
        if (deleting) {
          this.currIdx = 0;
          if (lastFeed) {
            this.$router.push({ name: "firstFeed" });
          }
        }
      }
    });
    this.loadFeeds();
  },
  computed: mapState(["feeds"]),
  methods: {
    ...mapActions(["initFeeds", "setErr"]),
    highlightChannel(idx1, idx2) {
      if (idx1 === idx2) {
        return "grey lighten-3";
      }
    },
    highlightRow(expanded) {
      if (expanded) {
        return "text-xs-left font-weight-bold";
      }
      return "text-xs-left";
    },
    async loadFeeds() {
      let noFeeds = this.feeds.length === 0;
      if (noFeeds) {
        let sid = this.$route.params.sid;
        const res = await API_GET.feeds(sid);
        if (res.ok) {
          let feeds = time.sortByUpdated(res.data);
          this.initFeeds(feeds);
        } else {
          this.setErr(res.data).then(this.$router.push({ name: "firstFeed" }));
        }
      }
      this.loading = false;
    },
    released(t) {
      return time.convDate(t);
    },
    updated(t) {
      return "updated " + time.convUpdTime(t);
    },
    size(n) {
      return filesize.formatBytes(n, 2);
    }
  }
};
</script>