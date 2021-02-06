import { ProductItem } from "./ProductItem.js";

export const Products = {
    inject: ['getJson'],
    components: {
        ProductItem
    },
    data() {
        return {
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    mounted() {
        this.getJson('/api/products')
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data) {
                    this.products.push(product);
                }
            });
    },
    template: `<ul class="products">
                    <ProductItem
                        v-for="el of products" 
                        :key="el.id_product" 
                        :img="imgCatalog"
                        :product="el"
                        v-show="$root.$refs.search.check()"
                    >
                    </ProductItem>
            </ul>`
};