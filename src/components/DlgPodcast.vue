<template>
    <v-dialog max-width="600" v-model="podcastDlg" persistent>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ podcast.title }}
                    </div>
                    <span class="grey--text">released on {{ timeReleased(podcast.released) }}</span>
                    <br>
                    <br>
                    <div> {{ podcast.description }}</div>
                    <br>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :href="podcast.url" target="_blank" @click="podcastDlgOff" color="success" depressed>
                    Download Podcast
                    <v-icon dark right>get_app</v-icon>
                </v-btn>
                <v-btn @click="podcastDlgOff" color="blue darken-1" flat>Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import time from '@/aux/time'

    export default {
        props: ['podcast'],
        computed: {
            ...mapState(['podcastDlg']),
        },
        methods: {
            ...mapActions([
                'podcastDlgOff',
            ]),
            timeReleased(t) {
                return time.convDate(t)
            },
        }
    }
</script>
