<template>
    <v-app>
        <v-content>
            <ErrMsg></ErrMsg>
            <v-container fill-height fluid>
                <v-layout align-center justify-center>

                    <v-flex md4 sm8 xs12>
                        <h1 class="text-xs-center">This is Barefeed
                            <v-icon large>rss_feed</v-icon>
                        </h1>
                        <h2 class="subheading text-xs-center">A simple registration-free feed reader for
                            podcasts.</h2>
                        <br>
                        <v-text-field
                                hint="For example, http://blablatada.rss"
                                label="Enter your first feed URL"
                                value=""
                        ></v-text-field>
                        <br>
                        <v-flex text-xs-center>
                            <v-btn @click="addFirstFeed" class="align-center" color="primary" depressed large>Get this
                                feed
                            </v-btn>
                        </v-flex>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import ErrMsg from './ErrMsg'

    export default {
        name: "First",
        components: {ErrMsg},
        data: () => ({
            drawer: null,
        }),
        props: {
            source: String
        },
        mounted() {

        },
        methods: {
            addFirstFeed() {
                // call
            }
        }
    }
</script>