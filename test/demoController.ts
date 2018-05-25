import { BaseController, post, fromQuery, fromBody } from "../src/index"


@fromQuery()
export class demoActionParams {
    @fromQuery()
    id: string;
    @fromQuery()
    name: string;
    @fromQuery()
    pageSize: number;
}

export class demoController extends BaseController {
    @post()
    demoAction(@fromBody(type => demoActionParams) query: demoActionParams, @fromQuery() p2: string) {
        // this.response.send({ "aa": "b" });
        console.log(query, p2, '--------demoAction proccess')
    }

    @post()
    postaa() {

        console.log('--------postaa proccess')
    }
}