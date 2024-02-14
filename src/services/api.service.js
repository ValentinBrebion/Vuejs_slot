import axios from '../config/axios'
const getPeople = () => {return axios.get('peoples')}

export default getPeople