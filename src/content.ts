import { recognize } from 'tesseract.js'

let img = document.getElementsByTagName('img')[1]

if (img) {

    img.onclick = function () {
        // let ipt = document.getElementById('solve_string') as HTMLInputElement

        // let port = chrome.runtime.connect({ name: 'contentscript' })
        // port.onMessage.addListener(function (msg) {
        //     console.log(msg)
        //     ipt.value = msg
        //     let event = new Event('input')
        //     ipt.dispatchEvent(event)
        // })
        // port.postMessage({ image: img })
        console.log('hi')
        recognize(img, 'eng').then(function (result) {
            console.log('result', result)
        })
    }
}

