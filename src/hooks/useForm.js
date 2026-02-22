import { useState } from "react";

const useForm = (initialValues, onSubmit) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    };

    const handleReset = (newValues) => {
        setValues(newValues || initialValues);
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        onSubmit(values);
    };

    return {
        values,
        setValues,
        handleChange,
        handleSubmit,
        handleReset,
    };
};

export default useForm;
