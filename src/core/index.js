import http from 'http';
import { server } from './httpUtil'
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs';
import {resolve} from 'path';
/**
 * 
 * 核心的定义
 */
export default class CoreSnow {
    constructor() {
        this._middleware = null;
        let _options = safeLoad(readFileSync(resolve(__dirname, '..', 'conf/app.yml')));
        this.options = Object.assign({
            application: {
                port: 8080
            }
        }, _options);

    }
    static createServer() {
        return new CoreSnow();
    }
    _init() {
        this._middleware.next={
            invoke: function(context) {
                let {req, res} = context;
                res.writeHead(404, {
                    'Content-Type': 'text/plain',
                    'Content-Length': 0,
                });
                res.end();
            }
        }
        server.on('request', (req, res) => {
            this._middleware.invoke({
                req, res
            });
        })
    }
    use(middleware) {
        middleware.config=this.options;
        if (this._middleware === null) {
            this._middleware = middleware;
        } else {
            this._middleware.next=middleware;
        }
    }
    listen(port) {
        this._init();
        server.listen(port);
    }
    start() {
        this._init();
        server.listen(this.options.application.port);
    }
}


import RequestMapping from './decorators/requestMappingDecorator'
import Controller from './decorators/restControllerDecorator'
import Autowired from './decorators/autowiredDecorator'
import Component from './decorators/componentDecorator'

import StaticMiddleware from './middlewares/staticMiddleware'
import MVCMiddleware from './middlewares/mvcMiddleware'

import View from './actionResult/ViewResult'

export {
Controller,
RequestMapping,
Component,
Autowired,

StaticMiddleware,
MVCMiddleware,

View
}