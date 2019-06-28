<template>
    <div class="setting">
        <el-tabs tab-position="left" style="height: 100%;" size="medium">
            <el-tab-pane label="外观设置">
                <setting-row label="背景颜色渐变">
                    <el-switch v-model="backgroundGradient"></el-switch>
                </setting-row>
                <setting-row label="背景颜色A">
                    <el-color-picker v-model="backgroundColorA"></el-color-picker>
                </setting-row>
                <setting-row label="背景颜色B">
                    <el-color-picker v-model="backgroundColorB" :disabled="!backgroundGradient"></el-color-picker>
                </setting-row>
            </el-tab-pane>
            <el-tab-pane label="退回主页">
                <el-button type="primary" @click="$router.push('/')">返回主页</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import SettingRow from "@/components/SettingRow.vue";

    export default Vue.extend({
        components: {
            SettingRow
        },
        computed: {
            backgroundGradient: {
                get(): boolean {
                    return this.$store.state.setting.background.gradient;
                },
                set(val: boolean) {
                    this.$store.dispatch("setting/backgroundGradient", val);
                }
            },
            backgroundColorA: {
                get(): string {
                    return this.$store.state.setting.background.colorA;
                },
                set(val: string) {
                    this.$store.dispatch("setting/backgroundColorA", val);
                }
            },
            backgroundColorB: {
                get(): string {
                    return this.$store.state.setting.background.colorB;
                },
                set(val: string) {
                    this.$store.dispatch("setting/backgroundColorB", val);
                }
            }
        }
    })
</script>

<style scoped>
    .setting {
        height: 100%;
        background-color: #ffffff;
    }
    .setting-row {
        border-bottom: 1px solid #EBEEF5;
    }
    .setting-row:last-child {
        border: none;
    }
</style>
