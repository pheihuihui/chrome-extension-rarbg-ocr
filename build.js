const esbuild = require('esbuild')
const fs = require('fs')

// esbuild.buildSync({
//     entryPoints: ['./src/background.ts'],
//     platform: 'browser',
//     treeShaking: false,
//     outfile: './dist/background.js',
//     tsconfig: 'tsconfig.json',
//     bundle: true
// })

esbuild.buildSync({
    entryPoints: ['./src/content.ts'],
    platform: 'browser',
    treeShaking: true,
    outfile: './dist/content.js',
    tsconfig: 'tsconfig.json',
    bundle: true
})

fs.copyFileSync('./src/manifests/manifest.json', './dist/manifest.json')

function listAllFiles(dir) {
    return fs.readdirSync(dir).reduce((files, file) => {
        const name = dir + '/' + file
        const isDirectory = fs.statSync(name).isDirectory()
        return isDirectory ? [...files, ...listAllFiles(name)] : [...files, name]
    }, [])
}

let imgFiles = listAllFiles('./src/images')
let certs = listAllFiles('./src/cert')

imgFiles.forEach(file => {
    fs.copyFileSync(file, `./dist/${file.split('/')[3]}`)
})

certs.forEach(file => {
    let name = file.split('/')[3]
    if (name != '.keep') {
        fs.copyFileSync(file, `./dist/${name}`)
    }
})