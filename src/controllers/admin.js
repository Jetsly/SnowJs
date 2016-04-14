
import {
Controller,
RequestMapping,

View
} from '../core';

@Controller()
export default class Admin {

    @RequestMapping("/admin")
    admin(req, res) {
       return View({ author: 'cc' },'index');
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