
window.onload = () => {
    const list = new ProductsList(new Cart());
    // хром (CORS) ругается на запросы к файловой системе :(
    //list.getJson('./getProducts.json').then(data => list.handleData(data));
};