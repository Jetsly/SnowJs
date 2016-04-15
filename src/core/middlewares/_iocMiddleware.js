import SnowMiddleware from './_snowMiddleware';

export default class IocMiddleware extends SnowMiddleware {
    constructor(options) {
        super();
    }
    invoke(context) {
        let {req, res} = context;
        super.invoke(context);
    }
}