import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, Typography } from '@material-ui/core';
import { Avatar, Button, LinearProgress } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main + '!important',
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2, 0, 2, 0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0) + '!important',
        padding: theme.spacing(1, 0, 1, 0) + '!important',
    },
}));

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const classes = useStyles();

    const schema = yup
        .object()
        .shape({
            fullname: yup
                .string()
                .required('Please enter your full name')
                .test('Should has at least two words', 'Please enter at least two words', (value) => {
                    return value.split(' ').length >= 2;
                }),

            email: yup.string().required('Please enter your email').email('Email không đúng định dạng'),

            password: yup.string().required('Please enter your password').min(6, 'Mật khẩu phải có ít nhất 8 ký tự'),

            retypePassword: yup
                .string()
                .required('Please enter your retype password')
                .oneOf([yup.ref('password')], 'Xác nhận mật khẩu không đúng'),
        })
        .required();

    const form = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    const { isSubmitting } = form.formState;
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress />}

            <Avatar className={classes.avatar}></Avatar>

            <Typography className={classes.title} variant="h5" component="h3">
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                <InputField name="fullname" label="Full name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype Password" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Create An Account
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
