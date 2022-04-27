import { FormHelperText } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {

    const { form, name, label, disabled } = props;
    const { errors } = form;
    const hasErrors = errors[name]
    const [showPassword, setShowPassword] = useState(true)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <FormControl error={!!hasErrors} fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={form.control}
                render={({ onChange, onBlur, value, name }) => (
                    <OutlinedInput
                        id={name}

                        type={showPassword ? 'password' : 'text'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={label}
                        value={value}
                        disabled={disabled}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )}



            />
            <FormHelperText error={!!hasErrors}>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
}

export default PasswordField;