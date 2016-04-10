import SnowMiddleware from './_snowMiddleware';

export default class MVCMiddleware extends SnowMiddleware {
    invoke(context) {
        let {req, res} = context;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('ok');
        return super.invoke(context);
    }
}