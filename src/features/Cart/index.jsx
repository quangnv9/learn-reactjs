import { Box, Container, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { DeleteForever } from '@mui/icons-material';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { removeFormCart } from './cartSlice';
import { cartItemsCountSelector, cartTotalSelector } from './selectors';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 0)
    },

    left: {
        width: '250px',
    },
    productItem: {
        display: 'flex',
    },
    itemImg: {
        marginRight: theme.spacing(2)
    },
    word: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    total: {
        paddingLeft: theme.spacing(2)
    },
    salePrice: {
        fontWeight: "bold"
    },
    totalPrice: {
        fontWeight: "bold",
        color: theme.palette.secondary.main,
    }
}))

function CartFeature() {

    const classes = useStyles()
    const dispatch = useDispatch()

    const cartTotal = useSelector(cartTotalSelector)
    const cartItemsCount = useSelector(cartItemsCountSelector)
    const cartItems = useSelector(state => state.cart)

    const handleRemoveItem = (item) => {
        dispatch(removeFormCart(item.id))
    }

    return (
        <Box>
            <Container>
                <Box className={classes.root}>
                    <Typography variant="h5" fontWeight="bold">GIỎ HÀNG</Typography>

                    <Paper elevation={0} style={{ marginTop: 20 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Tất cả ( {cartItems.cartItems.length} sản phẩm )</TableCell>
                                        <TableCell align="center">Đơn giá</TableCell>
                                        <TableCell align="center">Số lượng</TableCell>
                                        <TableCell align="center">Thành tiền</TableCell>
                                        <TableCell align="center">
                                            <DeleteForever></DeleteForever>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.cartItems.map(item => (

                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell className={classes.productItem} component="th" scope="row">
                                                <Box className={classes.itemImg} width="22%">
                                                    <ProductThumbnail product={item.product} />
                                                </Box>
                                                <Box className={classes.word}>
                                                    <Typography variant='h6'>{item.product.name}</Typography>
                                                    <Typography variant='subtitle2'>Thưởng 188,80 ASA</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell className={classes.salePrice} align="center">
                                                {formatPrice(item.product.salePrice)}
                                            </TableCell>
                                            <TableCell align="center">{item.quantity}</TableCell>
                                            <TableCell className={classes.totalPrice} align="center">{formatPrice(item.product.salePrice * item.quantity)}</TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => handleRemoveItem(item)}>
                                                    <DeleteForever></DeleteForever>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    <Paper>
                        <Typography className={classes.total} variant="h6">Tổng tiền: {cartTotal}</Typography>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}

export default CartFeature;