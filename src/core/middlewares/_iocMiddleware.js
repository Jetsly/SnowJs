import SnowMiddleware from './_snowMiddleware';
import {
requireDirs
} from '../_util';

export default class IocMiddleware extends SnowMiddleware {
    constructor(components=[]) {
        super();
        this.container={};  
        this._components=components;
        this._componentKeys=[];     
    }    
    inject(){        
       requireDirs(this._components).forEach(component=>{         
          if(component.default&&component.default.isComponent){
              this._injectContainer(component.default);
          }                  
        });
        delete this._components;
        this._resolveContainer();
    } 
    forEachAction(prototype,func){
        const actions = Object.getOwnPropertyNames(prototype);
        actions.forEach(action=> {
           if (action === 'constructor') {
               return;
           }
           let method = Object.getOwnPropertyDescriptor(prototype, action);
           func(action,method);
        })
    }    
    _resolveContainer(){
       this._componentKeys.forEach(key=>{
            let obj=this.container[key];
            let assemblyFun=[];
            this.forEachAction(obj.component.prototype,(action,method)=>{                
                if(method.set&&method.set.isAutowired){
                    let compnent=this.container[method.set.componentKey];
                    assemblyFun.push(instance=>{
                        instance[action]=compnent.get();
                    });           
                }  
            });            
            if(assemblyFun.length>0){
                delete this.container[key];
                this.container[key]={
                    component:obj.component,
                    get:()=>{
                      let instance= obj.get();
                      assemblyFun.forEach(func=>{
                         func(instance);
                      });
                      return instance;
                   }
                }
            }
        })
    }
    _injectContainer(component){
        let instance=()=>{
            return new component();
        }
        if(component.isSingleton){
            instance=instance();
        }   
        this._componentKeys.push(component.componentKey);
        this.container[component.componentKey]={
            // isSingleton:component.isSingleton,
            component:component,
            get:()=>{
                return instance;
            }
        }        
    }  
}