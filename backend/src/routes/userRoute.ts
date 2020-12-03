import express from 'express'
import {
    userSignup,
    userLogin,
    updateUsername,
    updateEmail,
    updateAddress,
    userLogout,
    getAddress,
    updatePassword
} from '../controllers/userAuthControllers'
import { requireAuth } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/signup', userSignup)
router.post('/signin', userLogin)
router.get('/logout', userLogout)
router.get('/address', requireAuth, getAddress)


// update user info in database 
router.patch('/update/username', requireAuth, updateUsername)
router.patch('/update/email', requireAuth, updateEmail)
router.patch('/update/password', requireAuth, updatePassword)
router.patch('/update/address', requireAuth, updateAddress)

export default router