<template>
    <keep-alive>
        <div class="desktop" :style="'--bgColorA: ' + bgColorA + '; --bgColorB: ' + bgColorB + ';'" :class="bgGradient?'gradientBg':'plainBg'">
            <div v-for="p in pages" class="page" :style="getLayout(pages)" >
                <div v-for = "(item,index) in items" class="cell" :style="{gridArea: 'i' + map[index]}" :key="index" :itemid="index">
                    <desktop-item :size="screenSize"
                                  :item="item"
                                  :class="(adjusted === index) && adjusting ? 'hide': ''"
                                  @adjust="startAdjust(index)">
                    </desktop-item>
                </div>
            </div>
            <desktop-item v-if="adjusting"
                          :size="screenSize"
                          :item="items[adjusted]"
                          class="virtual-item"
                          :style="{left: virtualItemX + 'px', top: virtualItemY + 'px'}">
            </desktop-item>
        </div>
    </keep-alive>
</template>

<script lang="ts">
    import Vue from 'vue';
    import HelloWorld from '../../components/HelloWorld.vue';
    import NaviPopup from "../../components/NaviPopup.vue";
    import DesktopItem from "./DesktopItem.vue";
    import ExtendedArray from "@/util/arrayExtend.ts"
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
                currentPage: 0,

                adjusting: false,
                adjusted: -1,
                virtualItemX: 0,
                virtualItemY: 0,
                targetIndex: -1,
                toLeft: false,

                tempAdjustedItem: {},

                cellHeight: 0,
                cellWidth: 0,
                hasMounted: false,
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
                set(val: Array<any>): void {
                    this.$store.dispatch("desktop/items",val);
                }
            },
            _map: {
                get(): Array<number> {
                    return this.$store.state.desktop.map;
                },
                set(val: Array<number>): void {
                    this.$store.dispatch("desktop/map",val);
                }
            },
            map: {
                get(): Array<number> {
                    return [...<Array<number>>this._map];
                },
                set(val: Array<number>): void {
                    this.map.forEach((e,i) => {
                        this.map[i] = val[i];
                    })
                }
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
                //this.cellWidth = this.$el.children[0].offsetWidth / 4;
                //this.cellHeight = this.$el.children[0].offsetHeight / 4;
            },
            getLayout (pages: number): Object {
                let areas: Array<Array<string>> = [[],[],[],[]],strings: Array<string> = [], t = 0;
                for(let p = 0; p < pages; p++) {
                    for(let r = 0; r < 4; r++) {
                        areas[r].push("i" + t++);
                        areas[r].push("i" + t++);
                        areas[r].push("i" + t++);
                        areas[r].push("i" + t++);
                    }
                }
                for(let i = 0; i < 4; i++) {
                    strings[i] = areas[i].join(" ");
                }
                return {
                    gridTemplateColumns: "repeat("+ (pages * 4) +",1fr)",
                    gridTemplateAreas: "'" + strings.join("' '") + "'",
                    width: pages + "00%"
                }
            },
            getLocation (id: number): Object {
                if(this.hasMounted) {
                    console.log(this.$el);
                    let cells = this.$el.children[0].children;
                    for(let i = cells.length; i > -1; i--) {
                        if(cells[i].getAttribute("itemid") == id) {
                            let cell = cells[i];
                            return {
                                left: cell.offsetLeft,
                                top: cell.offsetTop,
                                width: this.cellWidth,
                                height: this.cellHeight
                            }
                        }
                    }
                } else {
                    return {};
                }

            },
            startAdjust (index: number): void {
                this.adjusted = index;
                this.adjusting = true;
                // @ts-ignore
                this.$el.addEventListener("mousemove",this.onMove);
                // @ts-ignore
                this.$el.addEventListener("touchmove",this.onMove);
                // @ts-ignore
                this.$el.addEventListener("mouseleave",this.endAdjust);
                // @ts-ignore
                this.$el.addEventListener("mouseup",this.endAdjust);
                // @ts-ignore
                this.$el.addEventListener("touchend",this.endAdjust);
            },
            onMove (event: MouseEvent | TouchEvent): void {
                let x, y, index, html = <HTMLElement>event.currentTarget;
                if(event instanceof MouseEvent) {
                    this.virtualItemX = x = event.clientX;
                    this.virtualItemY = y = event.clientY;
                } else {
                    this.virtualItemX = x = event.touches[0].clientX;
                    this.virtualItemY = y = event.touches[0].clientY;
                }
                let cellWidth = html.clientWidth / 4,
                    cellHeight = html.clientHeight / 4,
                    yIndex = Math.floor( y / cellHeight ),
                    xIndex = Math.floor( x / cellWidth );
                index = yIndex * 4 + xIndex + this.currentPage * 16;
                if(this.map[this.adjusted] !== index){
                    this.squeeze(index, x - xIndex * cellWidth > cellWidth / 2);
                }
            },
            squeeze(index: number, toLeft: boolean): void {
                this.map = [...<Array<number>>this._map];
                let map = this.map, flag = false;
                //向左搜索空位并看情况挪位
                if(toLeft) {
                    for(let i = index; i > -1; i--) {
                        if(map.indexOf(i) === -1 || map.indexOf(i) === this.adjusted) {
                            //找到空位
                            for(let j = i + 1; j <= index; j++) {
                                map[map.indexOf(j)]--;
                            }
                            flag = true;
                            break;
                        }
                    }
                }
                //向右搜索空位并看情况挪位
                if(!toLeft || !flag) {
                    for(let i = index; ; i++) {
                        if(map.indexOf(i) === -1 || map.indexOf(i) === this.adjusted) {
                            //找到空位
                            for(let j = i; j >= index; j--) {
                                map[map.indexOf(j)]++;
                            }
                            break;
                        }
                    }
                }
                map[this.adjusted] = index;
                console.log(this.map);

            },
            endAdjust(): void {
                this.adjusting = false;
                this.adjusted = -1;
                this._map = this.map;
                // @ts-ignore
                this.$el.removeEventListener("mousemove",this.onMove);
                // @ts-ignore
                this.$el.removeEventListener("touchmove",this.onMove);
                // @ts-ignore
                this.$el.removeEventListener("mouseleave",this.endAdjust);
                // @ts-ignore
                this.$el.removeEventListener("mouseup",this.endAdjust);
                // @ts-ignore
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
            },

        },
        created (): void {
            window.addEventListener("resize", this.resizeHandle);
            //console.log((new ExtendedArray(undefined,undefined,3,4,5,6).squeezeIn(0,2,true)))
        },
        mounted (): void {
            this.resizeHandle();
            // @ts-ignore
            this.$el.addEventListener("touchstart",this.modifyVirtualPos);
            // @ts-ignore
            this.$el.addEventListener("mousedown",this.modifyVirtualPos);
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
        grid-template-rows: repeat(4, 1fr);

        height: 100%;
    }
    .cell {
        position: relative;
    }
    .locate-box {
        position: absolute;
        height: 25%;
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
        pointer-events: none;
        touch-action: none;
    }

    .desktop.plainBg {
        background-color: var(--bgColorA);
    }
    .desktop.gradientBg {
        background-image: linear-gradient(to top, var(--bgColorA) 0%, var(--bgColorB) 100%);
    }
</style>
