import axios from 'axios';

export const axiosCliente = axios.create({
    baseURL: 'http://192.168.100.12',
    timeout: 5000,
});