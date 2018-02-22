//http请求模块

"use strict";
var axios = require("axios");

// 请求拦截
axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// 响应拦截
axios.interceptors.response.use(
    function (response) {
        if (response.status&&response.data.Status) {
            return response.data.Data;
        } else {
            console.log(response.data.ErrorMessage)
        }
        
    },
    function (error) {
        return Promise.reject(error);
    }
);


module.exports = {
    //
    getDayHandleData(){
        return axios.get("/api/index/DayHandleData")
    },
}