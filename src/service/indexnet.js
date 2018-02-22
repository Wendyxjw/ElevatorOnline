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
        if (response.status && response.data.Status) {
            return response.data.Data;
        } else {
            console.log("接口错误")
        }

    },
    function (error) {
        return Promise.reject(error);
    }
);


module.exports = {
    //日事件感知与智能处理
    getDayHandleData() {
        return axios.get("/api/index/DayHandleData")
    },
    //报警事件列表
    getWarnEventList() {
        return axios.get("/api/index/WarnEventList")
    },
    //维保情况
    getMaintenanceSituation() {
        return axios.get("/api/index/MaintenanceSituation")
    },
    //全市电梯总况
    getCityElevator() {
        return axios.get("/api/index/CityElevator")
    },
    //电梯物联网感知 300安装物联网电梯列表
    getElevatorIOTPerception() {
        return axios.get("/api/index/ElevatorIOTPerception")
    },
    //趋势
    getTrend(obj) {
        return axios.post("/api/index/Trend",obj)
    },

}