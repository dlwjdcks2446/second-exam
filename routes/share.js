const express = require('express');
const router = express.Router();
const shareHandler = require('../handlers/shareHandler');

router.get('/study', shareHandler.study_list);
router.get('/music', shareHandler.music_list);
router.get('/train', shareHandler.train);
router.get('/search', shareHandler.search);
router.get('/study_regist', shareHandler.study_regist);
router.get('/music_regist', shareHandler.music_regist);
router.post('/study_registProcess', shareHandler.study_registProcess);
router.post('/music_registProcess', shareHandler.music_registProcess);
router.get('/study/:subject', shareHandler.PersonalSubject);

module.exports = router;