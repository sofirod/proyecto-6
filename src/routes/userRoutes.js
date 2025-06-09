const express = require('express');
const { registerUser, loginUser, verifyToken, updateUser } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verifytoken', authMiddleware, verifyToken); 
router.put('/update', authMiddleware, updateUser); 

module.exports = router;
