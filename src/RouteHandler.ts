import * as core from "express-serve-static-core";
import { ViewResult } from './ViewResult';
import { GetActionDescriptor, SetActionDescriptor } from './RouteFactory';

function getRoutes(path: string) {
    var pathArr = path.split('/')
    var arr: string[] = [];
    pathArr.forEach(element => {
        if (element) arr.push(element)
    });
    return arr
}
function find(controllers: any) {
    // console.log('finding all controllers and actions')
    var _reg_controller_names = Object.getOwnPropertyNames(controllers)
    for (var index = 0; index < _reg_controller_names.length; index++) {
        var _reg_controller_name = _reg_controller_names[index];
        // console.log('finded controller:' + _reg_controller_name)
        var _reg_controller_Desc = Object.getOwnPropertyDescriptor(controllers, _reg_controller_name)
        if (_reg_controller_name === '__esModule') continue;

        var cType = _reg_controller_Desc.value;
        var cName = cType.name;

        var aNames = Object.getOwnPropertyNames(cType.prototype)
        for (var index2 = 0; index2 < aNames.length; index2++) {
            var aName = aNames[index2];
            if (aName === 'constructor') continue;
            var aType = Object.getOwnPropertyDescriptor(cType.prototype, aName).value
            SetActionDescriptor(cName, aName, undefined, undefined, _reg_controller_name, cType, aType)
        }
    }
}

export default function (app: core.Express, controllers: any) {

    find(controllers)

    app.use('/', (req, res, next) => {
        var pathArr = getRoutes(req.path)

        var controller = (pathArr[0] && pathArr[0].toLowerCase()) || 'home';
        var action = (pathArr[1] && pathArr[1].toLowerCase()) || 'index'

        // console.log('req route:::', controller, action, req.path, req.method)

        var desc = GetActionDescriptor(controller, action, req.method)
        if (desc && (!desc.HttpMethod || (desc.HttpMethod && desc.HttpMethod === req.method))) {

            res.locals.authInfo = { isAuth: desc.isAuth };
            res.locals.actionDescriptor = desc;

            var cType = desc.ControllerType;
            var c = new cType(req, res);
            var actionResult = desc.ActionType.call(c);
            var cname = desc.ControllerName
            //in view

            if (actionResult instanceof ViewResult) {
                Promise.resolve(actionResult.data).then(p => {
                    res.render(cname + '/' + actionResult.name, p)
                })
                return;
            }
            //in not view
            Promise.resolve(actionResult).then(promiseActionResult => {
                if (promiseActionResult instanceof ViewResult) {
                    Promise.resolve(promiseActionResult.data).then(promiseActionResultData => {
                        res.render(cname + '/' + promiseActionResult.name, promiseActionResultData)
                    })
                } else if (typeof promiseActionResult !== 'undefined') {
                    res.send(promiseActionResult)
                    res.end()
                }
            }).catch(error => {
                res.send('error')
            })
        } else {
            next && next()
        }
        // new Controllers.Order(req, res).Index()
    })
}