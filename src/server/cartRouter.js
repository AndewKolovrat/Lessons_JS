const express = require('express');
const handler = require('./handler');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('src/server/db/userCart.json', (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0, text: err });
            return;
        }

        res.send(data);
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', 'src/server/db/userCart.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'src/server/db/userCart.json');
});

router.delete('/:id', (req, res) => {
    handler(req, res, 'del', 'src/server/db/userCart.json');
});

module.exports = router;