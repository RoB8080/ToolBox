<template>
    <keep-alive>
        <div class="desktop" :style="'--bgColorA: ' + bgColorA + '; --bgColorB: ' + bgColorB + ';'" :class="bgGradient?'gradientBg':'plainBg'">
            <div v-for="p in pages" class="page">
                <div v-for = "(item,index) in items.slice((p - 1) * 16, 16)" class="cell">
                    <desktop-item v-if="item"
                                  :size="screenSize"
                                  :item="item"
                                  :class="(adjusted === (p - 1) * 16 + index) && adjusting ? 'hide': ''"
                                  @adjust="startAdjust((p - 1) * 16 + index)"
                    ></desktop-item>
                </div>
            </div>
            <desktop-item v-if="adjusting"
                          :size="screenSize"
                          :item="items[adjusted]"
                          class="virtual-item"
                          :style="{left: virtualItemX + 'px', top: virtualItemY + 'px'}"></desktop-item>
        </div>
    </keep-alive>
</template>

<script lang="ts">
    import Vue from 'vue';
    import HelloWorld from '../../components/HelloWorld.vue';
    import NaviPopup from "../../components/NaviPopup.vue";
    import DesktopItem from "./DesktopItem.vue";
    // @ is an alias to /src

    export default Vue.extend({
        name: "Desktop",
        components: {
            NaviPopup,
            HelloWorld,
            DesktopItem,
        },
        data () {
            return {
                screenSize: "",
                currentPage: 1,

                adjusting: false,
                adjusted: -1,
                virtualItemX: 0,
                virtualItemY: 0
            }
        },
        computed: {
            pages: function(): number {
                return this.$store.state.desktop.config.pages;
            },
            items: {
                get(): Array<any> {
                    return this.$store.state.desktop.items;
                },
            },
            map: function(): Array<Array<any>> {
                let res:Array<Array<any>> = [], l = this.items.length, rem, row;
                for(let i = 0; i < l; i++) {
                    rem = i % 4;
                    row = (i - rem) / 4;
                    if(rem === 0) {
                        res[row] = [];
                    }
                    res[row][rem] = this.items[i];
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
            resizeHandle (): void {
                this.screenSize = document.body.clientWidth < 768 ? "small" : "large";
            },
            startAdjust (index: number): void {
                this.adjusted = index;
                this.adjusting = true;
                this.$el.addEventListener("mousemove",this.onMove);
                this.$el.addEventListener("touchmove",this.onMove);
                this.$el.addEventListener("mouseleave",this.endAdjust);
                this.$el.addEventListener("mouseup",this.endAdjust);
                this.$el.addEventListener("touchend",this.endAdjust);
            },
            onMove (event: MouseEvent | TouchEvent): void {
                if(event instanceof MouseEvent) {
                    this.virtualItemX = event.clientX;
                    this.virtualItemY = event.clientY;
                } else {
                    this.virtualItemX = event.changedTouches[0].clientX;
                    this.virtualItemY = event.changedTouches[0].clientY;
                }
            },
            endAdjust(): void {
                this.adjusting = false;
                this.adjusted = -1;
                this.$el.removeEventListener("mousemove",this.onMove);
                this.$el.removeEventListener("touchmove",this.onMove);
                this.$el.removeEventListener("mouseleave",this.endAdjust);
                this.$el.removeEventListener("mouseup",this.endAdjust);
                this.$el.removeEventListener("touchend",this.endAdjust);
            },
            modifyVirtualPos(event: MouseEvent | TouchEvent) : void {
                if(event instanceof MouseEvent) {
                    this.virtualItemX = event.clientX;
                    this.virtualItemY = event.clientY;
                } else {
                    this.virtualItemX = event.touches[0].clientX;
                    this.virtualItemY = event.touches[0].clientY;
                }
            }
        },
        created (): void {
            window.addEventListener("resize", this.resizeHandle);
        },
        mounted (): void {
            this.resizeHandle();
            this.$el.addEventListener("touchstart",this.modifyVirtualPos);
            this.$el.addEventListener("mousedown",this.modifyVirtualPos)
        },
        beforeDestroy(): void {
            window.removeEventListener("resize", this.resizeHandle);
        }
    })
</script>

<style scoped>
    .desktop {
        position: relative;
        height: 100%;

    }
    .page {
        display: inline-grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);

        height: 100%;
        width: 100%;
    }
    .cell {
        position: relative;
    }
    .desktop-item {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .desktop-item.hide {
        visibility: hidden;
    }

    .desktop-item.virtual-item {
        position: absolute;
        transform: translate(-50%,-50%) scale(1.15);
    }

    .desktop.plainBg {
        background-color: var(--bgColorA);
    }
    .desktop.gradientBg {
        background-image: linear-gradient(to top, var(--bgColorA) 0%, var(--bgColorB) 100%);
    }
</style>
