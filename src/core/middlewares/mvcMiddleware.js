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
        files.forEach(file=>{
            var ext = path.extname(file);
            var base = path.basename(file, ext);

            var controller = require(path.join(options.controllers, base));
            if(controller.default.isController){
                this.inject(controller.default);
            }
        });
    }   
    inject(controller){
        let aa=new controller();
        const actions= Object.getOwnPropertyNames(controller.prototype);
        actions.forEach(action=>{
           if(action==='constructor'){
               return;
           }
           let method = Object.getOwnPropertyDescriptor(controller.prototype, action);
           if(method.value.isAction){
               this.actionMap[method.value.actionMap]=method.value;
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
        let contentType='text/plain';
        if(typeof body==='object'){
            contentType='application/json';
            body=JSON.stringify(body);
        }
        res.setHeader('Content-Type',contentType);
        res.writeHead(200, {
            'Content-Length': body.length,
        });
        res.end(body);
    }
}