import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityFiled';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func
};

function AddToCartForm({ onSubmit = null }) {

    const schema = yup.object().shape({
        quantity: yup.number().min(1, 'Số sản phẩm phải lớn hơn 1').required('Vui lòng chọn số lượng')
    }).required();

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema)
    })

    const handleSubmitForm = async (values) => {
        if (onSubmit) {
            await onSubmit(values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            <QuantityField name="quantity" label="Số lượng" form={form} />
            <Button
                style={{ width: '200px', padding: '10px 0' }}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Add To Cart
            </Button>
        </form>
    );
}

export default AddToCartForm;