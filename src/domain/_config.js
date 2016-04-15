import Sequelize from 'sequelize';
import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs';
import { resolve } from 'path';
// var sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql' | 'mariadb' | 'sqlite' | 'postgres' | 'mssql',

//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     },

//     // SQLite only
//     storage: 'path/to/database.sqlite'
// });

const options = Object.assign({

}, safeLoad(readFileSync(resolve(__dirname, '..', 'conf/app.yml'))));

let sequelize= new Sequelize(
    options.database.database,
    options.database.username,
    options.database.password, 
    options.database.option);

export default sequelize;
