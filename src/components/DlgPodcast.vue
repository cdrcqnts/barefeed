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
                    {{ str.dl }}
                    <v-icon dark right>get_app</v-icon>
                </v-btn>
                <v-btn @click="podcastDlgOff" color="blue darken-1" flat>{{ str.close }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {STR} from '@/aux/constants.js'
    import time from '@/aux/time'

    export default {
        props: ['podcast'],
        data: function() {
          return {
              str: {
                  dl: STR.BTN_DOWNLOAD,
                  close: STR.BTN_CLOSE,
              }
          }
        },
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
