import * as bodyParser from 'body-parser';
import express = require('express');
import cors = require('cors');
import path = require('path');
import { BaseRoutes } from './routes/baseRoutes';

class BaseApp{
    public app: express.Application;

    constructor(routes : BaseRoutes<any>[]){
        this.app = express();
        this.app.use(cors());
        this.config();
        routes.forEach(route => {
            route.routes(this.app);
        });
    }

    private config() :void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use( express.static(publicPath));
        this.app.all('/*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            next();
          });
    }

    
}

export default BaseApp;