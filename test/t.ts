
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


var _request: any = {
    query: { id: 'id1', name: 'nnn', pageSize: 44, p2: "p222" },
    body: { id: 'body_id1', name: 'body_nnn', pageSize: 9, p2: "body_p222", body: { req_bb: "req_body_propterty_childProptery" } },
    cookies: { cookieName: 'cookie value' },
    headers: { headerName: 'header value' }
}

var request = _request as core.Request;
var response = {
    locals: {
        actionDescriptor: actionDesc
    },
    send() {
        console.log('response send', arguments);
        if (arguments.length > 0 && arguments[0].query) {
            var res = arguments[0];
            if (res.query.id != _request.query.id) {
                console.error('返回绑定参数不相等');
            }
            if (res.query.name != _request.query.name) {
                console.error('返回绑定参数不相等');
            }
            if (res.query.pageSize != _request.query.pageSize) {
                console.error('返回绑定参数不相等');
            }
            if (res.query.cookieName != _request.cookies.cookieName) {
                console.error('返回绑定参数不相等');
            }
            if (res.query.headerName != _request.headers.headerName) {
                console.error('返回绑定参数不相等');
            }
            if (res.p2 != _request.query.p2) {
                console.error('返回绑定参数不相等');
            }
            if (res.req_body.id != _request.body.id) {
                console.error('返回绑定参数不相等');
            }
            if (res.req_body.name != _request.body.name) {
                console.error('返回绑定参数不相等');
            }
            if (res.req_body.pageSize != _request.body.pageSize) {
                console.error('返回绑定参数不相等');
            }
            if (res.req_body.p2 != _request.body.p2) {
                console.error('返回绑定参数不相等');
            }
            if (res.req_body.body.req_bb != _request.body.body.req_bb) {
                console.error('返回绑定参数不相等');
            }
        }
        console.log('response send finish');
    },
    end() {
        console.log('response end', arguments);
    }
} as core.Response;

RequestHandler(request, response, () => { });

console.log('----------------------postaa')
response.locals.actionDescriptor = aaactionDesc
RequestHandler(request, response, () => { });


// var controller = new demoController(request, response);
// controller.demoAction({ id: 'id1', name: 'nnn', pageSize: 44 }, 'p2');


