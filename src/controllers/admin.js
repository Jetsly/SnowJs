
import {
Controller,
RequestMapping,
Autowired,

View
} from '../core';


@Controller()
export default class Admin {
    constructor(){
      this._user=null;
    }
    @Autowired('user')
    set user(value){
       this._user=value;
    }

    @RequestMapping("/admin")
    admin(req, res) {
        let a=this._user.get();        
        return View({ author: 'cc' }, 'index');
    }

    @RequestMapping("/test")
    test(req, res) {
        return { a: 'cc' };
    }

    @RequestMapping("/")
    testStr(req, res) {
        return 'Hello World';
    }
}