import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo, useState } from 'react';
import { useEffect } from 'react'
import queryString from 'query-string'
import productApi from 'api/productApi'
import ProductSkeletonLisst from '../components/ProductSkeletonLisst';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


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

    const history = useHistory()
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return ({
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true'
        })
    }, [location.search])

    const [pagination, setPagination] = useState({
        limit: 12,
        total: 10,
        page: 1,
    })
    const [loading, setLoading] = useState(true)

    // const [filters, setFilters] = useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 12,
    //     _sort: queryParams._sort || 'salePrice:ASC'
    // }))

    // useEffect(() => {
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(filters)
    //     })
    // }, [filters])

    useEffect(() => {
        (async () => {

            if (Number.parseInt(queryParams.salePrice_gte) === 0 && Number.parseInt(queryParams.salePrice_lte) === 0) {
                delete queryParams.salePrice_gte
                delete queryParams.salePrice_lte
            }
            if (!queryParams.isPromotion) {
                delete queryParams.isPromotion
            }
            if (!queryParams.isFreeShip) {
                delete queryParams.isFreeShip
            }
            try {
                const { data, pagination } = await productApi.getAll(queryParams)
                setProductList(data)
                setPagination(pagination)
            } catch (error) {
                console.log('Failed', error);
            }
            setLoading(false);
        })();
    }, [queryParams])

    const handlePageChange = (e, page) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: page
        // }))

        const filters = {
            ...queryParams,
            _page: page,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }
    const handleSortChange = (newValue) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: 1,
        //     _sort: newValue
        // }))

        const filters = {
            ...queryParams,
            _page: 1,
            _sort: newValue
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })

    }
    const handleFiltersChange = (newFilters) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: 1,
        //     ...newFilters
        // }))

        const filters = {
            ...queryParams,
            _page: 1,
            ...newFilters,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters
                                filters={queryParams}
                                onChange={handleFiltersChange}
                            />
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort onChange={handleSortChange} currentSort={queryParams._sort} />
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