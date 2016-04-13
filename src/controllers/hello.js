
import {
RestController,
RequestMapping,

ViewResult
} from '../core';

@RestController()
export default class Hello {

    @RequestMapping("/")
    home() {
        return "Hello World!";
    }

    @RequestMapping("/test")
    homeTest() {
        return { a: 'cc' };
    }

    @RequestMapping("/index")
    homeTest() {
        return ViewResult({ author: 'cc' },'index');
    }
}