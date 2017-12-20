<template>
    <header class="page-header">
        <div class="container">
            <ul class="nav-list">
                <li class="item active">
                    <router-link class="link" to="/home/index">首页</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/collections/index">图标库</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/collections/index">图标库</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/manage/index">图标管理</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/help/index">帮助</router-link>
                </li>
                <li class="item">
                    <router-link class="link" to="/help/index">更多</router-link>
                    <ul>
                        <li>
                            <router-link to="/help/index">更多</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
