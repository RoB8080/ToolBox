<template>
    <div class="color-converter">
        <div class="color-panel" >
            <div class="color-display" :style="{backgroundColor: '#' + hex}"></div>
            <div class="color-hex"><el-input v-model="hexT" @blur=""></el-input></div>
            <div class="color-control">
                <el-slider v-model="red" class="color-red" :min="0" :max="255" vertical height="150px"></el-slider>
                <el-slider v-model="green" class="color-red" :min="0" :max="255" vertical height="150px"></el-slider>
                <el-slider v-model="blue" class="color-red" :min="0" :max="255" vertical height="150px"></el-slider>
            </div>

        </div>
        <navi-popup :animation-duration="500"></navi-popup>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import NaviPopup from "@/components/NaviPopup.vue"; // @ is an alias to /src

    export default Vue.extend({
        components: {
            NaviPopup
        },
        data: function () {
            return {
                red: 255,
                green: 255,
                blue: 255,
                hexT: "ffffff"
            }
        },
        computed: {
            hex: {
                get: function () {
                    this.hexT = this.red.toString(16) + this.green.toString(16) + this.blue.toString(16);
                    return this.hexT;
                },
                set: function (val: string) {
                    this.red = parseInt(val.substr(0,2),16);
                    this.green = parseInt(val.substr(2,2),16);
                    this.blue = parseInt(val.substr(4,2),16);
                }
            }
        },
        watch: {
            hexT(val) {
                if(/^[0-9a-f]{6}$/i.test(val)) {
                    this.hex = val;
                }
            }
        }
    })
</script>

<style scoped>
    .color-panel {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .color-display {
        display: inline-block;

        margin: auto 20px;
        height: 80px;
        width: 80px;
    }
    .color-control {
        display: inline-block;
    }
    .el-slider {
        display: inline-block;
    }
    .el-slider .el-slider__runway {
        background-color: #000000;
    }
    .el-slider .el-slider__bar {
        background-color: transparent !important;
    }
</style>
