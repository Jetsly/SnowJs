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
            this.middleware.invoke({
                req, res
            });
            console.log(1);
        })
        server.listen(port);
    }
}


import RequestMapping from './decorators/requestMappingDecorator'
import RestController from './decorators/restControllerDecorator'

import StaticMiddleware from './middlewares/staticMiddleware'
import MVCMiddleware from './middlewares/mvcMiddleware'
import APIMiddleware from './middlewares/apiMiddleware'

export {
RestController,
RequestMapping,

StaticMiddleware,
MVCMiddleware,
APIMiddleware
}