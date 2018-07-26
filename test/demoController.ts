import { BaseController, post, fromQuery, fromBody, fromCookie, fromHeader, property } from "../src/index"


export class demoActionBodyParams {
    id: string;
    name: string;
    pageSize: number;
    body: {
        req_bb: string
    }
}


export class demoActionQueryParams {
    @property()
    id: string;
    @property()
    name: string;
    @property()
    pageSize: number;
    @fromCookie()
    cookieName: string;
    @fromHeader()
    headerName: string;
    @fromBody()
    body: any;
}

export class demoController extends BaseController {
    @post()
    demoAction(@fromQuery(type => demoActionQueryParams) query: demoActionQueryParams,
        @fromQuery() p2: string,
        @fromBody() req_body: demoActionBodyParams) {
        // this.response.send({ "aa": "b" });
        // console.log(query, p2, '--------demoAction proccess')
        return { query, p2, req_body }
    }

    @post()
    postaa() {

        console.log('--------postaa proccess')
    }
}