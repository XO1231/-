const KEY = 'BF-ADMIN';

/**
 * 
 * @param {*} obj 
 */
function save(obj){
    var str = JSON.stringify(obj);
    // 只能存字符串
    window.localStorage.setItem(KEY,str)
}

function get(){
    var info = window.localStorage.getItem(KEY);
    if(info){
        return JSON.parse(info);
    }
    return undefined;
}

function reset(){
    window.localStorage.removeItem(KEY)
}

export default {
    save,
    get,
    reset
}