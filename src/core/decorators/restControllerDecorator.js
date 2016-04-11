/**
 * 定义为控制器
 */
export default function RestController() {
    return function(target, name, descriptor) {   
        target.isController=true;                          
    }
}