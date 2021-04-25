import axios from 'axios'

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Oppadayo/plant-manager'
})

export default api