import { SetActionDescriptor } from './RouteFactory';

export function post() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        SetActionDescriptor(target.constructor.name, propertyKey, 'post')
    }
}

export function get() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        SetActionDescriptor(target.constructor.name, propertyKey, 'get')
    }
}

export function actionName(actionName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        SetActionDescriptor(target.constructor.name, propertyKey, undefined, actionName)
    }
}

/**
 * 标记当前action必须要验证用户登录状态
 * 
 * @export
 * @param {boolean} [isOnlyuserId=false] 
 * @returns 
 */
export function auth() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        SetActionDescriptor(target.constructor.name, propertyKey, undefined, undefined, undefined, undefined, undefined, true)
    }
}