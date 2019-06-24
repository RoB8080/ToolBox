<template>
    <div class="home" :style="'--bgColorA: ' + bgColorA + '; --bgColorB: ' + bgColorB + ';'" :class="bgGradient?'gradientBg':'plainBg'">
        <desktop-row v-for="row in map" :cols="4" :items="row"></desktop-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue';
    import NaviPopup from "@/components/NaviPopup.vue";
    import DesktopItem from "@/components/DesktopItem.vue";
    import DesktopRow from "@/components/DesktopRow.vue";
    // @ is an alias to /src

    @Component({
        components: {
            DesktopRow,
            NaviPopup,
            HelloWorld,
            DesktopItem
        },
        data: function () {
            return {
                items: [
                    {icon: "el-icon-setting", label:"设置", route:"/setting"},
                    {icon: "el-icon-money", label: "薪资计算器", route: "/salary-calculator", backgroundColor: "#afefbf", iconColor: "#44aa56"},
                    {icon: "el-icon-notebook-2", label: "待办事项", route: "/todo-list", backgroundColor: "#ffee70", iconColor: "#bc7e21"},
                    {icon: "el-icon-brush", label: "颜色转换", route: "/color-converter", backgroundColor: "#ffffef", iconColor: "#66665f"},
                    {icon: "el-icon-coin", label: "记账本", route: "/color-converter", backgroundColor: "#ffffef", iconColor: "#66665f"},
                ]
            }
        },
        computed: {
            map: function() {
                let res:Array<Array<any>> = [], l = this.$data.items.length, rem, row;
                for(let i = 0; i < l; i++) {
                    rem = i % 4;
                    row = (i - rem) / 4;
                    if(rem === 0) {
                        res[row] = [];
                    }
                    res[row][rem] = this.$data.items[i];
                }
                return res;
            },
            bgGradient: function() {
                return this.$store.state.setting.background.gradient;
            },
            bgColorA: function() {
                return this.$store.state.setting.background.colorA;
            },
            bgColorB: function() {
                return this.$store.state.setting.background.colorB;
            },
        }
    })
    export default class Home extends Vue {}
</script>

<style scoped>
    .home {
        height: 100%;
    }
    .slide-leave-active{
        transition: all 1s;

    }
    .home.plainBg {
        background-color: var(--bgColorA);
    }
    .home.gradientBg {
        background-image: linear-gradient(to top, var(--bgColorA) 0%, var(--bgColorB) 100%);
    }
    .el-row {
        padding: 20px 0;
    }
</style>
