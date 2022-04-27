import { Box, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 0)
    },

    left: {
        width: '250px',
    },

}))

function CartFeature(props) {

    const classes = useStyles()
    const cartTotal = useSelector(cartTotalSelector)
    const cartItems = useSelector(state => state.cart)

    console.log(cartItems);

    return (
        <Box>
            <Container>
                <Box className={classes.root}>
                    <Typography variant="h5" fontWeight="bold">GIỎ HÀNG</Typography>

                    <Paper elevation={0}>
                        <Typography>GIỎ HÀNG</Typography>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}

export default CartFeature;