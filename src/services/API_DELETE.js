import API from '@/services/API'

export default {
    feed(sid, cid) {
        let ep = 'feeds/' + sid + '/' + cid;
        return API().delete(ep).then(res => {
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
