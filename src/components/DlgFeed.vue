<template>
    <v-dialog max-width="600" v-model="show">
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>more_horiz</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ feeds[idx].title }}
                        <v-btn :href="feeds[idx].web" color="grey darken-2" flat icon target="_blank">
                            <v-icon>open_in_new</v-icon>
                        </v-btn>
                    </div>
                    <span class="grey--text">updated {{ timeUpdated(feeds[idx].updated) }}</span>
                    <br>
                    <br>
                    <div> {{ feeds[idx].description }}</div>
                    <br>
                    <div class="font-italic">{{ feeds[idx].url }}</div>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="show = false" color="blue darken-1" flat>Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import time from '@/aux/time'
    import {mapState} from 'vuex';

    export default {
        props: ['idx'],
        data: function () {
            return {
                show: false,
            }
        },
        computed: {
            ...mapState(['feeds']),
        },
        methods: {
            timeUpdated(t) {
                return time.convUpdTime(t)
            },
        }

    }
</script>
