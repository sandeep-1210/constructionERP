const router = require('express').Router()
const authController = require('../api/auth.controller')
const categoryController = require('../api/category.controller')
const productController = require('../api/product.controller')
const supplierController = require('../api/supplier.controller')
const userController = require('../api/user.controller')
const customerController = require('../api/customer.controller')
const brandController = require('../api/brands.controller')
const authMiddleware = require('../../authMiddleware/authmiddleware')
const validation = require('../middleware/validation.middleware');

//auth

router.post('/auth/login', authController.login)
router.use('/auth/check', authMiddleware)
router.get('/auth/check', authController.check)

//user 

router.post('/user/register', userController.register)
router.post('/user/changepassword', userController.changepassword)
router.get('/user/list', userController.list)
router.post('/user/assign-admin/:username', userController.assignAdmin)

//category

router.post('/category/add', categoryController.addCategory)
router.get('/category/getAll', categoryController.getAllCategory);
router.get('/category/get/:id', categoryController.getCategoryById);
router.put('/category/update/:id', categoryController.updateCategory);
router.delete('/category/delete/:id', categoryController.deleteCategory);

//brand

router.post('/brand/add', brandController.addBrand)
router.get('/brand/getAll', brandController.getAll);
router.get('/brand/get/:id', brandController.getById);
router.put('/brand/update/:id', brandController.updateBrand);
router.delete('/brand/delete/:id',brandController.deleteBrand);

// product
//validation.productValidation,
router.post('/product/add',  productController.addProduct)
router.get('/product/getAll', productController.getAll);
router.get('/product/get/:id', productController.getById);
router.put('/product/update/:id', productController.updateProduct);
router.delete('/product/delete/:id',productController.deleteProduct)

//supplier

router.post('/supplier/add', supplierController.addSupplier)
router.get('/supplier/getAll', supplierController.getAllSupplier);
router.get('/supplier/get/:id', supplierController.getSupplierById);
router.put('/supplier/update/:id', supplierController.updateSupplier);
router.delete('/supplier/delete/:id',supplierController.deleteSupplier)

//customer

router.post('/customer/add', customerController.addCustomer)
router.get('/customer/getAll', customerController.getAll);
router.get('/customer/get/:id', customerController.getById);
router.get('/customer/getbyMobile/:id', customerController.getbyMobile);
router.put('/customer/update/:id', customerController.updateCustomer);

module.exports = router