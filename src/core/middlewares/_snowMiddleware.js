
export default class SnowMiddleware {
    constructor(next) {
        this.next = next;
    }
    //设置下一级责任链
    nextInvoke(middleware) {
        if (this.next === null) {
            this.next = middleware;
        } else {
            this.next.nextInvoke(middleware);
        }
    }
    invoke(context) {
        return this.next.invoke(context);
    }
}