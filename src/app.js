
import {
    default as CoreSnow,
    StaticMiddleware,
    MVCMiddleware,
    APIMiddleware
} from './core';

const staticWare = new StaticMiddleware({

});
const mvcWare = new MVCMiddleware({

});
const apiWare = new APIMiddleware({

});

new CoreSnow(staticWare)
    .use(mvcWare)
    .listen(8090);