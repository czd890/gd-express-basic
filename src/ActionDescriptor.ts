
/**
 *请求处理函数描述对象
 *
 * @export
 * @class ActionDescriptor
 */
export class ActionDescriptor {

    /**
     * controller的class对象原型
     *
     * @type {*}
     * @memberof ActionDescriptor
     */
    public ControllerType: any;

    /**
     *controller的class类型名称
     *
     * @type {string}
     * @memberof ActionDescriptor
     */
    public ControllerTypeName: string;

    /**
     *路由指定的controller名称
     *
     * @type {string}
     * @memberof ActionDescriptor
     */
    public ControllerName: string;

    /**
     *请求处理函数的原型
     *
     * @type {*}
     * @memberof ActionDescriptor
     */
    public ActionType: any;

    /**
     *请求处理函数的函数名称
     *
     * @type {string}
     * @memberof ActionDescriptor
     */
    public ActionTypeName: string;

    /**
     *路由指定的action名称
     *
     * @type {string}
     * @memberof ActionDescriptor
     */
    public ActionName: string;

    /**
     *当前处理函数限定的httpmethod
     *
     * @type {string}
     * @memberof ActionDescriptor
     */
    public HttpMethod: string;

    /**
     *唯一id
     *
     * @type {string}
     * @memberof ActionDescriptor
     */
    public Id: string;

    /**
     *是否需要做授权检查
     *
     * @type {boolean}
     * @memberof ActionDescriptor
     */
    public isAuth?: boolean;
}