import { server } from './httplib'

/**
 * 核心的定义
 */
export default class CoreSnow {
    static listen(port){
        server.listen(port)
    }
}


import RequestMapping from './decorators/requestMappingDecorator'
import Controller from './decorators/restControllerDecorator'

export {
    Controller,
    RequestMapping
}