<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view :responsive="true"></router-view>
        </transition>
        <float-button icon="el-icon-s-home" :radius="28" :icon-size="22" @click="$router.push('/')" style="z-index: 10;"></float-button>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import FloatButton from "@/components/FloatButton.vue"

    export default Vue.extend({
        name: "app",
        components: {
            FloatButton
        },
        data: function() {
            return {
                transitionName: "",
                screenSize: "large"
            }
        },
        computed: {
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = (to.path === "/" ? 'close': toDepth < fromDepth ? 'close' : 'open' );
            }
        },
        methods: {
            resizeHandle (): void {
                this.screenSize = document.body.clientWidth < 768 ? "small" : "large";
            }
        },
        mounted (): void {
            window.addEventListener("resize", this.resizeHandle);
        },
        beforeDestroy(): void {
            window.removeEventListener("resize", this.resizeHandle);
        }
    })

</script>

<style lang="scss">
    html {
        height: 100%
    }
    body {
        margin: 0;
        height: 100%;
        overflow: hidden;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        overflow: hidden;
    }
    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .open-enter-active {
        animation: open-app 0.4s;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 1;
    }
    .close-leave-active {
        animation: open-app 0.4s reverse;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 1;
    }
    .open-leave-active, .close-enter-active {
        transition: opacity 0.4s;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: -1;
    }
    @keyframes open-app {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
</style>
