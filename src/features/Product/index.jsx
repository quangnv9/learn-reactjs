import React, { useEffect, useState } from 'react';
import productApi from '../../api/productApi';
import ProductList from './components/ProductList'


function ProductFeature() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const params = {
          _limit: 10
        }
        const fetchProducts = async () => {
          const productList = await productApi.getAll(params);
          console.log(productList);
          setProducts(productList)
        }
        fetchProducts();
      }, [])

    return (
        <div>
            <ProductList products={products} />
        </div>
    );
}

export default ProductFeature;