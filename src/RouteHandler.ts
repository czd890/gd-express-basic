import { UserInfo } from './UserInfo';
import * as core from "express-serve-static-core";
import { ViewResult } from './ViewResult';
import { GetActionDescriptor, SetActionDescriptor } from './RouteFactory';
import { ActionDescriptor } from './ActionDescriptor';

function getRouteTokens(path: string) {
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

export function RequestHandler(req: core.Request, res: core.Response, next: core.NextFunction) {
    var desc: ActionDescriptor = res.locals.actionDescriptor
    if (desc) {
        var cname = desc.ControllerName
        new Promise((reslove, reject) => {
            var cType = desc.ControllerType;
            var c = new cType(req, res);
            var actionResult = desc.ActionType.call(c);
            return reslove(actionResult)
        }).then(actionResult => {
            if (actionResult instanceof ViewResult) {

                Promise.resolve(actionResult.data).then(ViewActionResultData => {
                    res.render(cname + '/' + actionResult.name, ViewActionResultData, (err, html) => {
                        if (err) {
                            next(err);
                        } else {
                            res.send(html)
                            res.end();
                        }
                    });
                }).catch(function (viewDataError) {
                    next(viewDataError);
                });
            } else if (typeof actionResult !== 'undefined') {
                //process object send response json
                res.send(actionResult)
                res.end()
            } else {
                //process not response or origin response.render or response.send.
                process.nextTick((_res: any) => {
                    if (!_res.finished) {
                        _res.end();
                    }
                }, res)
            }
        }).catch(processRequestError => {
            next(processRequestError);
        })
        // Promise.resolve(actionResult).then(promiseActionResult => {
        //     //is view
        //     if (promiseActionResult instanceof ViewResult) {
        //         Promise.resolve(promiseActionResult.data).then(promiseViewActionResultData => {
        //             return new Promise((resolve, reject) => {
        //                 res.render(cname + '/' + promiseActionResult.name, promiseViewActionResultData, (err, html) => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 })
        //             });
        //         }).catch(viewDataError => {
        //             res.render('error', viewDataError)
        //         })
        //     } else if (typeof promiseActionResult !== 'undefined') {
        //         res.send(promiseActionResult)
        //         res.end()
        //     } else {
        //         process.nextTick((_res: any) => {
        //             if (!_res.finished) {
        //                 _res.end();
        //             }
        //         }, res)
        //     }
        // }).catch(error => {
        //     res.send('error')
        // })
    } else {
        next && next();
    }
}

export function RouteHandler(app: core.Express, controllers: any) {

    find(controllers)

    app.use('/', (req, res, next) => {
        var ua=req.header('user-agent');
        var clientVersionInfo:any={};
        clientVersionInfo.isWechat = /MicroMessenger/i.test(ua);
        clientVersionInfo.isAndroid = /Android|Linux/i.test(ua);
        clientVersionInfo.isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua);
        clientVersionInfo.appVersion = ua.match(/appVersion\/[0-9]\.[0-9]\.[0-9]/);
        clientVersionInfo.appVersion = clientVersionInfo.appVersion && clientVersionInfo.appVersion.length ? clientVersionInfo.appVersion[0] : 0;
        var _req:any=req;
        _req.clientVersionInfo=clientVersionInfo;

        var pathArr = getRouteTokens(req.path)

        var controller = (pathArr[0] && pathArr[0].toLowerCase()) || 'home';
        var action = (pathArr[1] && pathArr[1].toLowerCase()) || 'index'

        // console.log('req route:::', controller, action, req.path, req.method)

        var desc = GetActionDescriptor(controller, action, req.method)
        if (desc && (!desc.HttpMethod || (desc.HttpMethod && desc.HttpMethod === req.method))) {

            res.locals.authInfo = { isAuth: desc.isAuth };
            res.locals.actionDescriptor = desc;
        }
        next && next()
    })
}