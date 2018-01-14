import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://multi-library.firebaseio.com/'
});

export default instance;