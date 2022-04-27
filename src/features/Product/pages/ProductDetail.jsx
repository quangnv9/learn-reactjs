import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { LinearProgress } from '@mui/material';
import { addToCart } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDatail from '../hooks/useProductDatail';

ProductDetail.propTypes = {

};

const useStyles = makeStyles(theme => ({
    root: {},

    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `3px solid ${theme.palette.grey[300]} `
    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5)
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%'
    }
}))

function ProductDetail() {

    const dispatch = useDispatch()
    const classes = useStyles()
    const { path } = useRouteMatch()
    const { productId } = useParams()

    const { product, loading } = useProductDatail(productId)
    if (loading) {
        return (
            <Box className={classes.loading}>
                <LinearProgress></LinearProgress>
            </Box>
        )
    }

    const handleAddToCartSubmit = (formValues) => {
        // const action = addToCart({
        //     id: product.id,
        //     product,
        //     quantity: formValues.quantity,
        // });
        // console.log(action);
        dispatch(addToCart({
            id: product.id,
            product,
            quantity: formValues.quantity,
        }));
    }

    return (

        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </Grid>
                    </Grid>
                </Paper>
                <ProductMenu />

                <Switch>
                    <Route path={path} exact>
                        <ProductDescription product={product} />
                    </Route>
                    <Route path={`${path}/additional`} >
                        <ProductAdditional />
                    </Route>
                    <Route path={`${path}/reviews`} >
                        <ProductReviews />
                    </Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default ProductDetail;