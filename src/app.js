
import {
    default as CoreSnow,
    StaticMiddleware,
    MVCMiddleware,
    APIMiddleware
} from './core';

const mvcWare = new MVCMiddleware({

});
const apiWare = new APIMiddleware({

});

const snowjs = new CoreSnow();
snowjs.use(new StaticMiddleware({
  
}));
snowjs.use(mvcWare)
snowjs.listen(8090);