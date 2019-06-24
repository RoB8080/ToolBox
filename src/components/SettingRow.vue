<template>
    <div class="setting-row" :class="size">
        <div class="setting-label" :class="size">{{label}}</div>
        <div class="setting-input"><slot :size="size"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "SettingRow",
        props: {
            label: {
                type: String,
                default: ""
            },
            size: {
                type: String,
                default: "medium"
            }
        },
    }
</script>

<style scoped lang="sass">
    .setting-row
        &.medium
            height: 64px
        &.small
            height: 56px
        &.mini
            height: 52px
        &::after
            content: ""
            display: block
            clear: both

    .setting-label
        float: left
        margin-left: 10px
        line-height: 100%

        font-weight: bold
        &.medium
            font-size: 16px
            line-height: 64px
        &.small
            font-size: 14px
            line-height: 56px
        &.mini
            font-size: 13px
            line-height: 52px

    .setting-input
        font-size: 0
        float: right
        margin-right: 10px
        position: relative
        top: 50%
        transform: translateY(-50%)

</style>
