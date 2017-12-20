<template>
    <div class="page-about">
        <ui-header></ui-header>
        <main class="page-body">
            <div class="container">
                千牛图标库
                178 icons
                粟三

                <div>
                    <ui class="main-icon-list">
                        <li class="item" v-for="icon in icons">
                            <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="431"><path d="M800 845.088c0 1.76-0.736 2.784-0.096 2.88l-574.656 0.416C224.992 848.192 224 847.04 224 845.088v-477.12h576v477.12zM224 210.88c0-1.728 0.64-2.752 0.096-2.912H352V224a32 32 0 1 0 64 0v-16h192V224a32 32 0 1 0 64 0v-16h127.008a4.736 4.736 0 0 1 0.992 2.88V304H224V210.88zM799.84 144H672V128a32 32 0 0 0-64 0v16h-192V128a32 32 0 0 0-64 0v16H223.712C188.576 144 160 174.016 160 210.88V845.12c0 36.896 28.608 66.88 63.744 66.88h576.512c35.136 0 63.744-29.984 63.744-66.88V210.88c0-36.896-28.768-66.912-64.16-66.912zM384 560h256a32 32 0 0 0 0-64h-256a32 32 0 0 0 0 64M384 720h256a32 32 0 0 0 0-64h-256a32 32 0 0 0 0 64" p-id="432"></path></svg>
                            <div class="name">activity</div>
                            <div class="mask">
                                <div class="cover-item _icon cover-item-line icon-cart" title="添加入库"></div>
                                <div class="cover-item _icon cover-item-line icon-star" title="收藏"></div>
                                <div class="cover-item _icon cover-item-line icon-download" title="下载图标"></div>
                            </div>
                        </li>
                    </ui>
                </div>
            </div>
        </main>
        <ui-footer></ui-footer>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                icons: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                for (let i = 0; i < 40; i++) {
                    this.icons.push({
                    })
                }
            }
        }
    }
</script>

<style scoped>
</style>
