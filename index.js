import express from 'express';
import fs from 'fs';
import { dataJson } from './src/data.js';

const app = express();
const port = 3000;
const statusSuccess = 200;
const option = {
    'Content-Type': 'application/javascript; charset=utf-8',
}

app.use( function(req, res) {
    const url = req.url;
    fs.writeFileSync('photos.txt', JSON.stringify(dataJson.photo));
    fs.writeFileSync('comments.txt', JSON.stringify(dataJson.comments));

    res.writeHead(statusSuccess, option);
    const dataPhotos = fs.readFileSync('photos.txt', 'utf8');
    const dataComments = fs.readFileSync('comments.txt', 'utf8');

    try {
        switch (url) {
            case "/":
                res.write('main');
                res.end();
                break;
            case "/photos":
                res.write(dataPhotos);
                res.end();
                break;
            case "/comments":
                res.write(dataComments);
                res.end();
                break;
            default:
                res.write('error:wrong route');
                res.end();
        }
    } catch (e) {
        return e.message
    }
}).listen(port, ()=>{})
