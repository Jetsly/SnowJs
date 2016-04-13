
import { readFileSync } from 'fs';
/**
 * view 视图
 */
export default function ViewResult(model, viewName) {
    let viewCache = {};
    return function(options) {
        if (viewCache.hasOwnProperty(viewName)) {
            return options.engine.compile(viewCache[viewName], {})(model);
        }
        let viewNameContents = readFileSync(`${options.viewTpl}/${viewName}.jade`);
        viewCache[viewName] = viewNameContents;
        return options.engine.compile(viewNameContents, {})(model);
    }
}