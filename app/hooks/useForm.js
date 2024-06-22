import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!values.fullName) {
      newErrors.fullName = 'Full Name is required';
    } else if (values.fullName.length < 5) {
      newErrors.fullName = 'Full Name must include at least 5 characters';
    } else if (/[^a-zA-Z\s]/.test(values.fullName)) {
      newErrors.fullName = 'Full Name should not include numbers or special characters';
    }

    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (values.experience < 0) {
      newErrors.experience = 'Experience years should not be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    validate();
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    validate,
    resetForm,
  };
};

export default useForm;
