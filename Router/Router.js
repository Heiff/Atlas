const { Router } = require('express');
const { getProducts,ProductsUpdate, LoginEjs ,postProducts,SigninEjs, Home, AdminEjs, ProductDelete, CommentsEjs,} = require('../Controller/ControllerProducts')
const { Register, Login,auth ,LoginAdmin, ReadComments} = require('../Controller/ControllerAdmin')
const router = Router()

router.get('/reg/ejs',SigninEjs)
router.get('/log/ejs',LoginEjs)
router.get('/admin/ejs',AdminEjs)
router.post('/auth/log',Login)
router.post('/auth/reg',Register)
router.post('/admin/log',LoginAdmin)
router.post('/send',ReadComments)
router.get('/admin/comments',auth,CommentsEjs)
router.get('/home',Home)
router.post('/products/post',auth,postProducts)
router.put('/products/put',auth,ProductsUpdate)
router.get('/products/get',auth,getProducts)
router.delete('/products/:id',auth,ProductDelete)

module.exports = router