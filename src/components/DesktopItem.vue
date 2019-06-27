<template>
    <div class="desktop-item" @click="click" :class="size">
        <div class="desktop-icon"  :style="{backgroundColor: backgroundColor}">
            <i :class="icon" :style="{color: iconColor}"></i>
        </div>
        <div class="desktop-label">{{label}}</div>
    </div>
</template>

<script>
    export default {
        name: "DesktopItem",
        props: {
            size: {
                type: String,
                default: "large"
            },
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

<style lang="sass" scoped>
    .desktop-item 
        display: inline-block
        cursor: default
        filter: drop-shadow(2px 2px 5px rgba(100,100,100,0.25))
        &.large
            & > .desktop-icon
                width: 80px
                height: 80px
                border-radius: 10px
                & > i
                    font-size: 60px
                    line-height: 80px !important
            & > .desktop-label
                font-size: 16px
                margin-top: 5px

        &.small
            & > .desktop-icon
                width: 64px
                height: 64px
                border-radius: 8px
                & > i
                    font-size: 48px
                    line-height: 64px !important
            & > .desktop-label
                font-size: 12px
                margin-top: 4px

    
</style>
