const saveAs = window.saveAs

window.toUTF8 = function (str) {
    if (typeof str !== 'string') {
        throw new TypeError('toUTF8 function only accept a string as its parameter.')
    }
    var ret = []
    var c1, c2, c3
    var cc = 0
    for (var i = 0, l = str.length; i < l; i++) {
        cc = str.charCodeAt(i)
        if (cc > 0xFFFF) {
            throw new Error('InvalidCharacterError')
        }
        if (cc > 0x80) {
            if (cc < 0x07FF) {
                c1 = String.fromCharCode((cc >>> 6) | 0xC0)
                c2 = String.fromCharCode((cc & 0x3F) | 0x80)
                ret.push(c1, c2)
            } else {
                c1 = String.fromCharCode((cc >>> 12) | 0xE0)
                c2 = String.fromCharCode(((cc >>> 6) & 0x3F) | 0x80)
                c3 = String.fromCharCode((cc & 0x3F) | 0x80)
                ret.push(c1, c2, c3)
            }
        } else {
            ret.push(str[i])
        }
    }
    return ret.join('')
}

let svg = {
    svgToDataUrl(html, callback) {
        console.log(html)
        html = window.toUTF8(html)
        let imgSrc = 'data:image/svg+xml;base64,' + btoa(html)

        console.log(imgSrc)
        // let canvas = document.createElement('CANVAS')
        let canvas = document.getElementById('canvas')
        console.log(canvas)
        canvas.width = 1024 // TODO 写死
        canvas.height = 1024

        // 加载图片并绘制到画布
        let img = new Image()
        img.onload = function () {
            let myctx = canvas.getContext('2d')
            myctx.width = 1024
            myctx.height = 1024
            myctx.drawImage(img, 0, 0, 1024, 1024, 0, 0, 1024, 1024)
            let dataUrl = canvas.toDataURL()
            callback && callback(dataUrl)
        }
        img.src = imgSrc
    },

    download(html) {
        console.log(html)
        html = window.toUTF8(html)
        let imgSrc = 'data:image/svg+xml;base64,' + btoa(html)

        console.log(imgSrc)
        // let canvas = new HTMLCanvasElement('<canvas>')
        let canvas = document.getElementById('canvas')
        console.log(canvas)
        canvas.width = 1024 // TODO 写死
        canvas.height = 1024

        // 加载图片并绘制到画布
        let img = new Image()
        img.onload = function () {
            let myctx = canvas.getContext('2d')
            myctx.width = 1024
            myctx.height = 1024
            myctx.drawImage(img, 0, 0, 1024, 1024, 0, 0, 1024, 1024)
            canvas.toBlob(function (blob) {
                saveAs(blob, new Date().getTime() + '.png')
            })
        }
        img.src = imgSrc
    }
}
export default svg
