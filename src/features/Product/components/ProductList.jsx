import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { Skeleton } from '@material-ui/lab'
import Product from './Product';

ProductList.propTypes = {
    productList: PropTypes.array,
};
ProductList.defaultProps = {
    productList: [],
}

function ProductList({ productList }) {
    return (
        <Box>
            <Grid container>
                {productList.map((product, index) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;