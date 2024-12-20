var express = require('express');
var router = express.Router();

router.get('/data', function (req, res, next) {
    res.json({ message: 'Student Cyber Games 2021' });
});

module.exports = router;