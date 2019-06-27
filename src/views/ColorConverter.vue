<template>
    <div class="color-converter" :class="screenSize">
        <div class="color-panel">
            <div class="color-display"
                 :class="screenSize"
                 :style="{backgroundColor: '#'+ hex}">
            </div>
            <div class="color-form"
                 :class="screenSize">
                <div class="input-group" v-show="setting.mode === 0">
                    <div class="input-cell">
                        <label>R:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="255"
                                         :precision="0"
                                         :style="{width: '57px'}"
                                         v-model="red">
                        </el-input-number>
                    </div>
                    <div class="input-cell">
                        <label>G:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="255"
                                         :precision="0"
                                         :style="{width: '57px'}"
                                         v-model="green">
                        </el-input-number>
                    </div>
                    <div class="input-cell">
                        <label>B:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="255"
                                         :precision="0"
                                         :style="{width: '57px'}"
                                         v-model="blue">
                        </el-input-number>
                    </div>
                </div>
                <div class="input-group" v-show="setting.mode === 1">
                    <div class="input-cell">
                        <label>H:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="360"
                                         :precision="0"
                                         :style="{width: '57px'}"
                                         v-model="hue">
                        </el-input-number>
                    </div>
                    <div class="input-cell">
                        <label>S:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="100"
                                         :precision="2"
                                         :style="{width: '57px'}"
                                         v-model="sHSL">
                        </el-input-number>
                    </div>
                    <div class="input-cell">
                        <label>L:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="100"
                                         :precision="2"
                                         :style="{width: '57px'}"
                                         v-model="lHSL">
                        </el-input-number>
                    </div>
                </div>
                <div class="input-group" v-show="setting.mode === 2">
                    <div class="input-cell">
                        <label>H:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="360"
                                         :precision="0"
                                         :style="{width: '57px'}"
                                         v-model="hue">
                        </el-input-number>
                    </div>
                    <div class="input-cell">
                        <label>S:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="100"
                                         :precision="2"
                                         :style="{width: '57px'}"
                                         v-model="sHSV">
                        </el-input-number>
                    </div>
                    <div class="input-cell">
                        <label>V:</label>
                        <el-input-number size="mini"
                                         :controls="false"
                                         :min="0"
                                         :max="100"
                                         :precision="2"
                                         :style="{width: '57px'}"
                                         v-model="vHSV">
                        </el-input-number>
                    </div>
                </div>
                <div class="input-cell">
                    <el-select v-model="setting.mode" size="mini" :style="{width: '80px'}">
                        <el-option
                                v-for="item in setting.modeOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="input-cell">
                    <label>#</label>
                    <el-input size="mini" v-model="hexT" @blur="" :style="{width: '80px'}"></el-input>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import ColorConvert from "@/util/colorConvert.ts";
    import NaviPopup from "@/components/NaviPopup.vue";// @ is an alias to /src

    export default Vue.extend({
        components: {
            NaviPopup
        },
        props: {
            responsive: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                color: new ColorConvert(),
                hexT: "000000",
                setting: {
                    mode: 0,
                    modeOption: [
                        {label: "RGB", value: 0},
                        {label: "HSL", value: 1},
                        {label: "HSV", value: 2},
                    ]
                },
                screenSize: document.body.clientWidth < 768 ? "small" : "large";
            }
        },
        computed: {
            red: {
                get: function (): number {
                    return this.color.red;
                },
                set: function (val: number) {
                    this.color.red = val;
                }
            },
            green: {
                get: function (): number {
                    return this.color.green;
                },
                set: function (val: number) {
                    this.color.green = val;
                }
            },
            blue: {
                get: function (): number {
                    return this.color.blue;
                },
                set: function (val: number) {
                    this.color.blue = val;
                }
            },
            hex: {
                get: function (): string {
                    this.hexT = this.color.hex;
                    return this.color.hex;
                },
                set: function (val: string) {
                    this.color.hex = val;
                }
            },
            hue: {
                get: function(): number {
                    return this.color.hue;
                },
                set: function(val: number) {
                    this.color.hue = val;
                }
            },
            sHSL: {
                get: function (): number {
                    return this.color.sHSL;
                },
                set: function (val: number) {
                    this.color.sHSL = val;
                }
            },
            lHSL: {
                get: function (): number {
                    return this.color.lHSL;
                },
                set: function (val: number) {
                    this.color.lHSL = val;
                }
            },
            sHSV: {
                get: function ():number {
                    return this.color.sHSV;
                },
                set: function (val: number) {
                    this.color.sHSV = val;
                }
            },
            vHSV: {
                get: function (): number {
                    return this.color.vHSV;
                },
                set: function (val: number) {
                    this.color.vHSV = val;
                }
            },
        },
        watch: {
            hexT(val) {
                if(/^[0-9a-f]{6}$/i.test(val)) {
                    this.$data.color.hex = val;
                }
            }
        },
        mounted () {
            let scope = this;
            window.onresize = function () {
                scope.screenSize = document.body.clientWidth < 768 ? "small" : "large";
            }
        }
    })
</script>

<style lang="sass" scoped>
    .color-converter 
        height: 100%
        background-color: #ffffff
        & > .color-panel
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
            padding: 10px 7px
            border: 1px solid #DCDFE6
            & > .color-display
                border: 1px solid #DCDFE6
                border-radius: 4px
                height: 35px
                margin: 0 3px 13px 3px

        &.large > .color-panel
            width: 433px
        &.small > .color-panel
            width: 243px

    
    .color-form
        & > .input-group > *
            display: inline-block
        & > *
            display: inline-block

    .input-cell
        margin: 0 3px
    .input-cell > label
        display: inline-block
        font-size: 14px
        width: 15px
        margin-right: 3px
    .input-cell .el-input-number
        width: 57px

    .color-form.small .input-cell
        margin-bottom: 10px
</style>
