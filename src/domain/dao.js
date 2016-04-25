import {
    Component
} from '../core';

import {
    default as sequelize,
    STRING
} from './_config';

const User= sequelize.define('user', {
            firstName: {
                type: STRING,
                field: 'first_name' 
            },
            lastName: {
                type: STRING,
                field: 'last_name' 
            }
        });
            
@Component('doa')
export default class Doa {
    constructor() {
        sequelize.sync().then(()=>{
            User.create({
                  firstName: 'janedoe',
                  lastName: 'aa'
            });
        });    
    }
    getDao(){
        return 1;
    }
}
