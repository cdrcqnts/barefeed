<template>
    <v-dialog max-width="600px" persistent v-model="show">
        <template v-slot:activator="{ on }">
            <v-list-tile v-on="on">
                <v-list-tile-action>
                    <v-icon color="grey darken-3">add_circle_outline</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="grey--text text--darken-3">Add Feed</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
        <v-card>
            <v-card-text>
                <v-container grid-list-md>
                    <v-text-field
                            :error-messages="err"
                            :loading="loading"
                            @keyup.enter.native="addFeed()"
                            label="Enter Podcast URL"
                            v-model="url"
                    >
                    </v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel" color="blue darken-1" flat>Cancel</v-btn>
                <v-btn :disabled="loading || !url.length > 0" @click="addFeed()" color="blue darken-1" flat>Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import API_POST from '@/services/API_POST.js'
    import {mapState} from 'vuex';

    export default {
        name: "DlgFeedNew",
        data: function () {
            return {
                show: false,
                loading: false,
                url: "",
            }
        },
        computed: mapState(['err']),
        methods: {
            async addFeed() {
                this.loading = true;
                let sid = this.$route.params.sid;
                if (this.$store.state.err.length > 0) {
                    this.$store.dispatch('resetErr');
                }
                const res = await API_POST.feed(sid, this.url);
                if (res.ok) {
                    this.$store.dispatch('addFeed', res.data);
                    this.cancel()
                } else {
                    this.$store.dispatch('setErr', res.data)
                }
                this.loading = false
            },
            cancel() {
                this.show = false;
                this.url = "";
                this.loading = false;
                this.$store.dispatch('resetErr')
            }
        }
    }
</script>
