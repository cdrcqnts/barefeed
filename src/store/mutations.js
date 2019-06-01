import * as types from './mutation-types'

export const mutations = {
    [types.INIT_FEEDS](state, payload) {
        state.feeds.push(...payload)
    },
    [types.ADD_FEED](state, payload) {
        state.feeds.push(payload)
    },
    [types.DEL_FEED](state, index) {
        state.feeds.splice(index, 1)
    },
    [types.SET_ERR](state, payload) {
        state.err.push(payload)
    },
    [types.RESET_ERR](state) {
        state.err = []
    },
    [types.PODCAST_DLG_ON](state) {
        state.podcastDlg = true
    },
    [types.PODCAST_DLG_OFF](state) {
        state.podcastDlg = false
    },
};