import express from 'express';
import fs from 'fs';
import { dataJson } from './src/data.js';

const app = express();
const port = 3000;

app.use((req, res) => {
    const url = req.url;
    if (!fs.existsSync('photos.txt')) fs.writeFileSync('photos.txt', JSON.stringify(dataJson.photo));
    if (!fs.existsSync('comments.txt')) fs.writeFileSync('comments.txt', JSON.stringify(dataJson.comments));

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/javascript; charset=utf-8');

    const dataPhotos = fs.readFileSync('photos.txt', 'utf8');
    const dataComments = fs.readFileSync('comments.txt', 'utf8');

    try {
        switch (url) {
            case '/':
                res.write('main');
                res.end();
                break;
            case '/photos':
                res.write(dataPhotos);
                res.end();
                break;
            case '/comments':
                res.write(dataComments);
                res.end();
                break;
            case '/data':
                if (req.method === 'POST') {
                    let body = '';
                    req.on('data', (data) => {
                        body += data.toString();
                    }).on('end', () => {
                        let data = JSON.parse(body)
                        let dataPhotosArr = JSON.parse(dataPhotos)
                        dataPhotosArr.push(data)
                        fs.writeFileSync("photos.txt", JSON.stringify(dataPhotosArr));
                        res.write(JSON.stringify(fs.readFileSync("photos.txt")));
                    });
                }
                res.end();
                break;
            default:
                res.status(400).send('Bad Request');
                res.end();
        }
    } catch (e) {
        return e.message
    }
}).listen(port, () => {})
