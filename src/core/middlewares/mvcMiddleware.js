import SnowMiddleware from './_snowMiddleware';

export default class MVCMiddleware extends SnowMiddleware {
    constructor(options) {
        super(null)
    }
    invoke(context) {
        let {req, res} = context;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('ok');
        //return next.invoke(context);
    }
}