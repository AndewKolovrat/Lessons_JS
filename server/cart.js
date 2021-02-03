const log = require('./logger');

const add = (cart, req) => {
    cart.contents.push(req.body);
    log("Add", req.body);
    return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    if (!find) {
        return;
    }
    find.quantity += req.body.quantity;
    log("Change quantity", find);
    return JSON.stringify(cart, null, 4);
};

// remove cartItem
const del = (cart, req) => {
    const index = getIndexByID(cart, +req.params.id);
    if (index !== -1) {
        log("Delete", cart.contents[index]);
        cart.contents.splice(index, 1);
    }
    return JSON.stringify(cart, null, 4);
};

const getIndexByID = (cart, id) => {
    for (let index = 0; index < cart.contents.length; index++) {
        if (cart.contents[index].id_product === id) {
            return index;
        }
    }
    return -1;
}

module.exports = {
    add,
    change,
    del
};