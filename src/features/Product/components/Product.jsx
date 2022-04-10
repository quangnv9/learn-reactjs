import { Box, Typography } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants';
import PropTypes from 'prop-types';
import React from 'react';

Product.propTypes = {
    product: PropTypes.object,
};
Product.defaultProps = {
    product: {}
}

function Product({ product }) {
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER
    return (
        <Box padding={1}>
            <img
                src={thumbnailUrl}
                alt={product.name}
                width='100%'
            />
            <Typography>{product.name}</Typography>
            <Typography>{product.salePrice}  -{product.promotionPercent}</Typography>
        </Box>
    );
}

export default Product;