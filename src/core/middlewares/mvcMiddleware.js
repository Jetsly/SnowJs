import { parse } from 'url';
import { compileFile } from 'pug';
import IocMiddleware from './_iocMiddleware';
import {
requireDir
} from '../_util';
import RequestMapping from '../decorators/requestMappingDecorator'
import RestController from '../decorators/restControllerDecorator'

export default class MVCMiddleware extends IocMiddleware {
    constructor(options) {
        super(options.components);
        this.options = Object.assign({
            controllers:'',
            viewTpl:'',
            engine: compileFile
        },options);
        this.actionMap = {};   
    }
    inject(){
       requireDir(this.options.controllers).then(controllers=> {   
           controllers.forEach(controller=>{
             if (controller.default.isController) {
                this._injectController(controller.default);
             }
           });   
       });
    }
    _injectController(controller) {
        let instance = new controller();
        const actions = Object.getOwnPropertyNames(controller.prototype);
        actions.forEach(action=> {
            if (action === 'constructor') {
                return;
            }
            let method = Object.getOwnPropertyDescriptor(controller.prototype, action);
            if(method.set&&method.set.isAutowired){
               let compnent=this.container[method.set.componentKey];
              instance[action]=compnent.get();
            }
            else if (method.value&&method.value.isAction) {
               this.actionMap[method.value.actionMap] = {
                    ctrl:controller,
                    action:method.value.name,
                    exec:instance[method.value.name].bind(instance)
               };
            }
        });
    }
    invoke(context) {
        let {req, res} = context;
        const reqUrl = parse(req.url);
        if (this.actionMap.hasOwnProperty(reqUrl.pathname)) {
            return this.actionResult(this.actionMap[reqUrl.pathname].exec(req, res), res);
        }
        super.invoke(context);
    }
    actionResult(result, res) {
        let contentType = 'text/plain';
        let body = result;
        if (typeof result === 'object') {
            contentType = 'application/json';
            body = JSON.stringify(result);
        }
        else if (typeof result === 'function') {
            contentType = 'text/html';
            body = result(this.options);
        }
        res.setHeader('Content-Type', contentType);
        if (body instanceof Promise) {
            body.done((msg) => {
                res.writeHead(200, {
                    'Content-Length': msg.length,
                });
                res.end(msg);
            });
        } else {
            res.writeHead(200, {
                'Content-Length': body.length,
            });
            res.end(body);
        }
    }
}