// import Sequelize from 'sequelize';
// import { safeLoad } from 'js-yaml'
// import { readFileSync } from 'fs';
// import { resolve } from 'path';
// import sequelize from './_config';
// import Sequelize from 'sequelize';
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
    // return sequelize.define('user', {
        //     firstName: {
        //         type: Sequelize.STRING,
        //         field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
        //     },
        //     lastName: {
        //         type: Sequelize.STRING
        //     }
        // }, {
        //         freezeTableName: true // Model tableName will be the same as the model name            
        //     });
// const options = Object.assign({

// }, safeLoad(readFileSync(resolve(__dirname, '..', 'conf/app.yml'))));

// let sequelize= new Sequelize(
//     options.database.database,
//     options.database.username,
//     options.database.password, 
//     options.database.option);

// export default sequelize;
