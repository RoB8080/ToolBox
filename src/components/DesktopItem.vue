<template>
    <div class="desktop-item" @click="click">
        <div class="desktop-icon" :style="{backgroundColor: backgroundColor}">
            <i :class="icon" :style="{color: iconColor}"></i>
        </div>
        <div class="desktop-label">{{label}}</div>
    </div>
</template>

<script>
    export default {
        name: "DesktopItem",
        props: {
            icon: {
                type: String,
                default: ""
            },
            label: {
                type: String,
                default: ""
            },
            route: {
                type: String,
                default: ""
            },
            iconColor: {
                type: String,
                default: "#ffffee"
            },
            backgroundColor: {
                type: String,
                default: "#666677"
            }
        },
        methods: {
            click () {
                if(this.route !== "") this.$router.push(this.route);
            }
        }
    }
</script>

<style scoped>
    .desktop-item {
        display: inline-block;
        cursor: default;
        filter: drop-shadow(2px 2px 5px rgba(100,100,100,0.25))
    }
    .desktop-icon {
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }

    .desktop-icon > i {
        font-size: 60px;
        line-height: 80px !important;
    }

    .desktop-label {
        font-size: 16px;
        margin-top: 5px;
    }
</style>
