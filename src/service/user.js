
import {
    Component,
    Autowired
} from '../core';

@Component('user')
export default class User {
    constructor() {
    }
    @Autowired('doa')
    set dao(value){
        this._dao=value;
    }
    get(){
        return this._dao.getDao();
    }
}
