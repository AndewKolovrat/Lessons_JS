const fs = require('fs');
const moment = require('moment');

const file = 'cart.log';

const log = (action, cartItem) => {
    const text = `${moment().format()} - ${action}: item of cart ${cartItem.product_name} (id:${cartItem.id_product})\n`;

    fs.appendFile(file, text, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
};

module.exports = log;