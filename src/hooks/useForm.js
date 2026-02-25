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

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setIsLoading(true);
        try {
            await onSubmit(values);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        values,
        setValues,
        handleChange,
        handleSubmit,
        handleReset,
        isLoading,
    };
};

export default useForm;
