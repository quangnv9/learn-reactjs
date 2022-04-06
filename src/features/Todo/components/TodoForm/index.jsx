import { yupResolver } from '@hookform/resolvers/yup';
// import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import PasswordField from 'components/form-controls/PasswordField';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {
    const schema = yup.object().shape({
        title: yup.string()
            .required('Please enter title')
            .min(5, 'Title is too short')
    }).required();

    const form = useForm({
        defaultValues: {
            title: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })

    console.log("Control: ", form.control);

    const handleSubmit = (values) => {
        const { onSubmit } = props;
        if (!onSubmit) return
        onSubmit(values)

        form.reset()
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Enter Todo..." form={form} />
        </form>
    );
}

export default TodoForm;