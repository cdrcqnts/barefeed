const moment = require("moment");

export default {
    convDate(time) {
        return moment(time).format("ddd, MMM Do YYYY");
    },
    convUpdTime(time) {
        return moment(time)
            .startOf("second")
            .fromNow();
    },
    sortByUpdated(feeds) {
        return feeds.sort((a, b) => (moment(a.updated) < moment(b.updated)) ? 1 : -1)
    },
    now() {
        return moment();
    }
}