
import * as core from "express-serve-static-core";
import { demoController } from "./demoController";
import { demoController as ggg } from "./demoController";
import { GetActionDescriptor, SetActionDescriptor, RequestHandler } from "../src/index";

console.log('begin--------------------')
console.log(demoController === ggg)

var a = (Object.getOwnPropertyDescriptor(demoController.prototype, 'demoAction') as PropertyDescriptor).value
SetActionDescriptor('demoController', 'demoAction', undefined, undefined, 'demo', demoController, a, false);


var a = (Object.getOwnPropertyDescriptor(demoController.prototype, 'postaa') as PropertyDescriptor).value
SetActionDescriptor('demoController', 'postaa', undefined, undefined, 'demo', demoController, a, false);


var actionDesc = GetActionDescriptor('demo', 'demoaction', 'POST')
var aaactionDesc = GetActionDescriptor('demo', 'postaa', 'POST')


var request = { query: { id: 'id1', name: 'nnn', pageSize: 44, p2: "p222" } } as core.Request;
var response = {
    locals: {
        actionDescriptor: actionDesc
    }
} as core.Response;

RequestHandler(request, response, () => { });

console.log('----------------------postaa')
response.locals.actionDescriptor = aaactionDesc
RequestHandler(request, response, () => { });


// var controller = new demoController(request, response);
// controller.demoAction({ id: 'id1', name: 'nnn', pageSize: 44 }, 'p2');


