/**
 * view 视图
 */
export default function ViewResult(model, viewName) {
    let viewCache = {};
    return function(options) {
        
        if (viewCache.hasOwnProperty(viewName)) {
            return viewCache[viewName](model);
        }
        const viewPath=`${options.viewTpl}/${viewName}.jade`;
        try{
            let viewNameContents = options.engine(viewPath,{});
            viewCache[viewName] = viewNameContents;
             return viewNameContents(model);
        }catch(e){
            return `Not Found ViewName ${viewName},with path ${viewPath}`;
        }       
    }
}