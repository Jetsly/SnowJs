import http from 'http';
import { server } from './httpUtil'
/**
 * 核心的定义
 */
export default class CoreSnow {
    listen(port) {
        server.on('request', (req, res) => {
            this.middleware.invoke({
                req, res
            });
        })
        server.listen(port);
    }
    use(middleware) {
        if (this.middleware === null) {
            this.middleware = middleware;
        } else {
            this.middleware.nextInvoke(middleware);
        }
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