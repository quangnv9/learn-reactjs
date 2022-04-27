import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyle = makeStyles((theme) => ({
    root: {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        padding: theme.spacing(2)
    },

    range: {
        display: 'flex',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),

        '&>span': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        }
    }
}))

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {

    const classes = useStyle();

    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        if (onChange) onChange(values)
        setValues({
            salePrice_gte: 0,
            salePrice_lte: 0,
        })
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>

            <Box className={classes.range}>
                <TextField
                    placeholder="0"
                    size="small"
                    variant="outlined"
                    name="salePrice_gte"
                    value={values.salePrice_gte}
                    onChange={handleChange}
                />
                <span>-</span>
                <TextField
                    placeholder="0"
                    size="small"
                    variant="outlined"
                    name="salePrice_lte"
                    value={values.salePrice_lte}
                    onChange={handleChange}
                />
            </Box>

            <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>Áp Dụng</Button>
        </Box>
    );
}

export default FilterByPrice;