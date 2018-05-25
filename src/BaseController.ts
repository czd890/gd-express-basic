import { UserInfo } from './UserInfo';
import { ViewResult } from './ViewResult';
import * as core from "express-serve-static-core";



export class BaseController {
    constructor(request: core.Request, response: core.Response) {
        this.request = request;
        this.response = response;
        var _req: any = this.request;
        this.UserInfo = _req.UserInfo;
    }
    /**
     * 当前请求的request对象
     * 
     * @type {core.Request}
     * @memberof BaseController
     */
    public request: core.Request;
    /**
     * 当前请求的response对象
     * 
     * @type {core.Response}
     * @memberof BaseController
     */
    public response: core.Response;
    /**
     * 当前登录的用户
     * 
     * @type {UserInfo}
     * @memberof BaseController
     */
    public UserInfo: UserInfo;

    /**
     * 返回view由视图引擎在服务端进行渲染
     * 
     * @param {string} viewName 当前视图的名称
     * @param {*} [viewData] 需要传递给视图的数据
     * @returns {ViewResult} 
     * @memberof BaseController
     */
    public view(viewName: string, viewData?: any): ViewResult {
        return new ViewResult(viewName, viewData)
    }
}


