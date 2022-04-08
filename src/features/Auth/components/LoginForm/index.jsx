import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, Typography } from '@material-ui/core';
import { Avatar, Button, LinearProgress, TextField } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";


const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2)
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main + "!important",
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2, 0, 2, 0)
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0) + "!important",
        padding: theme.spacing(1, 0, 1, 0) + "!important"
    }
}))

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {

    const classes = useStyles();

    const schema = yup.object().shape({
        identifier: yup.string().required('Please enter your email')
            .email("Email không đúng định dạng"),

        password: yup.string().required('Please enter your password')
    }).required();

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })

    const handleSubmitForm = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values)
        }
    }

    const { isSubmitting } = form.formState
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress />}

            <Avatar className={classes.avatar}></Avatar>

            <Typography className={classes.title} variant="h5" component="h3">
                Sign In
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Sign In
                </Button>
            </form>
        </div>

    );
}

export default LoginForm;