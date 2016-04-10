import SnowMiddleware from './_snowMiddleware';

export default class APIMiddleware extends SnowMiddleware {
    constructor() {
        super();
    }
    invoke(context) {
        let {req, res} = context;

        return super.invoke(context);
    }
}