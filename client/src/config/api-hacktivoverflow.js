import axios from 'axios';
import { urlServer } from '@/config/url.js';

export default axios.create({
    baseURL: urlServer,
});