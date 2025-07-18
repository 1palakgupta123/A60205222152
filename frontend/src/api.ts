
import axios from 'axios';
import { log } from './loggingMiddleware';

const client = axios.create({ baseURL: 'http://localhost:4000' });
client.interceptors.request.use(req => { log('HTTP_REQ', req); return req; });
client.interceptors.response.use(res => { log('HTTP_RES', res); return res; });

export function createShort(data: { url: string; validity?: number; shortcode?: string }) {
  return client.post('/shorturls', data).then(r => r.data);
}
export function getStats(shortcode: string) {
  return client.get(`/shorturls/${shortcode}`).then(r => r.data);
}
export function listAll() {
  return client.get('/shorturls').then(r => r.data);
}
