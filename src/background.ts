import { recognize } from 'tesseract.js'

chrome.runtime.onConnect.addListener(port => {
    if (port.name == 'contentscript') {
        console.log('connected')
    }
    port.onMessage.addListener(function (msg) {
        if (msg.image) {
            // recognize(msg.image as HTMLImageElement, 'eng')
            //     .then(function (result) {
            //         console.log('result', result)
            //         port.postMessage(result.data.text)
            //     })
            port.postMessage(msg.image.src)
        }
    })
})

