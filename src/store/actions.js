import * as types from './mutation-types'

export const initFeeds = ({commit}, feeds) => {
    commit(types.INIT_FEEDS, feeds)
};

export const addFeed = ({commit}, feed) => {
    commit(types.ADD_FEED, feed)
};

export const delFeed = ({commit}, idx) => {
    commit(types.DEL_FEED, idx)
};

export const setErr = ({commit}, msg) => {
    commit(types.SET_ERR, msg)
};

export const clearErr = ({commit}) => {
    commit(types.CLEAR_ERR)
};
