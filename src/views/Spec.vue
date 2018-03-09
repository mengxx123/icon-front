<template>
    <my-page title="图标规范工具" :page="page">
        <div class="btns">
            <ui-raised-button class="file-select-btn" label="选择图片" primary>
                <input type="file" class="ui-file-button" accept="image/*" @change="fileChange($event)">
            </ui-raised-button>
        </div>
        <div class="editor-box">
            <img class="template" src="/static/img/template.svg"/>
            <img class="logo" :src="resultSrc" v-if="resultSrc" />
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/spec/help'
                        }
                    ]
                },
                resultSrc: null
            }
        },
        methods: {
            fileChange(e) {
                let _this = this
                let files = e.target.files
                if (files.length > 0) {
                    console.log('啦啦')
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        console.log('啦啦2212')
                        _this.resultSrc = this.result
                        let img = new Image()
                        img.onload = function () {
                            _this.originWidth = img.width
                            _this.originHeight = img.height
                        }
                        img.src = _this.resultSrc
                    }
                    reader.readAsDataURL(files[0])
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btns {
        margin-bottom: 16px;
    }
    .editor-box {
        position: relative;
        width: 100%;
        max-width: 800px;
        max-height: 800px;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        .template {
            position: relative;
            z-index: 1000;
        }
        .logo {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>
