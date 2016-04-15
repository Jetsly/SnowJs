/**
 * 自动注入
 */
export default function Autowired(componentKey) {
    return function(target, name, descriptor) {
        descriptor.set.isAutowired=true;
        descriptor.set.componentKey=componentKey;
        return descriptor;
    };
}