<template>
    <div class="page-about">
        <ui-header></ui-header>
        <div class="banner">
            <div class="container">
                <div class="avatar-box">

                </div>
                <div v-if="collection">
                    <h1 class="title">{{ collection.name }}</h1>
                    <div class="info">{{ collection.items.length }} icons</div>
                    <div class="info">粟三</div>
                </div>
            </div>
        </div>
        <main class="page-body">
            <div class="container">
                <ul class="main-icon-list" v-if="collection">
                    <li class="item" v-for="item in collection.items" :class="{selected: isSelected(item.Icon)}">
                        <div v-html="item.Icon.content"></div>
                        <div class="name">{{ item.Icon.name }}</div>
                        <div class="mask">
                            <div class="cover-item _icon cover-item-line icon-cart" title="添加入库" @click="addToCart(item.Icon)"></div>
                            <div class="cover-item _icon cover-item-line icon-star" title="收藏"></div>
                            <div class="cover-item _icon cover-item-line icon-download" title="下载图标"></div>
                        </div>
                    </li>
                </ul>
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
                collection: {},
                icons: [],
                carts: [{
                        id: '1'
                    },
                    {
                        id: '3'
                    }
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
                let id = this.$route.params.id
                this.$http.get('/collections/' + id)
                    .then(response => {
                        let data = response.data
                        console.log(data)
                        this.collection = data
                    },
                    response => {
                        console.log(response)
                    })
            }
        }
    }
</script>

<style scoped>
</style>
