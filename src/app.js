
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

const snowjs = new CoreSnow();
snowjs.use(staticWare);
snowjs.use(mvcWare)
snowjs.listen(8090);