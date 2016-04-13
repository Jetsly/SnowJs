
import {
default as CoreSnow,
StaticMiddleware,
MVCMiddleware,
APIMiddleware
} from './core';

// const apiWare = new APIMiddleware({

// });

const app = new CoreSnow();

app.use(new StaticMiddleware({
    "/assets": `${__dirname}/assets`
}));

app.use(new MVCMiddleware({
    controllers: `${__dirname}/controllers`,
    viewTpl: `${__dirname}/views`
}))
app.listen(8090);