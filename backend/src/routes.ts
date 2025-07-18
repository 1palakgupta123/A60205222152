
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import validUrl from 'valid-url';
import { loggingMiddleware } from './loggingMiddleware';
import { createShortUrl, getShortUrl, recordClick, listAll } from './storage';
import { ShortUrl, Click } from './models';
import geoip from 'geoip-lite';

const router = express.Router();
router.use(loggingMiddleware);

function genCode(): string {
  return uuidv4().slice(0, 6);
}

router.post('/shorturls', (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url || typeof url !== 'string' || !validUrl.isWebUri(url)) {
    return res.status(400).json({ message: 'Invalid URL format' });
  }
  const life = Number.isInteger(validity) ? validity : 30;
  const expiresAt = new Date(Date.now() + life * 60000).toISOString();

  const code = shortcode
    ? /^[A-Za-z0-9]{3,}$/.test(shortcode) ? shortcode : null
    : genCode();

  if (!code) return res.status(400).json({ message: 'Invalid shortcode' });

  try {
    const su: ShortUrl = {
      shortcode: code,
      originalUrl: url,
      createdAt: new Date().toISOString(),
      expiresAt,
      clicks: [],
    };
    createShortUrl(su);
    res.status(201).json({
      shortLink: `${req.protocol}://${req.get('host')}/${code}`,
      expiry: expiresAt,
    });
  } catch (e: any) {
    if (e.message === 'SHORTCODE_EXISTS') {
      return res.status(409).json({ message: 'Shortcode already in use' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/shorturls/:code', (req, res) => {
  const su = getShortUrl(req.params.code);
  if (!su) return res.status(404).json({ message: 'Not found' });
  return res.json({
    originalUrl: su.originalUrl,
    createdAt: su.createdAt,
    expiry: su.expiresAt,
    clicks: su.clicks,
    clickCount: su.clicks.length,
  });
});

router.get('/:code', (req, res) => {
  const code = req.params.code;
  const su = getShortUrl(code);
  if (!su) return res.status(404).json({ message: 'Not found' });
  if (new Date() > new Date(su.expiresAt)) {
    return res.status(410).json({ message: 'Link expired' });
  }
const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
const geo = geoip.lookup(ip)?.country || 'Unknown';

const click: Click = {
  timestamp: new Date().toISOString(),
  referrer: req.get('referrer') || null,
  geo,
};
  recordClick(code, click);
  res.redirect(su.originalUrl);
});

router.get('/shorturls', (req, res) => {
  res.json(listAll().map(su => ({
    shortcode: su.shortcode,
    originalUrl: su.originalUrl,
    createdAt: su.createdAt,
    expiry: su.expiresAt,
    clickCount: su.clicks.length,
  })));
});

export default router;
