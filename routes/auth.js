const express = require('express');
const router = express.Router();
const authHandler = require('../handlers/authHandler');

router.get('/signIn', authHandler.signIn);
router.get('/signUp',authHandler.signUp);
router.post('/signInProcess', authHandler.signInProcess)
router.post('/signUpProcess', authHandler.signUpProcess);
router.get('/signOut', authHandler.signOut);
router.post('/withdrawal', authHandler.withdrawal);

module.exports = router;