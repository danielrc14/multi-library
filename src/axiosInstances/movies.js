import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: 'b1ca7b438f20ebad8a0d3495159dc84c'
    }
});

export default instance;