var commonFilter = {};
require("jquery")
commonFilter.initialTolowerCase = function (obj) {
    var strObj = JSON.stringify(obj)
    var strObj2 = strObj.replace(/(\")(\w*)(\"\:)/g, function ($0, $1, $2, $3) {
        return $1 + $2.substring(0, 1).toLowerCase() + $2.substring(1) + $3;
    })
    return JSON.parse(strObj2);
}

module.exports = commonFilter;