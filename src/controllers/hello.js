
import {
    RestController,
    RequestMapping 
} from '../core'; 

@RestController()
export default class Hello {
    
    @RequestMapping("/")
    home(){
        return "Hello World!";
    }
    
    @RequestMapping("/test")
    homeTest(){
        return {a:'cc'};
    }
}