/**
 * 被注入的组件
 */
export default function Component(componentKey,singleton=true) {
    return function(target, name, descriptor) {
        target.componentKey=componentKey;
        target.isComponent=true;
        target.isSingleton=singleton;        
        return descriptor;
    };
}