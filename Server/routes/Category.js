const express = require('express')
const routes = express.Router()

// controllers

const {
    list,
    create,
    read,
    update,
    remove
} = require('../controllers/Category')
const { auth, adminCheck } = require('../Middleware/auth')
routes.get('/category', list)
routes.post('/category', auth, adminCheck, create)
routes.get('/category/:id', read)
routes.put('/category/:id', auth, adminCheck, update)
routes.delete('/category/:id', auth, adminCheck, remove)

module.exports = routes;