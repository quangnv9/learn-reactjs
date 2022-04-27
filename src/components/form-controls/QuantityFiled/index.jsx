import { Box, FormHelperText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme => ({
    root: {

    },
    box: {
        display: 'flex',
        maxWidth: '200px',
    }
})))

function QuantityField(props) {

    const classes = useStyles();

    const { form, name, label, disabled } = props;
    const { errors, setValue } = form;
    const hasErrors = errors[name]

    return (
        <FormControl error={!!hasErrors} fullWidth margin="normal" variant="outlined" size="small">
            <Typography>{label}</Typography>
            <Controller
                name={name}
                control={form.control}
                render={({ onChange, onBlur, value, name }) => (
                    <Box className={classes.box}>
                        <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
                            <RemoveCircleOutline />
                        </IconButton>
                        <OutlinedInput
                            id={name}

                            type="number"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
                            <AddCircleOutline />
                        </IconButton>
                    </Box>

                )}



            />
            <FormHelperText error={!!hasErrors}>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
}

export default QuantityField;