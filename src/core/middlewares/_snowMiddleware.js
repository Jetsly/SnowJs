
export default class SnowMiddleware {
    constructor() {
        this._middleware = null;
        this._config={};
    }
    set config(value){
        this._config=value
    }
    set next(middleware) {
        if (this._middleware === null) {
            this._middleware = middleware;
        } else {
            this._middleware.next=middleware;
        }
    }
    invoke(context) {
        let {req, res} = context;
        if (this._middleware !== null && !res.finished) {
            this._middleware.invoke(context);
        }
    }
}