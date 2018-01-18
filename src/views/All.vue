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
                <ui-icon-button icon="close" slot="left" @click="closeDownload" />
            </ui-appbar>
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
        </ui-popup>
        <canvas id="canvas" style="display: none"></canvas>
    </my-page>
</template>

<script>
    import {apiDomain} from '../config'
    import svgUtil from '../util/svg'
    const saveAs = window.saveAs

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
                this.$http.get('/download/all.json')
                    .then(response => {
                        this.icons = response.data.data
//                        this.downloadIcon(this.icons[0])
                    },
                    response => {
                        console.log(response)
                    })
            },
            downloadIcon(icon) {
                this.dlIcon = icon
                this.downloadVisible = true
            },
            closeDownload() {
                this.downloadVisible = false
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
