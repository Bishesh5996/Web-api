import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterUser as useRegisterUserTan } from '../../hooks/useRegisterUserTan';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const { mutate, data, error, isPending } = useRegisterUserTan();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...formData } = values;

      mutate(formData, {
        onSuccess: () => {
          toast.success('Registration successful! You can now log in.');
        },
        onError: () => {
          toast.error('Registration failed. Please try again.');
        },
      });
    },
  });

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
        noValidate
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">Create an Account</h2>

        {fields.map(({ name, label, type }) => (
          <div className="mb-5" key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[name]}
              className={`w-full px-4 py-2 border ${
                formik.touched[name] && formik.errors[name] ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-2 focus:ring-purple-500 outline-none transition`}
              autoComplete="off"
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2 rounded-lg font-semibold disabled:opacity-60"
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>

        {error && (
          <p className="text-red-600 text-center text-sm mt-4">
            {error.message || 'An error occurred'}
          </p>
        )}
        {data && (
          <p className="text-green-600 text-center text-sm mt-4">
            {data.message || 'Registration successful'}
          </p>
        )}
      </form>
    </div>
  );
}
