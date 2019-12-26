/**
 * The main file for the Express/Node.js server.  The server sends static assets to the client and
 * proxies REST API calls to the 'saints-xctf-api' server.
 * @author Andrew Jarombek
 * @since 12/26/2019
 */

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express();

app.use(helmet({}));
app.use(bodyParser.json({limit: '50mb'}));

app.get('*', (req, res) => {
   res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.port || 8080;
const server = app.listen(port, () => {
    console.info(`saintsxctf.com running on port ${port}`);
});

export default server;
