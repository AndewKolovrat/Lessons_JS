export const ProductItem = {
    props: ['img', 'product'],
    template: `<li class="products_item" v-show="$root.getReg.test(product.product_name)">
            <img :src="img" :alt="product.product_name">
            <h3>{{ product.product_name }}</h3>
            <p>{{ product.price }}</p>
            <button class="products_item_buy-btn" @click="$root.$refs.cart.addProductToCart(product)">Купить</button>
            </li>`
};