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

    public request: core.Request;
    public response: core.Response;
    public UserInfo: UserInfo;

    public view(viewName: string, viewData?: any): ViewResult {
        return new ViewResult(viewName, viewData)
    }
}


