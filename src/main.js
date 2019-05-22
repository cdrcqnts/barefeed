import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import store from './store'
import API_GET from '@/services/API_GET.js'
import time from '@/aux/time.js'

import App from './App.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import FirstFeed from './components/FirstFeed.vue'
import NotFirstFeed from './components/NotFirstFeed.vue'


Vue.use(VueRouter);
Vue.use(Vuetify, {
    iconfont: 'md'
});

const routes = [{
    name: 'firstFeed',
    path: '/',
    component: FirstFeed,
}, {
    name: 'notFirstFeed',
    path: '/:sid',
    component: NotFirstFeed,
    beforeEnter: (to, from, next) => {
        loadFeeds(to, from, next)
    },
}
];

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


async function loadFeeds(to, from, next) {
    let sid = to.params.sid
    const res = await API_GET.feeds(sid)
    if (res.ok) {
        let feeds = time.sortByUpdated(res.data)
        store.dispatch('initFeeds', feeds).then(next())
    } else {
        store.dispatch('setErr', res.data).then(router.push({name: 'firstFeed'}))
    }
}