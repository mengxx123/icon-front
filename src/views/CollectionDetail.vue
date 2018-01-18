<template>
    <my-page :title="title" :page="page">
        <ui-paper class="collection-box">
            <div v-if="collection">
                <h1 class="title">{{ collection.name }}</h1>
                <div class="info">{{ collection.items.length }} icons</div>
                <div class="info">粟三</div>
            </div>
        </ui-paper>
        <main class="page-body">
            <div class="container">
                <ul class="main-icon-list" v-if="collection">
                    <li class="item" v-for="item in collection.items" :class="{selected: isSelected(item.Icon)}">
                        <div v-html="item.Icon.content"></div>
                        <div class="name">{{ item.Icon.name }}</div>
                        <div class="mask">
                            <div class="cover-item _icon cover-item-line icon-cart" title="添加入库" @click="addToCart(item.Icon)"></div>
                            <div class="cover-item _icon cover-item-line icon-star" title="收藏"></div>
                            <div class="cover-item _icon cover-item-line icon-download" title="下载图标" @click="downloadIcon(item.Icon)"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
        <ui-popup popupClass="cart-box" position="right" :open="cartVisible" @close="closeCart()">
            <ui-appbar title="购物车">
                <ui-icon-button icon="close" slot="left" @click="closeCart" />
                <ui-icon-button icon="delete" slot="right" title="一键清除" @click="clearCart" />
            </ui-appbar>
            <div class="cart-empty" v-if="!carts.length">
                <img src="/static/img/empty-cart.svg"/>
                <div>赶快把喜欢的图标加入购物车</div>
            </div>
            <ul class="cart-list">
                <div class="item" v-for="item in carts">
                    <!--<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5578"><path d="M534.8864 0L373.9648 442.112A211.7632 211.7632 0 0 1 486.4 409.6C613.632 409.6 716.8 524.2368 716.8 665.6s-103.168 256-230.4 256S256 806.9632 256 665.6c0-38.5024 7.68-75.0592 21.3504-107.8272L480.4096 0h54.4768zM486.4 870.4C585.3696 870.4 665.6 778.752 665.6 665.6S585.3696 460.8 486.4 460.8 307.2 552.448 307.2 665.6s80.2304 204.8 179.2 204.8z" fill="#444444" p-id="5579"></path></svg>-->
                    <div v-html="item.content">

                    </div>
                    <div class="name">name</div>
                    <div class="mask">
                        <i class="_icon icon-delete"></i>
                    </div>
                </div>
            </ul>
            <footer class="footer" v-if="carts.length">
                <ui-raised-button class="btn" label="添加至项目" @click="closeCart" />
                <ui-raised-button class="btn" label="下载素材" @click="closeCart" />
                <ui-raised-button class="btn" label="下载代码" @click="closeCart" />
            </footer>
        </ui-popup>

        <ui-popup popupClass="download-box" position="right" :open="downloadVisible" @close="closeDownload()">
            <ui-appbar title="下载">
                <ui-icon-button icon="close" slot="left" @click="closeDownload" />
            </ui-appbar>
            <div v-html="dlIcon.content"></div>
            <ui-raised-button class="btn" label="SVG 下载" @click="downloadSvg" />
            <ui-raised-button class="btn" label="AI 下载" @click="closeCart" />
            <ui-raised-button class="btn" label="PNG 下载" @click="closeCart" />
        </ui-popup>
        <ui-float-button class="my-float-button btn-add" icon="add"/>
        <ui-float-button class="my-float-button btn-feedback" icon="feedback"/>
    </my-page>
</template>

<script>
    const saveAs = window.saveAs

    export default {
        data () {
            return {
                title: '',
                collection: null,
                icons: [],

                cartVisible: false,
                carts: [],

                downloadVisible: false,
                dlIcon: {},

                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'shopping_cart',
                            click: this.showCart,
                            title: '购物车'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            downloadIcon(icon) {
                this.dlIcon = icon
                this.downloadVisible = true
                console.log(icon)
            },
            closeDownload() {
                this.downloadVisible = false
            },
            downloadSvg() {
                let head = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
                let content = head + this.dlIcon.content
                let blob = new Blob([content], {type: `image/svg+xml;charset=utf-8`})
                saveAs(blob, 'hello world.svg')
            },
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
            clearCart() {
                this.carts = []
            },
            isSelected(icon) {
                  return this.carts.some(item => item.id === icon.id)
            },
            closeCart() {
                this.cartVisible = false
            },
            init() {
                let id = this.$route.params.id
                this.$http.get('/collections/' + id)
                    .then(response => {
                        let data = response.data
                        console.log(data)
                        this.collection = data
                        this.title = this.collection.name
                    },
                    response => {
                        console.log(response)
                    })
            },
            showCart() {
                this.cartVisible = true
            },
            download() {
            }
        }
    }
</script>

<style lang="scss">

</style>
