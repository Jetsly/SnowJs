/**
 * view 视图
 */
export default function ViewResult(model, viewName) {
    let viewCache = {};
    return function(options) {
        if (viewCache.hasOwnProperty(viewName)) {
            return viewCache[viewName](model);
        }
        let viewNameContents = options.engine.compileFile(`${options.viewTpl}/${viewName}.jade`,{});
        viewCache[viewName] = viewNameContents;
        return viewNameContents(model);
    }
}