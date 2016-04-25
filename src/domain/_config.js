import Sequelize from 'sequelize';
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect:'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle:10000
    },
    storage: 'public/conf/snowjs.sqlite',
    define: {
       timestamps: false,
       freezeTableName: true
    }
});
export default sequelize;

const STRING = Sequelize.STRING;            

export {
    STRING
}