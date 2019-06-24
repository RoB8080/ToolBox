<template>
    <div class="todo-list">
        <div class="container">
            <el-tree
                    :data="todoList"
                    :props="props"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button
                                type="text"
                                size="mini"
                                @click="">
                            Append
                        </el-button>
                        <el-button
                                type="text"
                                size="mini"
                                @click="">
                            Delete
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <navi-popup></navi-popup>
    </div>
</template>

<script lang="ts">
    import NaviPopup from "@/components/NaviPopup.vue";
    export default {
        name: "TodoList",
        components: {NaviPopup},
        data: function() {
            return {
                todoList: [
                    {
                        index: 1,
                        desc: "待办1"
                    },
                    {
                        index: 2,
                        desc: "待办2",
                        children: [
                            {index: 3, desc: "待办2-1"},
                            {index: 4, desc: "待办2-2"}
                        ]
                    }
                ],
                props: {
                    children: 'children',
                    label: 'desc'
                }
            }
        }
    }
</script>

<style scoped>
    .todo-list {
        background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
        height: 100%;
    }
    .container {
        width: 600px;
    }
    .custom-tree-node {
        border-radius: 20px;
    }

</style>
