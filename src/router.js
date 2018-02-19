var index=require('./views/index/index.vue');
var dayevent=require("./views/dayevent/index.vue");
const routers = [
    {
        path: '/',
        component:index
    },{
        path:"/dayevent",
        component: dayevent
    }
    
];
export default routers;