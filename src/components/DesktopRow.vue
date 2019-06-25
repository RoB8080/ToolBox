<template>
    <el-row class="desktop-row">
        <el-col v-for="(item,index) in items"
                :span="24 / cols"
                :key="'i' + index">
            <desktop-item :icon="item.icon"
                          :label="item.label"
                          :route="item.route"
                          :background-color="item.backgroundColor"
                          :icon-color="item.iconColor">
            </desktop-item>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import DesktopItem from "@/components/DesktopItem.vue";
    export default {
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
            }
        }
    }
</script>

<style scoped>

</style>
