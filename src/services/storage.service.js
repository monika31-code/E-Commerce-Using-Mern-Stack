const ImageKit = require("@imagekit/nodejs")

const client = new ImageKit({
    publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
    privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
    urlEndpoint: process.env.URL_ENDPOINT_IMAGEKIT
})

async function uploadFiles(buffer, fileName) {

    const result = await client.files.upload({
        file: buffer.toString("base64"),
        fileName
    })

    return result
}

module.exports = {
    uploadFiles
}