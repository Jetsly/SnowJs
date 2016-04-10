import url from 'url';
import SnowMiddleware from './_snowMiddleware';

export default class StaticMiddleware extends SnowMiddleware {
    constructor(pathMap) {
        super();
        this.pathMap = pathMap;
    }
    invoke(context) {
        let {req, res} = context;
        if (/^\/[^\/]*/.test(req.url)) {
            const reqPrefixUrl = /^\/[^\/]*/.exec(req.url)[0];
            if(this.pathMap.hasOwnProperty(reqPrefixUrl)){
                
            }
        }
        return super.invoke(context);
    }
}