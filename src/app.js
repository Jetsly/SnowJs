
import {
default as CoreSnow,
StaticMiddleware,
MVCMiddleware,
APIMiddleware
} from './core';

// const apiWare = new APIMiddleware({

// });

const app = CoreSnow.createServer();

app.use(new StaticMiddleware({
    "/assets": `${__dirname}/assets`
}));

app.use(new MVCMiddleware({
    controllers: `${__dirname}/controllers`,
    viewTpl: `${__dirname}/views`
}))
app.start();