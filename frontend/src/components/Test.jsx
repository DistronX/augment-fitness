import { Box, TextField } from '@mui/material';
import { Formik } from 'formik';
import React from 'react'

export default function Test() {
    return (
        <>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                push,
                remove
            }) => (
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={!!touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                        sx={{ gridColumn: "span 2" }}
                    />
                </form>
            )}
        </>
    )
}