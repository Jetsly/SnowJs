/**
 * 定义请求的路径
 */
export default function RequestMapping(path) {
    return function(target, name, descriptor) {
        descriptor.value.isAction=true;
        descriptor.value.actionMap=path;
        return descriptor;
    };
}