const CryptoJS = require('crypto-js');
require('dotenv').config()

controller = {}

controller.Encrypt = (req, res) => {
    try{
        let encrypted = []
        req.body.texts.forEach((text) => encrypted.push(CryptoJS.AES.encrypt(text, process.env.CRYPT_PASSWORD).toString()))
        res.status(201).send({ encrypted })
    }catch(err){
        res.status(500).send('error...')
    }
}

controller.Decrypt = (req, res) => {
    try{
        let decrypted = []
        req.body.texts.forEach((text) => decrypted.push(CryptoJS.AES.decrypt(text, process.env.CRYPT_PASSWORD).toString(CryptoJS.enc.Utf8)))
        res.status(200).json({ decrypted })
    }catch(err){
        res.status(500).send('error...')
    }
}

module.exports = controller