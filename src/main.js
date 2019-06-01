import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import store from './store'


import App from './App.vue'
import UploadButton from 'vuetify-upload-button'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {
    Ripple
} from 'vuetify/lib/directives'

import FirstFeed from './components/PageFirst.vue'
import NotFirstFeed from './components/PageMain.vue'


Vue.use(VueRouter);
Vue.use(Vuetify, {
    iconfont: 'md',
    directives: {
        Ripple
    }
});
Vue.use(UploadButton);

const routes = [{
    name: 'firstFeed',
    path: '/',
    component: FirstFeed,
}, {
    name: 'notFirstFeed',
    path: '/:sid',
    component: NotFirstFeed,
    // beforeEnter: (to, from, next) => {
    //     loadFeeds(to, from, next)
    // },
}];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');