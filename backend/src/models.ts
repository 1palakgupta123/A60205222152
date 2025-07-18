
export type Click = {
  timestamp: string;
  referrer: string | null;
  geo: string;
};

export type ShortUrl = {
  shortcode: string;
  originalUrl: string;
  createdAt: string;
  expiresAt: string;
  clicks: Click[];
};
