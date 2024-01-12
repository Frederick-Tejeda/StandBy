const {Router} = require('express')
const router = Router()
const { Encrypt, Decrypt } = require('../controller/cryptControllers')

router.route('/encrypt')
    .post(Encrypt)

router.route('/decrypt')
    .post(Decrypt)    

module.exports = router