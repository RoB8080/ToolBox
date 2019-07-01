<template>
    <div class="follow">
        <ul class="notice-list">
            <li class="notice-row" :class="notice.isRead === '0' ? 'new' : ''" v-for="(notice,index) in notices" :key="index">
                <div class="left">
                    <span class="secondary" v-if="notice.status === '1'">您关注了</span>
                    <span class="primary">{{notice.username}}</span>
                    <span class="secondary" v-if="notice.status === '2'">关注了您</span>
                </div>
                <div class="right">
                    <span class="time">{{notice.addTime}}</span>
                    <a href="javascript:void(0)" class="delete"></a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Test",
        data () {
            return {
                notices: [
                    {username:"Aaaa",addTime:"2019/07/01",status: "2",isRead: "0"},
                    {username:"Aaaa",addTime:"2019/07/01",status: "1",isRead: "1"},
                    {username:"Bbbb",addTime:"2019/07/01",status: "1",isRead: "1"},
                    {username:"Bbbb",addTime:"2019/07/01",status: "2",isRead: "1"},
                ]
            }
        }
    }
</script>

<style scoped>
    ul,li{
        list-style: none;
    }

    .follow {
        padding-top: 10px;
        height: 100%;
        background-color: #eeeeee;
    }

    .notice-list {
        margin: 0 auto;
        width: auto;
        background-color: #ffffff;
        padding-left: 20px;
    }

    .notice-row {
        border-bottom: 1px solid #ECECEC;
        line-height: 40px;
        text-align: left;
        vertical-align: center;
        padding-left: 3px;
    }

    .notice-row:before {
        content: "";
        display: inline-block;
        height: 7px;
        width: 7px;
        padding-bottom: 3px;
        background-image: url("../assets/Test/circle.png");
        background-repeat: no-repeat;
    }

    .notice-row.new:before {
        background-image: url("../assets/Test/circle_new.png");
    }

    .notice-row:last-child {
        border: none;
    }

    .left {
        display: inline-block;
    }

    .left > *{
        margin-left: 8px;
    }

    .primay {
        color: #212121;
    }

    .secondary {
        color: #9C9C9C;
        font-size: 14px;
    }

    .right {
        float: right;
    }

    .time {
        color: #9C9C9C;
        margin-right: 10px;
        font-size: 15px;
    }

    .delete {
        display: inline-block;
        margin-right: 10px;
        width: 22px;
        height: 21px;
        transform: translateY(5px) scale(.9);
        background: url("../assets/Test/delete.png");
        background-repeat: no-repeat;
    }

</style>
