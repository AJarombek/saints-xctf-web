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

import userRoute from './route/userRouter';

const app = express();
const userRouter = userRoute();

app.use(helmet({}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/api/user', userRouter);

app.use(express.static(__dirname));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.port || 8090;
const server = app.listen(port, () => {
    console.info(`saintsxctf.com running on port ${port}`);
});

export default server;
