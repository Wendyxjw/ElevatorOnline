const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index/index.vue'], resolve)
    }
];
export default routers;