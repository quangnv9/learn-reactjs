import { Box, makeStyles, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';

Product.propTypes = {
    product: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {
        '& > img:hover': {
            cursor: 'pointer'
        }
    },

}))

function Product({ product = {} }) {

    const classes = useStyles()
    const history = useHistory()

    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER

    const handleClick = () => {
        history.push(`/products/${product.id}`)
    }
    return (
        <Box padding={1} minHeight='215px' onClick={handleClick} className={classes.root}>
            <img
                src={thumbnailUrl}
                alt={product.name}
                width='100%'
            />
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
                    {formatPrice(product.salePrice)}
                </Box>
                {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
    );
}

export default Product;