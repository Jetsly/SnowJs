import send from 'send';
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
            if (this.pathMap.hasOwnProperty(reqPrefixUrl)) {
                const fileUrl = req.url.replace(reqPrefixUrl, this.pathMap[reqPrefixUrl]);
                return send(req, fileUrl).pipe(res);
            }
        }
        super.invoke(context);
    }
}