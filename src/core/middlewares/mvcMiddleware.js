import SnowMiddleware from './_snowMiddleware';

import RequestMapping from '../decorators/requestMappingDecorator'
import Controller from '../decorators/restControllerDecorator'

export default class MVCMiddleware extends SnowMiddleware {
    constructor(){
        super();
    }
    invoke(context) {
        let {req, res} = context;
        // res.setHeader('Content-Type', 'text/html');
        // res.setHeader('X-Foo', 'bar');
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.end('ok');
        super.invoke(context);
    }
}