/**
 * 自动注入
 */
export default function Autowired(key) {
    return function(target, name, descriptor) {
        descriptor.value.isAutowired=true;
        return descriptor;
    };
}