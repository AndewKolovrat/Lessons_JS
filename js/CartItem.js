export const CartItem = {
    props: ['img', 'cartItem'],
    computed: {
        getTotalPrice() {
            return this.cartItem.price * this.cartItem.quantity;
        }
    },
    template: `<li class="header_cart_item" >
                    <img :src="img">
                    <h3>{{ cartItem.product_name }}</h3>
                    <p>{{ cartItem.price }}</p>
                    <p>{{ cartItem.quantity }}</p>
                    <p>{{ getTotalPrice }}</p>
                    <button @click="$parent.removeProductFromCart(cartItem)">Delete</button>
                </li>`
};