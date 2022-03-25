import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../ProductItem';

ProductList.propTypes = {
    
};

function ProductList({products}) {
    return (
        <div>
            {products.map((product, index) => (
                <li key={product.id}>
                    <ProductItem product={product} />
                </li>
            ))}
        </div>
    );
}

export default ProductList;