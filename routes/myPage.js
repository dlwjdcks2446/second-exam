const express = require('express');
const router = express.Router();
const myPageHandler = require('../handlers/myPageHandler');

router.get('/:userID', myPageHandler.myPage);
router.post('/:userID/edit', myPageHandler.edit);

module.exports = router;