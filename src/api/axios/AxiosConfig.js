import axios from 'axios';

export default axios.create({
    baseURL: 'http://157.90.232.183:9090/',
    auth: {
        username: 'konstil_joilart',
        password: 'konstil2024'
    }
});
