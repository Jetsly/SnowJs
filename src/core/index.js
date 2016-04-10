import http from 'http';
import { server } from './httpUtil'
/**
 * 核心的定义
 */
export default class CoreSnow {
    constructor(middleware) {
        this.middleware = middleware;
    }
    listen(port) {
       server.on('request',(req, res)=>{     
           this.middleware.invoke({
               req,res
           });
       })
       server.listen(port);
    }
    use(middleware) {
        this.middleware.nextInvoke(middleware);
        return this;
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