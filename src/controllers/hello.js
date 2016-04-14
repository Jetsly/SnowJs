
import {
Controller,
RequestMapping,

View
} from '../core';

@Controller()
export default class Hello {

    @RequestMapping("/")
    home() {
        return "Hello World!";
    }

    @RequestMapping("/test")
    test() {
        return { a: 'cc' };
    }

    @RequestMapping("/index")
    index() {
        return View({ author: 'cc' },'inex');
    }
}