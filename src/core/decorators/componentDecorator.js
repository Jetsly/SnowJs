/**
 * 被注入的组件
 */
export default function Component(key,singleton=true) {
    return function(target, name, descriptor) {
        descriptor.value.isComponent=true;
        descriptor.value.isSingleton=singleton
        return descriptor;
    };
}