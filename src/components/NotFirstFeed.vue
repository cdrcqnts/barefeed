<template>
    <v-app v-if="loading">
        <v-content>
            <!-- <ErrMsg></ErrMsg>-->
            <v-container fill-height fluid>
                <v-layout align-center justify-center>
                    <v-progress-circular
                            :size="100"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
    <v-app v-else>
        <v-navigation-drawer
                app
                clipped
                fixed
                v-model="drawer"
        >
            <v-list dense>
<!--                <RefreshFeeds></RefreshFeeds>-->
                <DlgFeedAdd></DlgFeedAdd>
                <v-subheader class=" grey--text text--darken-1">YOUR CHANNELS</v-subheader>
                <v-list-tile :class="getActiveClass(idx, currIdx)"
                             :key="feed.title"
                             @click="currIdx = idx"
                             v-for="(feed, idx) in feeds">
                    <v-list-tile-content>
                        <v-list-tile-title class="grey--text text--darken-3">{{feed.title}}</v-list-tile-title>
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


            <v-text-field
                    class="hidden-sm-and-down"
                    flat
                    label="Search"
                    prepend-icon="search"
                    solo-inverted
                    v-model="search"
            ></v-text-field>
            <v-spacer></v-spacer>
            <DlgFeedDetail :idx="currIdx"></DlgFeedDetail>
            <DlgFeedDelete :idx="currIdx"></DlgFeedDelete>
        </v-toolbar>
        <v-content>
            <v-card>
                <v-card-title class="hidden-md-and-up">
                    <v-text-field
                            append-icon="search"
                            flat
                            hide-details
                            label="Search"
                            single-line
                            v-model="search"
                    ></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers"
                              :items="feeds[currIdx].podcasts"
                              :loading="loadingTbl"
                              :must-sort="true"
                              :pagination.sync="pagination"
                              :rows-per-page-items="rowsPerPage"
                              :search="search"
                              class="elevation-1"
                              item-key="index">
                    <template v-slot:items="props">
                        <td class="text-xs-left">{{ props.item.title }}</td>
                        <td class="text-xs-right">{{ props.item.duration }}</td>
                        <td class="text-xs-right">{{ released(props.item.released) }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn @click="dialogPodcast(props.item)" icon>
                                <v-icon color="grey darken-2">info</v-icon>
                            </v-btn>
                            <v-btn :href="props.item.url" icon target="_blank">
                                <v-icon color="grey darken-2">get_app</v-icon>
                            </v-btn>
                        </td>
                    </template>
                    <template v-slot:no-data>
                        <v-alert :value="true" color="error" icon="warning">
                            Sorry, nothing to display here :(
                        </v-alert>
                    </template>
                </v-data-table>
            </v-card>
            <DlgPodcastDetail :podcast="podcast"></DlgPodcastDetail>
        </v-content>
        <v-footer dark app class="justify-center" color="primary" inset justify-center>
            <v-btn flat small>View project on  Github
<!--                <img alt="View on Github" height="18" src="../assets/githubWhite.png" width="18">-->
            </v-btn>
        </v-footer>
    </v-app>
</template>

<script>
    //import ErrMsg from './ErrMsg'
    //import RefreshFeeds from './RefreshFeeds'
    import DlgFeedDelete from './DlgFeedDelete'
    import DlgFeedDetail from './DlgFeedDetail'
    import DlgFeedAdd from './DlgFeedAdd'
    import DlgPodcastDetail from './DlgPodcastDetail'

    import API_GET from '@/services/API_GET'
    import time from '@/aux/time'
    import {mapActions, mapState} from 'vuex'

    export default {
        components: {
            //ErrMsg,
            //RefreshFeeds,
            DlgFeedDelete,
            DlgFeedDetail,
            DlgFeedAdd,
            DlgPodcastDetail
        },
        data: () => ({
            drawer: null,
            source: "String",
            currIdx: 0,
            loading: true,
            loadingTbl: false,
            search: '',
            podcast: {},
            headers: [
                {
                    text: 'Title',
                    align: 'left',
                    sortable: true,
                    value: 'title'
                },
                {
                    text: 'Duration',
                    align: 'right',
                    value: 'duration'
                },
                {
                    text: 'Released',
                    align: 'right',
                    value: 'released'
                },
                {
                    text: 'Actions',
                    align: 'center',
                    value: 'title',
                    sortable: false
                }
            ],
            pagination: {
                sortBy: 'released',
                descending: true,
                rowsPerPage: 25,
            },
            rowsPerPage: [10, 25, 100, {
                "text": "$vuetify.dataIterator.rowsPerPageAll",
                "value": -1
            }]
        }),
        mounted() {
            this.$store.subscribeAction({
                before: (action, state) => {
                    let deleting = action.type === 'delFeed';
                    let lastFeed = state.feeds.length <= 1;
                    if (deleting) {
                        this.currIdx = 0;
                        if (lastFeed) {
                            this.$router.push({name: 'firstFeed'})
                        }
                    }
                }
            });
            this.loadFeeds()
        },
        computed: mapState(['feeds']),
        methods: {
            ...mapActions([
                'podcastDlgOn',
                'initFeeds',
                'setErr',
            ]),
            getActiveClass(idx1, idx2) {
                if (idx1 === idx2) {
                    return "grey lighten-3"
                }
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
                        this.setErr(res.data)
                            .then(this.$router.push({name: 'firstFeed'}))
                    }
                }
                this.loading = false
            },
            released(t) {
                return time.convDate(t)
            },
            dialogPodcast(podcast) {
                this.podcast = Object.assign({}, podcast);
                this.podcastDlgOn();

            },
        }
    }
</script>