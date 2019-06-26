<template>
    <div class="float-button"
         :style="outerStyle"
         @mousedown="mouseDown($event)">
        <div class="float-button-inner" :style="innerStyle">
            <i :class="icon"></i>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        name: "FloatButton",
        props: {
            radius: {
                type: Number,
                default: 22
            },
            iconSize: {
                type: Number,
                default: 14
            },
            icon: {
                type: String,
                default: "el-icon-menu"
            },
        },
        data: function() {
            return {
                isMouseDown: false,
                isClickGap: false,
                position: {
                    x: 0,
                    y: 0
                }
            }
        },
        computed: {
            outerStyle():string {
                return this.outerPos + this.outerSize;
            },
            outerPos():string {
                return "left:"+ this.$data.position.x +"px;top:"+ this.$data.position.y +"px;";
            },
            outerSize():string {
                let d = this.radius * 2 - 4;
                return "width:"+ d +"px;height:"+ d +"px;";
            },
            innerStyle(): Object {
                let s = this.iconSize;
                let p = this.radius - s / 2 - 4;
                return {width: s + 'px', height: s + 'px', padding: p + 'px', fontSize: s + 'px'}
            }
        },
        methods: {
            mouseDown(event: MouseEvent) {
                event.preventDefault();
                let scope = this;

                //@ts-ignore
                this.$parent.$el.addEventListener('mousemove',this.mouseMove);
                this.$parent.$el.addEventListener('mouseup',this.mouseUp);
                this.$parent.$el.addEventListener('mouseleave',this.mouseLeave);

                this.$data.isMouseDown = true;
                this.$data.isClickGap = true;
                window.setTimeout(function() {
                    scope.$data.isClickGap = false
                },250);
            },
            mouseMove(event: MouseEvent) {
                let offset = this.$props.radius,
                    x = event.clientX - offset,
                    y = event.clientY - offset;
                x = (x < this.$parent.$el.clientWidth - 2 * offset) ? (x > 0) ? x : 0 : (this.$parent.$el.clientWidth - 2 * offset);
                y = (y < this.$parent.$el.clientHeight - 2 * offset) ? (y > 0) ? y : 0 : (this.$parent.$el.clientHeight - 2 * offset);
                this.$data.position.x = x;
                this.$data.position.y = y;
            },
            mouseUp() {
                //@ts-ignore
                this.$parent.$el.removeEventListener('mousemove',this.mouseMove);
                this.$parent.$el.removeEventListener('mouseup',this.mouseUp);
                this.$parent.$el.removeEventListener('mouseleave',this.mouseLeave);

                if(this.$data.isClickGap) {
                    this.$emit('click');
                }
            },
            mouseLeave() {
                //@ts-ignore
                this.$parent.$el.removeEventListener('mousemove',this.mouseMove);
                this.$parent.$el.removeEventListener('mouseup',this.mouseUp);
                this.$parent.$el.removeEventListener('mouseleave',this.mouseLeave);
            }
        },
    })
</script>

<style scoped lang="sass">
    .float-button
        position: fixed
        border: 2px solid #fefeff
        border-radius: 50%
        filter: drop-shadow(0 0 3px rgba(100,100,100,0.4))

    .float-button-inner
        background-color: #fefeff
        border-radius: 50%
        margin: 2px
        color: #aaaaac
        line-height: 1

</style>
