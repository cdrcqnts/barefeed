import axios from 'axios'
export default () => {
    return axios.create({
        baseURL: `https://shielded-lake-94931.herokuapp.com/`
    })
}
// TODO avoid exposing URL on github