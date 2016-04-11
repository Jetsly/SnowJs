/**
 * 定义请求的路径
 */
export default function RequestMapping(path) {
    return function(target, name, descriptor) {
        let action = descriptor.value;
        descriptor.value = function(params) {
            return [path, action]
        }
        return descriptor;
    }
}