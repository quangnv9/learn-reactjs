import React from 'react';
import PropTypes from 'prop-types';

ProductItem.propTypes = {
    
};

function ProductItem({product}) {
    return (
        <div>
            <p>{product.name}</p>
            <p>{product.created_at}</p>
        </div>
    );
}

export default ProductItem;