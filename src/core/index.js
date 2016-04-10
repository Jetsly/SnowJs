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
        server.on('request', (req, res) => {
            let {req: _req, res: _res} = this.middleware.invoke({
                req, res
            });
            if (!_res.finished) {
                _res.statusCode = 404;
                _res.end();
            }
        })
        server.listen(port);
    }
}


import RequestMapping from './decorators/requestMappingDecorator'
import Controller from './decorators/restControllerDecorator'

import StaticMiddleware from './middlewares/staticMiddleware'
import MVCMiddleware from './middlewares/mvcMiddleware'
import APIMiddleware from './middlewares/apiMiddleware'

export {
Controller,
RequestMapping,

StaticMiddleware,
MVCMiddleware,
APIMiddleware
}