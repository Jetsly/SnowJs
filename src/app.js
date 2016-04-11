
import {
    default as CoreSnow,
    StaticMiddleware,
    MVCMiddleware,
    APIMiddleware
} from './core';

const apiWare = new APIMiddleware({

});

const snowjs = new CoreSnow();
snowjs.use(new StaticMiddleware({
  "/assets":`${__dirname}/assets`
}));
snowjs.use(new MVCMiddleware({
   
}))
snowjs.listen(8090);