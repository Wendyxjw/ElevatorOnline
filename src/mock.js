//引入mockjs
const Mock = require('mockjs')
//前端使用mockjs模拟数据
//地图请求数据 入参
var param = {
    mapZoom: 14, //地图缩放等级
    mapDataSelect: [], // 电梯分布 维保单位  故障分布 
    cityElevatorInfor: "全市" //全市电梯总况

}


// 首页 websocket数据 看Data 忽略首字母大写
Mock.mock('/api/index/Getindex', 'get', (req, res) => {
    return {
        //接口请求状态，true正确，false错误
        Status: true,
        //数据
        Data: {
            //首页底部地图
            indexData: {
                //全市故障指数
                cityFaultIndex: {
                    num: 0.8,
                    type: "down", //上升还是下降
                    rate: 0.1 //上升还是下降的指数
                },
                //全市维保指数
                cityMaintenanceIndex: {
                    num: 0.8,
                    type: "up",
                    rate: 0.1
                },
                //住宅电梯运行量
                residenceElevatorsNum: {
                    num: 0.8,
                    type: "up",
                    rate: 0.1
                },
                //商业电梯运行量
                businessElevatorsNum: {
                    num: 0.8,
                    type: "up",
                    rate: 0.1
                },
                //15年以上电梯运行量
                fifteenElevatorsNum: {
                    num: 2500
                }
            },
            //底部地图
            map: {
                //位置参数
                data: [{
                        name: "月湖公园",
                        value: 0.88, //百分比
                        num: 11, //数量
                        id: 9578,
                        isError: false, //是否故障
                        xys: [121.549234, 29.874051], //坐标
                        table: [{
                            SNo: 1, //电梯编号
                            Code: "", //所属区域
                            AD: "", //详细地址
                            eventInfor: "", //事件信息
                            isTrapped: 1, //是否困人：1 是 ，0 否
                            alarmTel: 13412341234, //报警电话
                            state: "", //状态
                            resoult: "" //处理结果

                        }]
                    },
                    {
                        name: "宁波东站",
                        value: 0.38,
                        num: 1,
                        id: 9578,
                        isError: true, //是否故障
                        table: [{
                            title: "电梯编号", //标题
                            value: "123" // 具体内容
                        }]
                    },
                    {
                        name: "宁波体育中心",
                        value: 0.95,
                        num: 1,
                        id: 9578,
                        isError: false, //是否故障
                    },
                    {
                        name: "科技公园",
                        value: 0.6,
                        num: 4,
                        id: 9578,
                        isError: true, //是否故障
                    },
                    {
                        name: "四安文化乐园",
                        value: 0.5,
                        num: 20,
                        id: 9578,
                        isError: false, //是否故障
                    },
                    {
                        name: "体育馆",
                        value: 1.0,
                        num: 30,
                        id: 9578,
                        isError: true, //是否故障
                    }
                ],
                //地图坐标
                geoCoordMap: {
                    月湖公园: [121.549234, 29.874051], //名称、坐标
                    宁波东站: [121.591921, 29.854131],
                    宁波体育中心: [121.588328, 29.877307],
                    科技公园: [121.637771, 29.880564],
                    四安文化乐园: [121.681177, 29.848743],
                    体育馆: [121.612762, 29.918887]
                }
            },
            //左1
            dayHandleData: {
                List: [{
                    //日事件报警总数：
                    Name: "DayEventWarn", //string
                    Num: 25600 //int
                }, {
                    //日事件已处理数
                    Name: "DayEventHandle",
                    Num: 25595
                }, {
                    //日事件困人数
                    Name: "DayEventTrapped",
                    Num: 30
                }, {
                    //困人故障平均处理时长
                    Name: "DayEventAverageTime",
                    Num: 10
                }],
                //第一个饼图数据
                Chart1: [{
                        Value: 335,
                        Name: "直接访问"
                    },
                    {
                        Value: 310,
                        Name: "邮件营销"
                    },
                    {
                        Value: 234,
                        Name: "联盟广告"
                    }
                ],
                //第二个饼图数据
                Chart2: [{
                        Value: 335,
                        Name: "直接访问"
                    },
                    {
                        Value: 310,
                        Name: "邮件营销"
                    },
                    {
                        Value: 234,
                        Name: "联盟广告"
                    },
                    {
                        Value: 135,
                        Name: "视频广告"
                    },
                    {
                        Value: 1548,
                        Name: "视频广告"
                    }
                ],
                //第三个饼图数据
                Chart3: [{
                        Value: 335,
                        Name: "直接访问"
                    },
                    {
                        Value: 310,
                        Name: "邮件营销"
                    },
                    {
                        Value: 234,
                        Name: "联盟广告"
                    },
                    {
                        Value: 135,
                        Name: "视频广告"
                    },
                    {
                        Value: 1548,
                        Name: "sssss"
                    }
                ],
                videoSrc: "" //视频地址
            },
            //左2
            warnEventList: {
                //列头
                tableTitle: [{
                        Title: '时间',
                        Key: 'time'
                    },
                    {
                        Title: '地点',
                        Key: 'address'
                    },
                    {
                        Title: '类型',
                        Key: 'type'
                    }
                ],
                //列表内容
                tableList: [{
                        Time: 'Sun Feb 5 2018 15:23:20 GMT+0800',
                        Address: "1123",
                        Type: '1New York No. 1 Lake Park',
                    },
                    {
                        Time: 'Sun Feb 15 2018 15:23:20 GMT+0800',
                        Address: "天目山路古墩路口2123",
                        Type: '2New York No. 1 Lake Park',
                    },
                    {
                        Time: 'Sun Feb 25 2018 15:23:20 GMT+0800',
                        Address: "我爱北京天安门3123",
                        Type: '3New York No. 1 Lake Park',
                    }
                ]
            },
            //左3
            maintenanceSituation: {
                MaintenancePepole: 11, //维保人员
                RepairPepole: 12, //维修人员
                MaintenanceSituation: 123, //维保完成情况
                MaintenanceRate: 80, //维保完成率
                PlanningTime: 12, //计划用时
                PracticalTime: 11, //实际用时
                mapCenter: "宁波" //地图中心
            },
            //右1
            cityElevator: {
                TotalElevator: 1000, //电梯总量
                InsuranceNumber: 1000, //投保数
                ElevatorBrand: 30, //电梯品牌
                PropertyUnit: 200, //物业单位
                MaintenanceUnit: 100, //维保单位
                //下拉列表数据
                CityList: [{
                        value: '全市',
                        label: '全市'
                    },
                    {
                        value: '北仑区',
                        label: '北仑区'
                    },
                    {
                        value: '海曙区',
                        label: '海曙区'
                    }
                ]
            },
            //右2
            elevatorIOTPerception: {
                OperationTimes: 11, //累计运行次数
                SupervisionRunTime: 11, //累计监管运行时长
                AverageDailyRunningTime: 11, //平均日运行时间
                PeakRunningRatio: 11 //高峰期运行占比   
            },
            //右3
            trend: {
                chart1: {
                    //x轴坐标文案
                    xText: ["电梯1", "电梯2", "电梯3", "电梯4", "电梯5"],
                    list: [{
                            name: "Forest",
                            data: [320, 332, 301, 334, 390]
                        },
                        {
                            name: "Steppe",
                            data: [220, 182, 191, 234, 290]
                        },
                        {
                            name: "Desert",
                            data: [150, 232, 201, 154, 190]
                        },
                        {
                            name: "Wetland",
                            data: [98, 77, 101, 99, 40]
                        }
                    ]
                },
                chart2: {
                    xText: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                    list: [{
                            name: "邮件营销",
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: "联盟广告",
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: "视频广告",
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: "直接访问",
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: "搜索引擎",
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                },
                chart3: {
                    xText: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                    list: [{
                            name: "邮件营销",
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: "联盟广告",
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: "视频广告",
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: "直接访问",
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: "搜索引擎",
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                }
            }

        },
        //接口错误信息
        ErrorMessage: "",
        //错误码
        ErrorCode: 0
    }
})

//日事件感知与智能处理 详情页
//入参
// {
//     pageSize: 10,//页面大小
//     pageIndex: 1, //第几页 从1开始
//     selectInfor: "",//信息来源 为空则选择全部内容 传入的是sourceInfor里面的value
//     selectHandel: ""//处理状态 为空则选择全部内容 传入的是handelStatus里面的value
//   }
Mock.mock('/api/index/DayHandleDetail', 'post', (req, res) => {
    return {
        Status: true,
        Data: {
            //信息来源
            sourceInfor: [{
                    value: "全部来源",
                    label: "全部来源"
                }, {
                    value: "物业",
                    label: "物业"
                },
                {
                    value: "北仑区",
                    label: "北仑区"
                },
                {
                    value: "海曙区",
                    label: "海曙区"
                }
            ],
            //处理状态
            handelStatus: [{
                    value: "全部状态",
                    label: "全部状态"
                },
                {
                    value: "待响应",
                    label: "待响应"
                },
                {
                    value: "处理中",
                    label: "处理中"
                },
                {
                    value: "已完成",
                    label: "已完成"
                }
            ],
            //表头
            tableTitle: [{
                    title: "序号",
                    key: "id"
                },
                {
                    title: "区域",
                    key: "district"
                },
                {
                    title: "注册代码",
                    key: "registerCode"
                },
                {
                    title: "故障代码",
                    key: "errorCode"
                },
                {
                    title: "故障说明",
                    key: "errorDesc"
                },
                {
                    title: "故障时间",
                    key: "errorDate"
                },
                {
                    title: "故障状态",
                    key: "errorState"
                }
            ],
            //列表内容
            tableList: [{
                    id: 123,
                    district: '宁波',
                    registerCode: 1234567899082,
                    errorCode: 112,
                    errorDesc: '电梯门打不开',
                    errorDate: '2018-5-28',
                    errorState: '已派单',
                },
                {
                    id: 124,
                    district: '杭州',
                    registerCode: 234367456456,
                    errorCode: 123,
                    errorDesc: '电梯门打不开',
                    errorDate: '2018-5-18',
                    errorState: '已完成',
                },
                {
                    id: 1223,
                    district: '上海',
                    registerCode: 23426743245,
                    errorCode: 114,
                    errorDesc: '电梯没空调',
                    errorDate: '2018-5-31',
                    errorState: '已派单',
                },
                {
                    id: 6123,
                    district: '重庆',
                    registerCode: 12465335345,
                    errorCode: 151,
                    errorDesc: '电梯没反应',
                    errorDate: '2018-5-29',
                    errorState: '已派单',
                },
            ],
            //共有几条数据
            pageTotle: 100
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})

//本月维保完成率
Mock.mock('/api/index/MaintenanceRate', 'get', (req, res) => {
    return {
        Status: true,
        Data: {
            //表头
            tableTitle: [{
                    title: "区域",
                    key: "address"
                },
                {
                    title: "计划",
                    key: "plan"
                },
                {
                    title: "实际",
                    key: "actual"
                },
                {
                    title: "完成率",
                    key: "rate"
                }
            ],
            //列表内容
            tableList: [{
                    address: "华北",
                    plan: 2.0,
                    actual: 4.9,
                    rate: 7.0
                },
                {
                    address: "华东",
                    plan: 4.0,
                    actual: 8.9,
                    rate: 3.0
                },
                {
                    address: "华南",
                    plan: 2.0,
                    actual: 6.9,
                    rate: 0.6
                },
                {
                    address: "东北",
                    plan: 1.0,
                    actual: 6.9,
                    rate: 2.0
                },
                {
                    address: "西北西南",
                    plan: 12.0,
                    actual: 14.9,
                    rate: 0.1
                }
            ],

        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//首页 暂时忽略 还没确定
Mock.mock('/api/index/MapData', 'post', (req, res) => {
    return {
        Status: true,
        Data: {
            //位置参数
            data: [{
                    name: "月湖公园",
                    value: 0.88, //百分比
                    num: 10, //数量
                    id: 9578,
                    isError: false, //是否故障
                },
                {
                    name: "宁波东站",
                    value: 0.38,
                    num: 5,
                    id: 9578,
                    isError: true, //是否故障
                },
                {
                    name: "宁波体育中心",
                    value: 0.95,
                    num: 1,
                    id: 9578,
                    isError: false, //是否故障
                },
                {
                    name: "科技公园",
                    value: 0.6,
                    num: 4,
                    id: 9578,
                    isError: true, //是否故障
                },
                {
                    name: "四安文化乐园",
                    value: 0.5,
                    num: 20,
                    id: 9578,
                    isError: false, //是否故障
                },
                {
                    name: "体育馆",
                    value: 1.0,
                    num: 30,
                    id: 9578,
                    isError: true, //是否故障
                }
            ],
            //地图坐标
            geoCoordMap: {
                月湖公园: [121.549234, 29.874051], //名称、坐标
                宁波东站: [121.591921, 29.854131],
                宁波体育中心: [121.588328, 29.877307],
                科技公园: [121.637771, 29.880564],
                四安文化乐园: [121.681177, 29.848743],
                体育馆: [121.612762, 29.918887]
            },
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//电梯运行信息
Mock.mock('/api/index/ElevatorInfo', 'post', (req, res) => {
    return {
        Status: true,
        Data: {
            stateData: {
                //电梯状态
            },
            errorData: {
                //电梯错误信息
                tableTitle: [{
                        title: "序号",
                        key: "id"
                    },
                    {
                        title: "告警时间",
                        key: "time"
                    },
                    {
                        title: "事故类型",
                        key: "eventType"
                    },
                    {
                        title: "故障描述",
                        key: "errorDesc"
                    },
                    {
                        title: "处理阶段",
                        key: "phase"
                    },
                    {
                        title: "状态",
                        key: "state"
                    },
                ],
                tableList: [{
                        id: 123,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 123,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 123,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 4,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 5,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 6,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 7,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 8,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 9,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 10,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    },
                    {
                        id: 11,
                        time: "2016-5-21 14:22",
                        eventType: "困人",
                        errorDesc: "遁地",
                        phase: "已接警",
                        state: "处理中"
                    }
                ]
            },
            basicData: {
                //电梯基本信息
                tableTitle: [{
                        title: "",
                        key: "name1",
                        align: "center"
                    },
                    {
                        title: "",
                        key: "value1",
                        align: "center"
                    },
                    {
                        title: "",
                        key: "name2",
                        align: "center"
                    },
                    {
                        title: "",
                        key: "value2",
                        align: "center"
                    }
                ],
                tableList: [{
                        name1: "电梯注册编号：",
                        value1: 3303872299118,
                        name2: "电梯救援识别码:",
                        value2: null
                    },
                    {
                        name1: "电梯安装地址：",
                        value1: "天蓝心广场-1",
                        name2: "所在区域:",
                        value2: "天蓝心广场"
                    },
                    {
                        name1: "电梯所在省市县（区）：",
                        value1: "柯桥区",
                        name2: "电梯类型:",
                        value2: "乘客电梯"
                    },
                    {
                        name1: "电梯品牌：",
                        value1: "",
                        name2: "电梯型号:",
                        value2: ""
                    },
                    {
                        name1: "使用单位：",
                        value1: "绍兴市华联物业有限公司（天蓝心广场-1）",
                        name2: "电梯维保单位:",
                        value2: "绍兴市华联物业有限公司"
                    },
                    {
                        name1: "制造单位：",
                        value1: "",
                        name2: "电梯安装单位:",
                        value2: ""
                    },
                    {
                        name1: "电梯地址：",
                        value1: "",
                        name2: "电梯使用状态:",
                        value2: "正常"
                    }
                ]
            }
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//故障实时进展
Mock.mock('/api/index/TheFault', 'post', (req, res) => {
    return {
        Status: true,
        Data: {
            reportData: {
                errorType: "困人",
                errorSource: "电话保修",
                applyPerson: "LLL",
                phone: "13812345678",
                applyDate: "2015-2-12 19:23",
                errorDesc: "十年生死两茫茫，不思量，自难忘。"
            },
            repairDataList: [{
                    tabName: "张心宇",
                    timeDataList: [{
                            time: "20:10",
                            type: "text",
                            title: "报修",
                            timeDifference: "3分"
                        },
                        {
                            time: "20:13",
                            type: "text",
                            title: "自动派单",
                            timeDifference: "4分"
                        },
                        {
                            time: "20:17",
                            type: "text",
                            title: "自动派单成功自动派单成功",
                            timeDifference: "3分",
                            infoList: [{
                                    name: "维修人",
                                    value: "123455"
                                },
                                {
                                    name: "联系方式",
                                    value: "123455"
                                },
                                {
                                    name: "出发时间",
                                    value: "2015-2-12 20:12"
                                },
                                {
                                    name: "到达时间",
                                    value: "2015-2-12 20:24"
                                }
                            ]
                        },
                        {
                            time: "20:20",
                            type: "text",
                            title: "报修",
                            timeDifference: "",
                            infoList: [{
                                    name: "维修人",
                                    value: "123455"
                                },
                                {
                                    name: "联系方式",
                                    value: "123455"
                                },
                                {
                                    name: "出发时间",
                                    value: "2015-2-12 20:12"
                                },
                                {
                                    name: "到达时间",
                                    value: "2015-2-12 20:24"
                                }
                            ]
                        },
                        {
                            time: "20:13",
                            type: "detail",
                            title: "自动派单",
                            timeDifference: "4分"
                        },
                        {
                            time: "20:11",
                            type: "img",
                            title: "报修",
                            timeDifference: "",
                            imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528040650451&di=84e6990325f136dbf25ebb964b533ec3&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120727%2F201995-120HG1030762.jpg"
                        }
                    ]
                },
                {
                    tabName: "姜珊",
                    timeDataList: [{
                        time: "20:11",
                        type: "img",
                        title: "报修",
                        timeDifference: "",
                        imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528040650451&di=84e6990325f136dbf25ebb964b533ec3&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120727%2F201995-120HG1030762.jpg"
                    }]
                },
                {
                    tabName: "金艺",
                    timeDataList: [{
                        time: "20:13",
                        type: "text"
                    }]
                },
                {
                    tabName: "柯维宇",
                    timeDataList: [{
                        time: "20:13",
                        type: "text"
                    }]
                }
            ]
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})