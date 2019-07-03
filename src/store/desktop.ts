export default {
    namespaced: true,
    state: {
        config: {
            pages: 2,
        },
        items: [
            {icon: "el-icon-setting", label:"设置", route:"/setting"},,,
            //{icon: "el-icon-money", label: "薪资计算器", route: "/salary-calculator", backgroundColor: "#afefbf", iconColor: "#44aa56"},
            //{icon: "el-icon-notebook-2", label: "待办事项", route: "/todo-list", backgroundColor: "#ffee70", iconColor: "#bc7e21"},
            {icon: "el-icon-brush", label: "颜色转换", route: "/color-converter", backgroundColor: "#ffffef", iconColor: "#66665f"},
            {icon: "el-icon-map-location", label: "地图", route: "/map", backgroundColor: "#fefffd", iconColor: "#6699ff"},
            {icon: "el-icon-bell", label: "测试", route: "/test", backgroundColor: "#fefffd", iconColor: "#6699ff"},
            //{icon: "el-icon-coin", label: "记账本", route: "/color-converter", backgroundColor: "#ffffef", iconColor: "#66665f"},
        ],

    },
    mutations: {
        backgroundGradient(state: any, enable: boolean) {
            state.background.gradient = enable;
        },
        backgroundColorA(state: any, color: string) {
            state.background.colorA = color;
        },
        backgroundColorB(state: any,color: string) {
            state.background.colorB = color;
        },
    },
    actions: {
        backgroundGradient(context: any, enable: boolean) {
            context.commit("backgroundGradient", enable);
        },
        backgroundColorA(context: any, color: string) {
            context.commit("backgroundColorA",color);
        },
        backgroundColorB(context: any, color: string) {
            context.commit("backgroundColorB",color);
        },
    }
}
