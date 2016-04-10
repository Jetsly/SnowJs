
export default class SnowMiddleware {
    constructor(next) {
        this.next = next;
    }
    //设置下一级责任链
    nextInvoke(middleware) {
        if (this.next) {
            this.next.nextInvoke(middleware);
        } else {
            this.next = middleware;
        }
    }
    invoke(context) {
      return next.invoke(context);
    }
}