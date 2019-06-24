<template>
    <div class="home" :style="'--bgColorA: ' + bgColorA + '; --bgColorB: ' + bgColorB + ';'" :class="bgGradient?'gradientBg':'plainBg'">
        <el-row>
            <el-col :span="6">
                <desktop-item icon="el-icon-setting"
                              label="设置"
                              route="/setting">
                </desktop-item>
            </el-col>
            <el-col :span="6">
                <desktop-item icon="el-icon-money"
                              label="薪资计算器"
                              route="/salary-calculator"
                              background-color="#afefbf"
                              icon-color="#44aa56">
                </desktop-item>
            </el-col>
            <el-col :span="6">
                <desktop-item icon="el-icon-notebook-2"
                              label="待办事项"
                              route="/todo-list"
                              background-color="#ffee70"
                              icon-color="#bc7e21">
                </desktop-item>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue';
    import NaviPopup from "@/components/NaviPopup.vue";
    import DesktopItem from "@/components/DesktopItem.vue";// @ is an alias to /src

    @Component({
        components: {
            NaviPopup,
            HelloWorld,
            DesktopItem
        },
        computed: {
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
