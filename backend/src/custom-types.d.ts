// Declare missing type definitions for untyped modules

declare module 'valid-url' {
  export function isUri(value: string): boolean | undefined;
  export function isHttpUri(value: string): boolean | undefined;
  export function isHttpsUri(value: string): boolean | undefined;
  export function isWebUri(value: string): boolean | undefined;
}

declare module 'geoip-lite' {
  export interface Geo {
    range: [number, number];
    country: string;
    region: string;
    eu: string;
    timezone: string;
    city: string;
    ll: [number, number];
    metro: number;
    area: number;
  }

  export function lookup(ip: string): Geo | null;
}
