<template>
    <el-row class="desktop-row">
        <el-col v-for="(item,index) in items"
                :span="24 / cols"
                :key="'i' + index">
            <desktop-item :size="size"
                          :icon="item.icon"
                          :label="item.label"
                          :route="item.route"
                          :background-color="item.backgroundColor"
                          :icon-color="item.iconColor">
            </desktop-item>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import Vue from "vue";
    import DesktopItem from "@/components/DesktopItem.vue";
    export default Vue.extend({
        name: "DesktopRow",
        components: {DesktopItem},
        props: {
            cols: {
                type: Number,
                default: 4
            },
            items: {
                type: Array,
                default: []
            },
            size: {
                type: String,
                default: "large"
            },
        }
    })
</script>

<style scoped>

</style>
