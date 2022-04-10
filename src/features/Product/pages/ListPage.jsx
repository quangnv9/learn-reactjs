import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useEffect } from 'react'
import productApi from 'api/productApi'
import ProductSkeletonLisst from '../components/ProductSkeletonLisst';
import ProductList from '../components/ProductList';


const useStyles = makeStyles(theme => ({
    root: {},

    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 0',
    }
}))

function ListPage(props) {
    const classes = useStyles()
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await productApi.getAll({ _page: 1, _limit: 10 })
                setProductList(data)
            } catch (error) {
                console.log('Failed', error);
            }
            setLoading(false);
        })();
    }, [])
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            Left Column
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            {loading ? <ProductSkeletonLisst /> : <ProductList productList={productList}>product list</ProductList>}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;