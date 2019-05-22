import API from '@/services/API'

export default {
    feeds(sid) {
        let ep = 'feeds/' + sid;
        return API().get(ep).then(res => {
            return {
                "ok": true,
                "data": res.data.success
            }
        })
            .catch(err => {
                return {
                    "ok": false,
                    "data": err.response.data.error
                }
            });
    },
    feed(sid, cid) {
        let ep = 'feeds/' + sid + '/' + cid;
        return API().get(ep).then(res => {
            return {
                "ok": true,
                "data": res.data.success
            }
        })
            .catch(err => {
                return {
                    "ok": false,
                    "data": err.response.data.error
                }
            });
    },
}
