<template>
    <div class="page-about">
        <ui-header></ui-header>
        <div class="banner">
            <div class="container">
                <div class="avatar-box">

                </div>
                <div>
                    <h1 class="title">Rookie 3.0官方图标库</h1>
                    <div class="info">178 icons</div>
                    <div class="info">粟三</div>
                </div>
            </div>
        </div>
        <main class="page-body">
            <div class="container">
                <ui class="main-icon-list">
                    <li class="item" v-for="icon in icons" :class="{selected: isSelected(icon)}">
                        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="431"><path d="M800 845.088c0 1.76-0.736 2.784-0.096 2.88l-574.656 0.416C224.992 848.192 224 847.04 224 845.088v-477.12h576v477.12zM224 210.88c0-1.728 0.64-2.752 0.096-2.912H352V224a32 32 0 1 0 64 0v-16h192V224a32 32 0 1 0 64 0v-16h127.008a4.736 4.736 0 0 1 0.992 2.88V304H224V210.88zM799.84 144H672V128a32 32 0 0 0-64 0v16h-192V128a32 32 0 0 0-64 0v16H223.712C188.576 144 160 174.016 160 210.88V845.12c0 36.896 28.608 66.88 63.744 66.88h576.512c35.136 0 63.744-29.984 63.744-66.88V210.88c0-36.896-28.768-66.912-64.16-66.912zM384 560h256a32 32 0 0 0 0-64h-256a32 32 0 0 0 0 64M384 720h256a32 32 0 0 0 0-64h-256a32 32 0 0 0 0 64" p-id="432"></path></svg>
                        <div class="name">activity</div>
                        <div class="mask">
                            <div class="cover-item _icon cover-item-line icon-cart" title="添加入库" @click="addToCart(icon)"></div>
                            <div class="cover-item _icon cover-item-line icon-star" title="收藏"></div>
                            <div class="cover-item _icon cover-item-line icon-download" title="下载图标"></div>
                        </div>
                    </li>
                </ui>
            </div>
        </main>
        <ui-footer></ui-footer>
        <div class="cart-box" v-if="cartVisible">
            <div class="dialog">
                <header class="header">
                    <a class="back" @click="closeCart"></a>
                </header>
                <ul class="cart-list">
                    <div class="item" v-for="item in carts">
                        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5578"><path d="M534.8864 0L373.9648 442.112A211.7632 211.7632 0 0 1 486.4 409.6C613.632 409.6 716.8 524.2368 716.8 665.6s-103.168 256-230.4 256S256 806.9632 256 665.6c0-38.5024 7.68-75.0592 21.3504-107.8272L480.4096 0h54.4768zM486.4 870.4C585.3696 870.4 665.6 778.752 665.6 665.6S585.3696 460.8 486.4 460.8 307.2 552.448 307.2 665.6s80.2304 204.8 179.2 204.8z" fill="#444444" p-id="5579"></path></svg>
                        <div class="name">name</div>
                        <div class="mask">
                            <i class="_icon icon-delete"></i>
                        </div>
                    </div>
                </ul>
                <footer class="footer">
                    <button class="btn btn-large btn-normal">添加至项目</button>
                    <button class="btn btn-large btn-normal">下载素材</button>
                    <button class="btn btn-large btn-normal">下载代码</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cartVisible: false,
                icons: [
                    {
                        id: '1'
                    },
                    {
                        id: '2'
                    },
                    {
                        id: '3'
                    },
                ],
                carts: [{
                        id: '1'
                    },
                    {
                        id: '3'
                    },
                ]
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            addToCart(icon) {
                let isInCart = this.carts.some(item => item.id === icon.id)
                if (isInCart) {
                    for (let i = 0; i < this.carts.length; i++) {
                        if (this.carts[i].id === icon.id) {
                            this.carts.splice(i, 1)
                        }
                    }
                } else {
                    this.carts.push(icon)
                }
            },
            isSelected(icon) {
                  return this.carts.some(item => item.id === icon.id)
            },
            closeCart() {
                this.cartVisible = false
            },
            init() {
                for (let i = 0; i < 40; i++) {
                    this.icons.push({
                        id: new Date().getTime()
                    })
                }
            }
        }
    }
</script>

<style scoped>
</style>
