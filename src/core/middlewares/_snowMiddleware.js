
export default class SnowMiddleware {    
    constructor(){
        this.next=null;
    }
    nextInvoke(middleware) {
        if (this.next === null) {
            this.next = middleware;
        } else {
            this.next.nextInvoke(middleware);
        }
    }
    invoke(context) {
        if (this.next === null) {
            return context;
        }
        return this.next.invoke(context);
    }
}