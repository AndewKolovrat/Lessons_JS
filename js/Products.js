import { ProductItem } from "./ProductItem.js";

export const Products = {
    components: {
        ProductItem
    },
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
        this.$root.getJson(`getProducts.json2`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            })
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