import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import { makeStyles } from '@material-ui/core';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },

    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            marginTop: theme.spacing(1),

            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.primary.dark,
            }
        }
    }
}))


function FilterByCategory({ onChange }) {

    const [categoryList, setCategoryList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            try {
                const response = await categoryApi.getAll()
                setCategoryList(response)
            } catch (error) {
                console.log('Failed to fetch category list', error);
            }
        })()
    }, [])

    const handleCategoryClick = (category) => {
        if (onChange) {
            onChange(category.id)
        }
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
            <ul className={classes.menu}>
                {categoryList.map((category) => (
                    <li key={category.id} onClick={() => handleCategoryClick(category)}>
                        <Typography variant="body2">{category.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;