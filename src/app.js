
import {
default as CoreSnow,
StaticMiddleware,
MVCMiddleware
} from './core';

const app = CoreSnow.createServer();

app.use(new StaticMiddleware({
    "/assets": `${__dirname}/assets`
}));

app.use(new MVCMiddleware({
    components:[`${__dirname}/domain`],
    controllers: `${__dirname}/controllers`,
    viewTpl: `${__dirname}/views`,    
}))
app.start();