# URL Shortener Microservice

A production-ready URL Shortener microservice with a responsive React frontend, built with TypeScript, Node.js, Express, and Material UI.

## Features

- 🔐 Short link generation with optional custom shortcodes
- ⏱ Default expiry of 30 minutes (configurable)
- 🔄 Redirection to original URL
- 📊 Analytics: click count, referrer, and geo-location
- 🧩 Custom logging middleware (no console.log)
- 🌍 RESTful API with robust error handling
- 💡 Fully responsive React frontend (Material UI)

##  Technologies Used

- **Backend:** Node.js, Express, TypeScript, MongoDB, GeoIP, Valid-URL
- **Frontend:** React, TypeScript, Material UI
- **Logging:** Custom Express middleware
- **GeoIP:** `geoip-lite`

---

##  Getting Started

###  Prerequisites

- Node.js (v18+)
- npm
- MongoDB

---
For Run backend(Port: 4000):
 
cd backend
npm init -y
npm install express uuid valid-url body-parser geoip-lite
npm install --save-dev typescript ts-node @types/node @types/express @types/uuid
npx tsc --init

Run the server :- npx ts-node src/server.ts


For Run Frontend(Port: 3000):

cd frontend
npm install
npm install @mui/material @emotion/react @emotion/styled axios

Run : npm start
React app will open at http://localhost:3000

API Endpoints
Create Short URL
POST /shorturls

Request Body:
{
  "url": "https://example.com",
  "validity": 30,
  "shortcode": "custom1"
}

Response:
{
  "shortLink": "http://localhost:4000/custom1",
  "expiry": "2025-01-01T00:30:00Z"
}

Get Statistics
GET /shorturls/:shortcode

Response:
{
  "url": "https://example.com",
  "clicks": 3,
  "createdAt": "...",
  "expiry": "...",
  "clickDetails": [
{
"timestamp": "...",
"referrer": "...",
"country": "IN"
}
]
}

 Logging
Custom middleware logs all requests and responses to a file — no console or built-in loggers used.

UI Features
1.Add up to 5 URLs in one go

2.Client-side validation

3.Shows shortlink + expiry

4.Analytics table with full tracking info

Testing

Tested for:

1.Valid URL handling

2.Expiry enforcement

3.Redirection

4.Duplicate shortcode prevention

5.Analytics accuracy

License
MIT © 2025 – Palak Gupta
