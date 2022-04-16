import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useEffect } from 'react'
import productApi from 'api/productApi'
import ProductSkeletonLisst from '../components/ProductSkeletonLisst';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';


const useStyles = makeStyles(theme => ({
    root: {},

    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 0',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',

        marginTop: '24px',
        paddingBottom: '20px'
    }
}))

function ListPage(props) {
    const classes = useStyles()
    const [productList, setProductList] = useState([])
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 10,
        page: 1,
    })
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 12,
        _sort: 'salePrice:ASC'
    })

    useEffect(() => {
        (async () => {

            if (filters.salePrice_gte === 0 && filters.salePrice_lte === 0) {
                delete filters.salePrice_gte
                delete filters.salePrice_lte
            }
            if (!filters.isPromotion) {
                delete filters.isPromotion
            } if (!filters.isFreeShip) {
                delete filters.isFreeShip
            }
            try {
                const { data, pagination } = await productApi.getAll(filters)
                setProductList(data)
                setPagination(pagination)
            } catch (error) {
                console.log('Failed', error);
            }
            setLoading(false);
        })();
    }, [filters])

    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page
        }))
    }
    const handleSortChange = (newValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: 1,
            _sort: newValue
        }))
    }
    const handleFiltersChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: 1,
            ...newFilters
        }))
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters
                                filters={filters}
                                onChange={handleFiltersChange}
                            />
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort onChange={handleSortChange} currentSort={filters._sort} />
                            {loading
                                ? <ProductSkeletonLisst />
                                : <ProductList productList={productList}>product list</ProductList>
                            }

                            <Box className={classes.pagination}>
                                <Pagination
                                    color='primary'
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                >
                                </Pagination>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;