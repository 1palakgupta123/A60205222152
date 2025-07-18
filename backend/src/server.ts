
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(routes);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🟢 URL‑shortener running on http://localhost:${port}`));
