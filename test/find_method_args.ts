function getArgs(func: Function) {
    //匹配函数括号里的参数  
    var method = func.toString();
    console.info(method)
    method = method.length > 500 ? method.substring(0, 500) : method;
    method = method.replace("\r|\n|\\s", "")
    var args = method.match(/.*?\(.*?\)/i);
    if (args == null) throw Error('can not match method parameters');
    method = args[0];
    method = method.replace(/.*?\(|\)/, "").replace(')', '');
    //分解参数成数组  
    var arr = method.split(",").map(function (arg) {
        //去空格和内联注释  
        return arg.replace(/\/\*.*\*\//, "").trim();
    }).filter(function (args) {
        //确保没有undefineds  
        return args;
    });
    return arr
}

class aa {
    public abc(arg1: any, arg2: object) {

    }
}
function abcd() {

}
var hh = function (ac: any) {

}
var m1 = new aa().abc;



console.log(getArgs(m1))
console.log(getArgs(abcd))
console.log(getArgs(hh))