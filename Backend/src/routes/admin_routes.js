import { Router } from "express";

import {
    login,
    listUsers,
    createUser,
    updateUser,
    deleteUser,
    registerAdmin
} from '../controllers/admin_controller.js'

const router = Router()

router.post('/adminlogin', login)

router.get('/usuarioseclof',listUsers)

router.post('/registrarusuarios',createUser)

router.put('/actualizarusuario/:id',updateUser)

router.delete('/borrarusuario/:id',deleteUser)

router.post('/crearadmin',registerAdmin)


export default router