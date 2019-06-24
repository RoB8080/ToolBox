<template>
    <div class="navi-popup" :style="'--animation-duration: ' + (animationDuration / 2) + 'ms'">
        <transition name="popup">
            <el-button class="navi-popup-button"
                       circle
                       type="primary"
                       icon="el-icon-menu"
                       v-show="showButton"
                       @click="openMenu"></el-button>
        </transition>
        <transition name="popup">
            <div class="navi-popup-menu-container"
                 @mouseleave="closeMenu"
                 v-show="showMenu">
                <el-menu class="navi-popup-menu"
                         background-color="#efefef"
                         router>
                    <el-menu-item index="/">
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span slot="title">首页</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/salary-calculator">
                        <template slot="title">
                            <i class="el-icon-money"></i>
                            <span slot="title">工资计算器</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        props: {
            animation: {
                type: Boolean,
                default: false
            },
            animationDuration: {
                type: Number,
                default: 1000
            }
        },
        data: function () {
            return {
                showMenu: false,
                showButton: true
            }
        },
        methods: {
            openMenu() {
                this.showButton = false;
                let scope = this;
                window.setTimeout(function(){scope.showMenu = true}, this.animationDuration / 2)
            },
            closeMenu() {
                this.showMenu = false;
                let scope = this;
                window.setTimeout(function(){scope.showButton = true}, this.animationDuration / 2)
            }
        }
    })
</script>

<style scoped>
    .navi-popup {
        position: fixed;
        left: 0;
        top: 50%;
        transform: translateY(-50%);

        max-height: 600px;
        overflow-y: auto;
    }
    .navi-popup-button {
        margin-left: 30px;
    }
    .navi-popup-menu {
        width: 150px;
        border: none;
    }

    .popup-enter-active {
        animation: popin var(--animation-duration) ease-out;
    }
    .popup-leave-active {
        animation: popout var(--animation-duration) ease-in;
    }
    
    @keyframes popin {
        from {
            transform: translateX(-200px);
        }

        to {
            transform: translateX(0px);
        }
    }

    @keyframes popout {
        from {
            transform: translateX(0px);
        }

        to {
            transform: translateX(-200px);
        }
    }
</style>
