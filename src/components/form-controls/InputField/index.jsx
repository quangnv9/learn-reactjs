import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form;
    const hasErrors = errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ onChange, onBlur, value, name }) => (
                <TextField
                    fullWidth
                    label={label}
                    disabled={disabled}
                    error={!!hasErrors}
                    helperText={errors[name]?.message}
                    variant="outlined"
                    margin="normal"
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            )}
        />
    );
}

export default InputField;
