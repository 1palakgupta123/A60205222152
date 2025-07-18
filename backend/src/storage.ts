
import { ShortUrl, Click } from './models';

const urlMap = new Map<string, ShortUrl>();
const logs: any[] = [];

export function writeLog(entry: any) {
  logs.push(entry);
}

export function getLogs() {
  return logs;
}

export function createShortUrl(su: ShortUrl) {
  if (urlMap.has(su.shortcode)) throw new Error('SHORTCODE_EXISTS');
  urlMap.set(su.shortcode, su);
}

export function getShortUrl(code: string) {
  return urlMap.get(code);
}

export function recordClick(code: string, click: Click) {
  const su = urlMap.get(code);
  if (su) su.clicks.push(click);
}

export function listAll() {
  return Array.from(urlMap.values());
}
