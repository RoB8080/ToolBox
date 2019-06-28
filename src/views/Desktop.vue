<template>
    <keep-alive>
        <div class="desktop" :style="'--bgColorA: ' + bgColorA + '; --bgColorB: ' + bgColorB + ';'" :class="bgGradient?'gradientBg':'plainBg'">
            <desktop-row v-for="(row, index) in map"
                         :key="'r' + index"
                         :cols="4"
                         :items="row"
                         :size="screenSize"></desktop-row>
        </div>
    </keep-alive>
</template>

<script lang="ts">
    import Vue from 'vue';
    import HelloWorld from '@/components/HelloWorld.vue';
    import NaviPopup from "@/components/NaviPopup.vue";
    import DesktopItem from "@/components/DesktopItem.vue";
    import DesktopRow from "@/components/DesktopRow.vue";
    // @ is an alias to /src

    export default Vue.extend({
        name: "Desktop",
        components: {
            DesktopRow,
            NaviPopup,
            HelloWorld,
            DesktopItem,
        },
        data () {
            return {
                items: [
                    {icon: "el-icon-setting", label:"设置", route:"/setting"},
                    //{icon: "el-icon-money", label: "薪资计算器", route: "/salary-calculator", backgroundColor: "#afefbf", iconColor: "#44aa56"},
                    //{icon: "el-icon-notebook-2", label: "待办事项", route: "/todo-list", backgroundColor: "#ffee70", iconColor: "#bc7e21"},
                    {icon: "el-icon-brush", label: "颜色转换", route: "/color-converter", backgroundColor: "#ffffef", iconColor: "#66665f"},
                    //{icon: "el-icon-coin", label: "记账本", route: "/color-converter", backgroundColor: "#ffffef", iconColor: "#66665f"},
                ],
                screenSize: "large"
            }
        },
        computed: {
            map: function(): Array<Array<any>> {
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
            bgGradient: function(): boolean {
                return this.$store.state.setting.background.gradient;
            },
            bgColorA: function(): string {
                return this.$store.state.setting.background.colorA;
            },
            bgColorB: function(): string {
                return this.$store.state.setting.background.colorB;
            },
        },
        methods: {
            resizeHandle () {
                this.screenSize = document.body.clientWidth < 768 ? "small" : "large";
            }
        },
        created (): void {
            window.addEventListener("resize", this.resizeHandle);
        },
        mounted (): void {
            this.resizeHandle();
        },
        beforeDestroy(): void {
            window.removeEventListener("resize", this.resizeHandle);
        }
    })
</script>

<style scoped>
    .desktop {
        height: 100%;
    }
    .slide-leave-active{
        transition: all 1s;

    }
    .desktop.plainBg {
        background-color: var(--bgColorA);
    }
    .desktop.gradientBg {
        background-image: linear-gradient(to top, var(--bgColorA) 0%, var(--bgColorB) 100%);
    }
    .el-row {
        padding: 20px 0;
    }
</style>
