<template>
    <v-app>
        <v-content>
            <!--            <ErrMsg></ErrMsg>-->
            <v-container fill-height fluid>
                <v-layout align-center justify-center>

                    <v-flex md4 sm8 xs12>
                        <h1 class="text-xs-center">Barefeed
                            <v-icon large>rss_feed</v-icon>
                        </h1>
                        <h2 class="subheading text-xs-center">A simple registration-free feed reader for
                            podcasts.</h2>
                        <br>
                        <v-text-field
                                :disabled="loading"
                                :error-messages="err"
                                :loading="loading"
                                @keyup.enter.native="addNewFeed()"
                                hint="For example, http://blablatada.rss"
                                label="Enter your first feed URL"
                                v-model="url"
                        ></v-text-field>
                        <br>
                        <v-flex text-xs-center>
                            <v-btn :disabled="loading || !url.length > 0"
                                   @click="addNewFeed()"
                                   class="align-center"
                                   color="primary"
                                   depressed
                                   large>
                                Get this feed
                            </v-btn>
                        </v-flex>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <Footer></Footer>
    </v-app>
</template>

<script>
    import Footer from './Footer'
    import API_POST from '@/services/API_POST'
    import {mapActions, mapState} from 'vuex'

    export default {
        components: {
            Footer,
        },
        data: () => ({
            drawer: null,
            loading: false,
            url: "",
        }),
        computed: mapState(['feeds', 'err']),
        methods: {
            ...mapActions([
                'addFeed',
                'resetErr',
                'setErr',
            ]),
            async addNewFeed() {
                this.loading = true;
                let sid = "";
                if (this.err.length > 0) {
                    this.resetErr();
                }
                const res = await API_POST.feed(sid, this.url);
                if (res.ok) {
                    let sid = res.data.sid;
                    this.addFeed(res.data);
                    this.loading = false;
                    this.$router.push({name: 'notFirstFeed', params: {sid: sid}});
                } else {
                    this.setErr(res.data);
                    this.loading = false
                }
            }
        }
    }
</script>