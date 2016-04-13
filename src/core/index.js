import http from 'http';
import { server } from './httpUtil'
/**
 * 核心的定义
 */
export default class CoreSnow {
    constructor() {
        this.middleware = null;
    }
    use(middleware) {
        if (this.middleware === null) {
            this.middleware = middleware;
        } else {
            this.middleware.nextInvoke(middleware);
        }
    }
    listen(port) {
        this.middleware.nextInvoke({
            invoke: function(context) {
                let {req, res} = context;
                res.writeHead(404, {
                    'Content-Type': 'text/plain',
                    'Content-Length': 0,
                });
                res.end();
            }
        })
        server.on('request', (req, res) => {
            this.middleware.invoke({
                req, res
            });
        })
        server.listen(port);
    }
}


import RequestMapping from './decorators/requestMappingDecorator'
import RestController from './decorators/restControllerDecorator'

import StaticMiddleware from './middlewares/staticMiddleware'
import MVCMiddleware from './middlewares/mvcMiddleware'
import APIMiddleware from './middlewares/apiMiddleware'

import ViewResult from './actionResult/ViewResult'

export {
RestController,
RequestMapping,

StaticMiddleware,
MVCMiddleware,
APIMiddleware,

ViewResult
}