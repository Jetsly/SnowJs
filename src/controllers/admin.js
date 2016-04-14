
import {
Controller,
RequestMapping,

View
} from '../core';

import user from '../domain/user';

@Controller()
export default class Admin {

    @RequestMapping("/admin")
    admin(req, res) {
        user.sync({ force: true }).then(function() {
            // Table created
            const a= user.create({
                firstName: 'John',
                lastName: 'Hancock'
            });
            console.log(a);
        });
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