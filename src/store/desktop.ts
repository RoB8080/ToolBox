let itemList = [
    {icon: "el-icon-setting", label:"设置", route:"/setting"},
    //{icon: "el-icon-money", label: "薪资计算器", route: "/salary-calculator", backgroundColor: "#afefbf", iconColor: "#44aa56"},
    //{icon: "el-icon-notebook-2", label: "待办事项", route: "/todo-list", backgroundColor: "#ffee70", iconColor: "#bc7e21"},
    {icon: "el-icon-brush", label: "颜色转换", route: "/color-converter", backgroundColor: "#ffffef", iconColor: "#66665f"},
    {icon: "el-icon-map-location", label: "地图", route: "/map", backgroundColor: "#fefffd", iconColor: "#6699ff"},
    {icon: "el-icon-bell", label: "测试", route: "/test", backgroundColor: "#fefffd", iconColor: "#6699ff"},
    //{icon: "el-icon-coin", label: "记账本", route: "/color-converter", backgroundColor: "#ffffef", iconColor: "#66665f"},
];

export default {
    namespaced: true,
    state: {
        config: {
            pages: 2,
        },
        items: itemList,
        map: (():Array<number> => {
            let mapString = localStorage.getItem("DesktopMap");
            if(mapString !== null) {
                //存在 直接读入并返回初值
                let map: Array<any> = mapString.split(";");
                map.forEach((e,i) => {
                   map[i] = parseInt(e);
                });
                return map;
            } else {
                //不存在 写入并返回初值
                let t: Array<number> = [],len = itemList.length;
                for(let i = 0; i < len; i++ ) {
                    t[i] = i;
                }
                localStorage.setItem("DesktopMap",t.join(";"));
                return t;
            }
        })()

    },
    mutations: {
        items(state: any, items: Array<Object>):void {
            state.items = items;
        },
        map(state: any, map: Array<number>): void {
            state.map = map;
            localStorage.setItem("DesktopMap",map.join(";"))
        }
    },
    actions: {
        items(context: any, items: Array<Object>): void {
            context.commit("items", items);
        },
        map(context: any, map: Array<number>): void {
            context.commit("map", map);
            console.log("触发store写入");
        }
    }
}
