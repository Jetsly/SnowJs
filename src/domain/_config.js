import Sequelize from 'sequelize';
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs';
import {resolve} from 'path';

const options = Object.assign({

}, safeLoad(readFileSync(resolve(__dirname, '..', 'conf/app.yml'))));

let sequelize= new Sequelize(
    options.database.database,
    options.database.username,
    options.database.password, 
    options.database.option);

export default sequelize;