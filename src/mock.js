//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据

//视频单独请求

//日事件感知与智能处理
Mock.mock('/api/index/DayHandleData', 'get', (req, res) => {
    return {
        //接口请求状态，true正确，false错误
        Status: true,
        //数据
        Data: {
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
            videoSrc:"http://ugcbsy.qq.com/k05214l8gvv.mp4?sdtfrom=v1010&guid=7d7dead6a84f77d821875a1984d535f8&vkey=C720F3948A013EEBB448A4C64A909EB778CF2047B79773C7F2756FFE4825FE84DA57CEF5E25F0BBA20DA611DEE9A7029B39B8CC60569545D7B38BF954FA819D058ED867801CB06F066D6AD0E9CD901C7410BB0822BE3D8EDE24098D57D2E54E575B85F52A2C0EA6D2DD1479FABC1BC6F3AA2DD996C04625A"//视频地址
        },
        //接口错误信息
        ErrorMessage: "",
        //错误码
        ErrorCode: 0
    }
})
//报警事件列表
Mock.mock('/api/index/WarnEventList', 'get', (req, res) => {
    return {
        Status: true,
        Data: {
            //列头
            TableTitle: [{
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
            TableList: [{
                    Time: '1John Brown',
                    Address: "1123",
                    Type: '1New York No. 1 Lake Park',
                },
                {
                    Time: '2John Brown',
                    Address: "2123",
                    Type: '2New York No. 1 Lake Park',
                },
                {
                    Time: '3John Brown',
                    Address: "3123",
                    Type: '3New York No. 1 Lake Park',
                }
            ]
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//维保情况
Mock.mock('/api/index/MaintenanceSituation', 'get', (req, res) => {
    return {
        Status: true,
        Data: {
            MaintenancePepole: 11, //维保人员
            RepairPepole: 12, //维修人员
            MaintenanceSituation: 123, //维保完成情况
            MaintenanceRate: 80, //维保完成率
            PlanningTime: 12, //计划用时
            PracticalTime: 11 //实际用时
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//全市电梯总况
Mock.mock('/api/index/CityElevator', 'get', (req, res) => {
    return {
        Status: true,
        Data: {
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
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//电梯物联网感知 300安装物联网电梯列表
Mock.mock('/api/index/ElevatorIOTPerception', 'get', (req, res) => {
    return {
        Status: true,
        Data: {
            OperationTimes: 11, //累计运行次数
            SupervisionRunTime: 11, //累计监管运行时长
            AverageDailyRunningTime: 11, //平均日运行时间
            PeakRunningRatio: 11 //高峰期运行占比   
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//趋势
Mock.mock('/api/index/Trend', 'post', (req, res) => {
    return {
        Status: true,
        Data: [{
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
        ],
        ErrorMessage: "",
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
                    title: "Name",
                    key: "name"
                },
                {
                    title: "Age",
                    key: "age"
                },
                {
                    title: "Address",
                    key: "address"
                }
            ],
            //列表内容
            tableList: [{
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                }
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