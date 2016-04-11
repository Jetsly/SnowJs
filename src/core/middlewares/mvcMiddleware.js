import { readdirSync } from 'fs';
import { parse } from 'url';
import path from 'path';
import SnowMiddleware from './_snowMiddleware';

import RequestMapping from '../decorators/requestMappingDecorator'
import RestController from '../decorators/restControllerDecorator'

export default class MVCMiddleware extends SnowMiddleware {
    constructor(options) {0
        super();
        this.actionMap = {};
        var files = readdirSync(options.controllers);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var ext = path.extname(file);
            var base = path.basename(file, ext);

            var controller = require(path.join(options.controllers, base));
            if(controller.default.isController){
                this.inject(controller.default);
            }
        }
    }   
    inject(controller){
        const actions= Object.getOwnPropertyNames(controller.prototype);
        actions.forEach(action=>{
           if(action!=='constructor') {
               let desc = Object.getOwnPropertyDescriptor(controller.prototype, action);
               let [actionPath,actionMethod]= desc.value();
               this.actionMap[actionPath]=actionMethod;
           }
        });        
    } 
    invoke(context) {
        let {req, res} = context;
        const reqUrl= parse(req.url);
        if(this.actionMap.hasOwnProperty(reqUrl.pathname)) {
            return this.actionResult(this.actionMap[reqUrl.pathname](req, res),res);
        }
        super.invoke(context);
    }
    actionResult(body,res){
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Length': body.length,
        });
        res.end(body);
    }
}