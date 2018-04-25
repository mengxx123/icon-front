<template>
    <my-page title="图标库">
        <ul class="list">
            <li class="item" v-for="icon in icons" @click="downloadIcon(icon)">
                <!--<img class="img" :src="apiDomain + '/download/' + icon.icon">-->
                <div class="svg-box" v-html="icon.content"></div>
                <div v-html="icon.icon"></div>
            </li>
        </ul>
        <ui-popup popupClass="download-box" position="right" :open="downloadVisible" @close="closeDownload()">
            <ui-appbar title="下载">
                <ui-icon-button icon="all_inclusive" slot="right" @click="link" title="用其他应用打开" />
                <ui-icon-button icon="close" slot="left" @click="closeDownload" />
            </ui-appbar>
            <div class="body">
                <div class="editor">
                    <div class="bg">
                        <div class="line-row" v-for="n in 15" :style="{top: (320 / 16 * n) + 'px'}"></div>
                        <div class="line-column" v-for="n in 15" :style="{left: (320 / 16 * n) + 'px'}"></div>
                    </div>
                    <div class="svg-box2" v-html="dlIcon.content"></div>
                </div>
                <ui-raised-button class="btn" label="SVG 下载" @click="downloadSvg" />
                <!--<ui-raised-button class="btn" label="AI 下载" @click="closeDownload" />-->
                <ui-raised-button class="btn" label="PNG 下载" @click="downloadPng" />
            </div>
        </ui-popup>
        <canvas id="canvas" style="display: none"></canvas>
    </my-page>
</template>

<script>
    import {apiDomain} from '../config'
    import svgUtil from '../util/svg'
    const saveAs = window.saveAs
    const Intent = window.Intent

    export default {
        data () {
            return {
                apiDomain: apiDomain,
                icons: [],

                downloadVisible: false,
                dlIcon: {}
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.initWebIntents()
                this.$http.get('/download/all.json')
                    .then(response => {
                        this.icons = response.data.data
//                        this.downloadIcon(this.icons[0])
                    },
                    response => {
                        console.log(response)
                    })
            },
            initWebIntents() {
                // if (!window.intent) {
                //     return
                // }
                // console.log(window.intent.data)
                // let data = window.intent.data
                // this.editor.setValue(data)

                // this.page.menu.push({
                //     type: 'icon',
                //     icon: 'check',
                //     click: this.finish,
                //     title: '完成'
                // })
            },
            downloadIcon(icon) {
                if (window.intent) {
                    this.dlIcon = icon
                    let head = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
                    let content = head + this.dlIcon.content
                    svgUtil.svgToDataUrl(content, dataUrl => {
                        console.log(dataUrl)
                        window.intent.postResult(dataUrl)
                        setTimeout(() => {
                            let owner = window.opener || window.parent
                            owner.window.close()
                        }, 100)
                    })
                } else {
                    this.dlIcon = icon
                    this.downloadVisible = true
                    let head = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
                    let content = head + this.dlIcon.content
                    svgUtil.svgToDataUrl(content, dataUrl => {
                        this.dataUrl = dataUrl
                    })
                }
            },
            closeDownload() {
                this.downloadVisible = false
            },
            link() {
                let intent = new Intent({
                    action: 'http://webintent.yunser.com/?',
                    type: 'image/png',
                    data: this.dataUrl
                })
                navigator.startActivity(intent, data => {
                    console.log('成功')
                    this.content = data
                }, data => {
                    console.log('失败')
                })
            },
            downloadSvg() {
                let head = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
                let content = head + this.dlIcon.content
                let blob = new Blob([content], {type: `image/svg+xml;charset=utf-8`})
                saveAs(blob, 'yunser_' + new Date().getTime() + '.svg')
            },
            downloadPng() {
                let head = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
                let content = head + this.dlIcon.content
                svgUtil.download(content)
            }
        }
    }
</script>

<style lang="scss">
    .editor {
        position: relative;
        width: 320px;
        height: 320px;
        margin: 16px auto;
        background-color: #dededf;
        .bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        .line-row {
            position: absolute;
            top: 10px;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #fff;
        }
        .line-column {
            position: absolute;
            top: 0;
            left: 0;
            width: 1px;
            height: 100%;
            background-color: #fff;
        }
        .svg-box2 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        }
    }
    .list {
        .item {
            float: left;
            width: 100px;
            margin-right: 16px;
            margin-bottom: 16px;
            border: 1px solid #ccc;
            .svg-box {
                svg {
                    width: 100px;
                    height: 100px;
                    border: 1px solid #ccc;
                }
            }
        }
    }
</style>
