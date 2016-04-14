import sequelize from './_config';
import Sequelize from 'sequelize';


class User {
    constructor() {
        return sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
            },
            lastName: {
                type: Sequelize.STRING
            }
        }, {
                freezeTableName: true // Model tableName will be the same as the model name            
            });
    }
}
const user=new User();
export default user;
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
