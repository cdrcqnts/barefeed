import API from '@/services/API'


export default {
    feed(sid, url) {
        var ep = 'feeds/' + sid;
        if (sid === "" || sid === undefined) {
            ep = 'feeds'
        }
        return API().post(ep, {
                url: url
            }).then(res => {
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
    }
}