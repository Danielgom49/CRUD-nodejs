const express = require('express');
const router = express.Router(); // MÉTODO QUE DEVUELVE UN OBJETO DE JS EN EL CUAL SE PUEDEN AGREGAR RUTAS
const customerController = require('../controllers/customerController')

router.get('/', customerController.list);
router.post('/add', customerController.save)
router.get('/delete/:id', customerController.delete)
router.get('/update/:id', customerController.edit)
router.post('/update/:id', customerController.update)

module.exports = router;