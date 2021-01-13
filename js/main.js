const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Keyboard', price: 200 },
    { id: 3, title: 'Mouse', price: 100 },
    { id: 4, title: 'Gamepad', price: 87 },
];

// так-как знаем структуру аргумента,
// можно обобщить аргументы функции.
const renderProduct = (item) => {
    return `<li class="products_item">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="products_item_buy-btn">Buy</button>
            </li>`;
};
// хоть смысла в этом и нет, но задаем параметр по умолчанию :)
const render = (productsList = products) => {
    // один раз найдем элемент списка, что бы не дергать
    // querySelector каждый проход цикла
    let productListElem = document.querySelector('.products');
    // прибавляем каждый проход цикла к соду элемента,
    // код генерируемый функцией renderProduct
    // тем самым избавляемся от дефолтного toString массива,
    // а следовательно и запятых.
    productsList.map(item => productListElem.innerHTML += renderProduct(item));
};

render(products);