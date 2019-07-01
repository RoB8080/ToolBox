<template>
</template>

<script>

    export default {
        components: {
        },
        name: "Map",
        data () {
            return {
                center: {lng: 0, lat: 0},
                zoom: 3,
                mapStyle: {
                    styleJson: []
                },

            }
        },
        methods: {
            readyHandler ({BMap, map}) {
                console.log(BMap, map);
                this.center = "上海";
                this.zoom = 15;
            }
        },
        mounted() {
            import("../assets/MapStyles/Neon.json").then((json) => {
                this.mapStyle.styleJson = json;
            })
        }
    }
</script>

<style scoped>
    .map {
        width: 100%;
        height: 100%;
    }
</style>
