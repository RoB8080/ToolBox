<template>
    <div class="desktop-item" @mousedown="mouseDown($event)" @touchstart="touchStart($event)" :class="size +' '+ (isDragging ? 'dragging': '')">
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
        data () {
            return {
                isDragging: false,
            }
        },
        methods: {
            mouseDown (event: MouseEvent): void {
                event.preventDefault();
                let scope = this;

                let timeoutID: number = window.setTimeout(function() {
                    scope.isDragging = true;
                },250);
                let handler = this.getEventEndHandler(timeoutID, false);
                this.$parent.$el.addEventListener('mouseup',handler);
                this.$parent.$el.addEventListener('mouseleave',handler);
            },
            touchStart (event: MouseEvent): void {
                event.preventDefault();
                let scope = this;

                let timeoutID: number = window.setTimeout(function() {
                    scope.isDragging = true;
                },250);
                let handler = this.getEventEndHandler(timeoutID, true);
                this.$parent.$el.addEventListener('touchend',handler);
            },
            getEventEndHandler (timeoutID: number, touch: boolean): EventListener {
                let eventEndHandler: EventListener, scope = this;
                if (touch)
                    eventEndHandler = function(event: TouchEvent|Event) {
                        window.clearTimeout(timeoutID);
                        scope.$parent.$el.removeEventListener('touchend',eventEndHandler);
                        if(scope.$data.isDragging) {
                            scope.isDragging = false;
                        } else {
                            scope.click();
                        }
                    };
                else
                    eventEndHandler = function(event: MouseEvent|Event) {
                        window.clearTimeout(timeoutID);
                        scope.$parent.$el.removeEventListener('mouseup',eventEndHandler);
                        scope.$parent.$el.removeEventListener('mouseleave',eventEndHandler);
                        if(scope.$data.isDragging) {
                            scope.isDragging = false;
                        } else {
                            scope.click();
                        }
                    };
                return eventEndHandler;
            },
            click (): void {
                if(this.route !== "") this.$router.push(this.route);
            }
        }
    })
</script>

<style lang="sass" scoped>
    .desktop-item 
        display: inline-block
        cursor: default
        filter: drop-shadow(2px 2px 5px rgba(100,100,100,0.25))
        &.dragging
            transform: scale(1.1)
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
