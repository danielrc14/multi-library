import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
    params: {
        key: 'AIzaSyB-I8Tf5tVK4EMaS8_fZKmUBKYYalIlf2E'
    }
});

export default instance;