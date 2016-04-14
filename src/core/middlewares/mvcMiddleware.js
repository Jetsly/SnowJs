import { parse } from 'url';
import { compileFile } from 'pug';
import {
requireDir
} from '../_util';
import SnowMiddleware from './_snowMiddleware';

import RequestMapping from '../decorators/requestMappingDecorator'
import RestController from '../decorators/restControllerDecorator'

export default class MVCMiddleware extends SnowMiddleware {
    constructor(options) {
        super();
        this.options = Object.assign(options, {
            engine: compileFile
        });
        this.actionMap = {};
        requireDir(options.controllers).then(controller=> {
            if (controller.default.isController) {
                this.inject(controller.default);
            }
        })
    }
    inject(controller) {
        let aa = new controller();
        const actions = Object.getOwnPropertyNames(controller.prototype);
        actions.forEach(action=> {
            if (action === 'constructor') {
                return;
            }
            let method = Object.getOwnPropertyDescriptor(controller.prototype, action);
            if (method.value.isAction) {
                this.actionMap[method.value.actionMap] = method.value;
            }
        });
    }
    invoke(context) {
        let {req, res} = context;
        const reqUrl = parse(req.url);
        if (this.actionMap.hasOwnProperty(reqUrl.pathname)) {
            return this.actionResult(this.actionMap[reqUrl.pathname](req, res), res);
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