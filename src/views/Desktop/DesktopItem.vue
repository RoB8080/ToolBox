<template>
    <div class="desktop-item" @mousedown="mouseDown($event)" @touchstart="touchStart($event)" :class="size">
        <div class="desktop-icon"  :style="{backgroundColor: backgroundColor}">
            <i :class="icon" :style="{color: iconColor}"></i>
        </div>
        <div class="desktop-label">{{label}}</div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        name: "DesktopItem",
        props: {
            size: {
                type: String,
                default: "large"
            },
            item: {
                type: Object,
                default:() => {return{
                    icon: "",
                    label: "",
                    route: "",
                    iconColor: "#ffffee",
                    backgroundColor: "#666677",
                }}
            },
        },
        data () {
            return {
                icon: "",
                label: "",
                route: "",
                iconColor: "#ffffee",
                backgroundColor: "#666677",
                isClickGap: false,
            }
        },
        methods: {
            mouseDown (e: MouseEvent): void {
                e.preventDefault();
                let scope = this;
                this.isClickGap = true;
                let timeoutID: number = window.setTimeout(function() {
                    scope.isClickGap = false;
                    scope.$emit("adjust", e);
                },1000);
                let handler = this.getEventEndHandler(timeoutID, false);
                this.$parent.$el.addEventListener('mouseup',handler);
                this.$parent.$el.addEventListener('mouseleave',handler);
            },
            touchStart (e: TouchEvent): void {
                e.preventDefault();
                let scope = this;
                this.isClickGap = true;
                let timeoutID: number = window.setTimeout(function() {
                    scope.isClickGap = false;
                    scope.$emit("adjust", e);
                },1000);
                let handler = this.getEventEndHandler(timeoutID, true);
                this.$parent.$el.addEventListener('touchend',handler);
            },
            getEventEndHandler (timeoutID: number, touch: boolean): EventListener {
                let eventEndHandler: EventListener, scope = this;
                if (touch)
                    eventEndHandler = function() {
                        window.clearTimeout(timeoutID);
                        scope.$parent.$el.removeEventListener('touchend',eventEndHandler);
                        if(scope.$data.isClickGap) {
                            scope.click();
                        }
                        scope.isClickGap = true;
                    };
                else
                    eventEndHandler = function() {
                        window.clearTimeout(timeoutID);
                        scope.$parent.$el.removeEventListener('mouseup',eventEndHandler);
                        scope.$parent.$el.removeEventListener('mouseleave',eventEndHandler);
                        if(scope.$data.isClickGap) {
                            scope.click();
                        }
                        scope.isClickGap = true;
                    };
                return eventEndHandler;
            },
            click (): void {
                if(this.route !== "") this.$router.push(this.route);
            }
        },
        mounted () {
            if(this.item.icon) {
                this.icon = this.item.icon;
            }
            if(this.item.label) {
                this.label = this.item.label;
            }
            if(this.item.route) {
                this.route = this.item.route;
            }
            if(this.item.iconColor) {
                this.iconColor = this.item.iconColor;
            }
            if(this.item.backgroundColor) {
                this.backgroundColor = this.item.backgroundColor;
            }
        }
    })
</script>

<style lang="sass" scoped>
    .desktop-item
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
