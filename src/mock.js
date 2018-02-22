//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据

//视频单独请求

//日事件感知与智能处理
Mock.mock('/api/index/DayHandleData','get', (req, res) => {
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
            ]
        },
        //接口错误信息
        ErrorMessage: "",
        //错误码
        ErrorCode: 0
    }
})
//报警事件列表
Mock.mock('/api/index/WarnEventList','get', (req, res) => {
    return {
        Status: true,
        Data: {
            //列头
            TableTitle: [{
                    Title: '时间',
                    Key: 'Time'
                },
                {
                    Title: '地点',
                    Key: 'Address'
                },
                {
                    Title: '类型',
                    Key: 'Type'
                }
            ],
            //列表内容
            TableList: [{
                    Time: 'John Brown',
                    Address: "123",
                    Type: 'New York No. 1 Lake Park',
                },
                {
                    Time: 'John Brown',
                    Address: "123",
                    Type: 'New York No. 1 Lake Park',
                },
                {
                    Time: 'John Brown',
                    Address: "123",
                    Type: 'New York No. 1 Lake Park',
                }
            ]
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//维保情况
Mock.mock('/api/index/MaintenanceSituation','get', (req, res) => {
    return {
        Status: true,
        Data: {
            MaintenancePepole:11,//维保人员
            RepairPepole:12,//维修人员
            MaintenanceSituation:123,//维保完成情况
            MaintenanceRate:"80%",//维保完成率
            PlanningTime:12,//计划用时
            PracticalTime:14//实际用时
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//全市电梯总况
Mock.mock('/api/index/CityElevator','get', (req, res) => {
    return {
        Status: true,
        Data: {
            TotalElevator:1000,//电梯总量
            InsuranceNumber:1000,//投保数
            ElevatorBrand:30,//电梯品牌
            PropertyUnit:200,//物业单位
            MaintenanceUnit:100,//维保单位
            //下拉列表数据
            CityList:[[
                {
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
            ]]
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//电梯物联网感知 300安装物联网电梯列表
Mock.mock('/api/index/ElevatorIOTPerception','get', (req, res) => {
    return {
        Status: true,
        Data: {
            OperationTimes:11,//累计运行次数
            SupervisionRunTime:11,//累计监管运行时长
            AverageDailyRunningTime:11,//平均日运行时间
            PeakRunningRatio:11//高峰期运行占比   
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//趋势
Mock.mock('/api/index/Trend','post', (req, res) => {
    return {
        Status: true,
        Data: {

        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})
//报警事件列表
Mock.mock('/api/index/WarnEventList', (req, res) => {
    return {
        Status: true,
        Data: {
            //对应x轴名称
            XText:"2012",
            //该X轴上的数据
            List:[{
                name:"Forest",
                number:123
            },{
                name:"Forest",
                number:123
            },{
                name:"Forest",
                number:123
            }]
        },
        ErrorMessage: "",
        ErrorCode: 0
    }
})