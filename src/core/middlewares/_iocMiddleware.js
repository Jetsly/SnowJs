import SnowMiddleware from './_snowMiddleware';
import {
requireDir
} from '../_util';

export default class IocMiddleware extends SnowMiddleware {
    constructor(components=[]) {
        super();
        this.container={};          
        components.forEach(componentDir=>{            
            requireDir(componentDir).then(components=>{
                components.forEach(component=>{
                   if(component.default.isComponent){
                     this._injectContainer(component.default)
                   }
                });
                this.inject();
            })
        });
    }         
    _injectContainer(component){
        let instance=()=>{
            return new component();
        }
        if(component.isSingleton){
            instance=instance();
        }    
        this.container[component.componentKey]={
            isSingleton:component.isSingleton,
            get:()=>{
                return instance;
            }
        }        
    }
    inject(){}
    invoke(context) {
        let {req, res} = context;
        super.invoke(context);
    }
}