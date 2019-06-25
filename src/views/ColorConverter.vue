<template>
    <div class="color-converter">
        <div class="color-panel" >
            <div class="color-display"
                 :style="{backgroundColor: '#'+ hex}">
            </div>
            <el-row class="color-value">
                <div class="color-rgb" v-show="setting.mode === 0">
                    <label>R:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="255"
                                     :precision="0"
                                     :style="{width: '55px'}"
                                     v-model="red">
                    </el-input-number>
                    <label>G:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="255"
                                     :precision="0"
                                     :style="{width: '55px'}"
                                     v-model="green">
                    </el-input-number>
                    <label>B:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="255"
                                     :precision="0"
                                     :style="{width: '55px'}"
                                     v-model="blue">
                    </el-input-number>
                </div>
                <div class="color-hsl" v-show="setting.mode === 1">
                    <label>H:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="360"
                                     :precision="0"
                                     :style="{width: '55px'}"
                                     v-model="hue">
                    </el-input-number>
                    <label>S:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="100"
                                     :precision="2"
                                     :style="{width: '55px'}"
                                     v-model="sHSL">
                    </el-input-number>
                    <label>L:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="100"
                                     :precision="2"
                                     :style="{width: '55px'}"
                                     v-model="lHSL">
                    </el-input-number>
                </div>
                <div class="color-hsv" v-show="setting.mode === 2">
                    <label>H:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="360"
                                     :precision="0"
                                     :style="{width: '55px'}"
                                     v-model="hue">
                    </el-input-number>
                    <label>S:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="100"
                                     :precision="2"
                                     :style="{width: '55px'}"
                                     v-model="sHSV">
                    </el-input-number>
                    <label>V:</label>
                    <el-input-number size="mini"
                                     :controls="false"
                                     :min="0"
                                     :max="100"
                                     :precision="2"
                                     :style="{width: '55px'}"
                                     v-model="vHSV">
                    </el-input-number>
                </div>
                <el-select v-model="setting.mode" size="mini" :style="{width: '80px'}">
                    <el-option
                            v-for="item in setting.modeOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <label>#</label>
                <el-input size="mini" v-model="hexT" @blur="" :style="{width: '80px'}"></el-input>
            </el-row>

        </div>
        <navi-popup :animation-duration="500"></navi-popup>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import ColorConvert from "@/util/colorConvert.ts";
    import NaviPopup from "@/components/NaviPopup.vue"; // @ is an alias to /src

    export default Vue.extend({
        components: {
            NaviPopup
        },
        data: function () {
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
            }
        },
        computed: {
            red: {
                get: function () {
                    return this.$data.color.red;
                },
                set: function (val: number) {
                    this.color.red = val;
                }
            },
            green: {
                get: function () {
                    return this.$data.color.green;
                },
                set: function (val: number) {
                    this.color.green = val;
                }
            },
            blue: {
                get: function () {
                    return this.$data.color.blue;
                },
                set: function (val: number) {
                    this.color.blue = val;
                }
            },
            hex: {
                get: function () {
                    this.hexT = this.$data.color.hex;
                    return this.$data.color.hex;
                },
                set: function (val: string) {
                    this.color.hex = val;
                }
            },
            hue: {
                get: function() {
                    return this.$data.color.hue;
                },
                set: function(val: number) {
                    this.color.hue = val;
                }
            },
            sHSL: {
                get: function () {
                    return this.$data.color.sHSL;
                },
                set: function (val: number) {
                    this.color.sHSL = val;
                }
            },
            lHSL: {
                get: function () {
                    return this.$data.color.lHSL;
                },
                set: function (val: number) {
                    this.color.lHSL = val;
                }
            },
            sHSV: {
                get: function () {
                    return this.$data.color.sHSV;
                },
                set: function (val: number) {
                    this.color.sHSV = val;
                }
            },
            vHSV: {
                get: function () {
                    return this.$data.color.vHSV;
                },
                set: function (val: number) {
                    this.color.vHSV = val;
                }
            },
        },
        watch: {
            hexT(val) {
                if(/^[0-9a-f]{6}$/i.test(val)) {
                    this.color.hex = val;
                }
            }
        }
    })
</script>

<style scoped>
    .color-converter {
        height: 100%;
        background-color: #ffffff;
    }
    .color-panel {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        padding: 10px;

        border: 1px solid #DCDFE6;
    }
    .color-panel > * {
        margin: 10px auto;
    }
    .color-display {
        height: 35px;
        margin-left: 3px;
        margin-right: 3px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
    }
    .color-value > * {
        display: inline-block;
        margin: 0 3px;
    }
    .color-rgb > *, .color-hsl > *, .color-hsv > * {
        margin: 0 3px;
    }
    .color-value label {
        display: inline-block;
        font-size: 14px;
        width: 15px;
    }
</style>
