<template>
    <ui-page :title="title || page.title" :page="page" :backable="backable" ref="page"
             :containerMaxWidth="containerMaxWidth" :padding="false">
        <div slot="drawer">
            <ui-appbar title=""></ui-appbar>
            <ui-list @itemClick="toggle()">
                <ui-list-item title="首页" to="/">
                    <ui-icon value="home" slot="left" />
                </ui-list-item>
                <ui-list-item title="图标规范工具" to="/spec">
                    <ui-icon value="home" slot="left" />
                </ui-list-item>
                <!--<ui-list-item title="图标库" to="/all">-->
                    <!--<ui-icon value="home" slot="left" />-->
                <!--</ui-list-item>-->
                <!--<li class="item">-->
                    <!--<router-link class="link" to="/manage/index">图标管理</router-link>-->
                <!--</li>-->
                <!--<li class="item">-->
                    <!--<router-link class="link" to="/help/index">帮助</router-link>-->
                <!--</li>-->
                <!--<li class="item">-->
                    <!--<router-link class="link" to="/help/index">更多</router-link>-->
                    <!--<ul>-->
                        <!--<li>-->
                            <!--<router-link to="/help/index">更多</router-link>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</li>-->
                <!--<ui-list-item title="我的收藏" to="/like">-->
                    <!--<ui-icon value="star" slot="left" />-->
                <!--</ui-list-item>-->
                <ui-divider />
            </ui-list>
            <ui-list class="cart-box" @itemClick="toggle()">
                <!--<ui-list-item title="友情链接" to="/links">-->
                    <!--<ui-icon value="link" slot="left" />-->
                <!--</ui-list-item>-->
                <ui-list-item title="SVG 编辑器" href="http://svg.yunser.com/" target="_blank">
                    <ui-icon value="info" slot="left" />
                </ui-list-item>
                <!--<ui-list-item title="帮助" to="/help">-->
                    <!--<ui-icon value="info" slot="left" />-->
                <!--</ui-list-item>-->
                <ui-list-item title="关于" to="/about">
                    <ui-icon value="info" slot="left" />
                </ui-list-item>
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: '11'
            },
            containerMaxWidth: {
                type: Number,
                default: -1
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
        },
        methods: {
            toggle() {
                this.$refs.page.hideDrawerIfMobile()
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
