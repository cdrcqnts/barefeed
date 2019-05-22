<template>
    <v-app>
        <v-navigation-drawer
                app
                clipped
                fixed
                v-model="drawer"
        >
            <v-list dense>
                <v-list-tile @click="addFeed">
                    <v-list-tile-action>
                        <v-icon color="grey darken-3">add_circle_outline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="grey--text text--darken-3">Add Feed</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-subheader class=" grey--text text--darken-1">YOUR FEEDS</v-subheader>

                <v-list-tile :class="getActiveClass(idx, currIdx)"
                             :key="feed.title"
                             @click="currIdx = idx"
                             v-for="(feed, idx) in $store.state.feeds">
                    <v-list-tile-content>
                        <v-list-tile-title class="grey--text text--darken-3">{{feed.title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>
        <v-toolbar app clipped-left color="indigo" dark dense fixed flat>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>{{ $store.state.feeds[currIdx].title }}</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <ErrMsg></ErrMsg>
            <v-container fill-height fluid>
                <v-layout
                        align-center
                        justify-center
                >
                    <v-flex text-xs-center>
                        <v-tooltip left>
                            <v-btn :href="source" icon large slot="activator" target="_blank">
                                <v-icon large>code</v-icon>
                            </v-btn>
                            <span>Source</span>
                        </v-tooltip>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app color="indigo justify-center" inset justify-center>
            <span class="white--text">&copy; 2017</span>
        </v-footer>
        <DlgFeedDelete :show="dialog.feedDelete"></DlgFeedDelete>
        <DlgFeedDetail :show="dialog.feedDetail"></DlgFeedDetail>
        <DlgFeedAdd :show="dialog.feedAdd"></DlgFeedAdd>
        <DlgPodcastDetail :show="dialog.podcastDetail"></DlgPodcastDetail>
    </v-app>
</template>

<script>
    import ErrMsg from './ErrMsg'
    import DlgFeedDelete from './DlgFeedDelete'
    import DlgFeedDetail from './DlgFeedDetail'
    import DlgFeedAdd from './DlgFeedAdd'
    import DlgPodcastDetail from './DlgPodcastDetail'

    export default {
        name: "NotFirstFeed",
        components: {
            ErrMsg,
            DlgFeedDelete,
            DlgFeedDetail,
            DlgFeedAdd,
            DlgPodcastDetail
        },
        data: () => ({
            drawer: null,
            source: "String",
            currIdx: 0,
            dialog: {
                feedAdd: false,
                feedDelete: false,
                feedDetail: false,
                podcastDetail: false,
            }
        }),
        methods: {
            getActiveClass(idx1, idx2) {
                if (idx1 === idx2) {
                    return "grey lighten-3"
                }
            },
            addFeed() {

            }
        }

    }
</script>