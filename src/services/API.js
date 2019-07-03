import axios from 'axios'
export default () => {
    // TODO: avoid exposing URL on github
    return axios.create({
        baseURL: `https://shielded-lake-94931.herokuapp.com/v1/`
    })
}
