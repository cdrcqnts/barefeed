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
        state.err = payload
    },
    [types.CLEAR_ERR](state) {
        state.err = ""
    }
};