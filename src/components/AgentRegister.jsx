import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, Building2, Badge, ArrowRight,UserCog } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';


const AgentRegister = () => {
  const { API_URL } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agencyName: '',
    licenseNumber: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Required'),
    agencyName: Yup.string().required('Agency Name is required'),
    licenseNumber: Yup.string().required('License Number is required'),
  });

  const onSubmit = (values) => {
    axios.post(`${API_URL}/api/agentAuth/register-agent`, { ...values, role: 'agent' })
      .then(response => {
        console.log('Agent Registration Successful', response);
       navigate ("/agent/login")      })
      .catch(error => {
        console.error('Agent Registration Failed', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
        <div className="mx-auto h-14 w-14 bg-indigo-100 rounded-full flex items-center justify-center">
              <UserCog className="h-8 w-8 text-indigo-600" />
            </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Agent Registration</h2>
          <p className="text-gray-600">Create your agent account to get started</p>
        </div>








        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Field
                  type="text"
                  name="agencyName"
                  placeholder="Agency Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
              <ErrorMessage
                name="agencyName"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <div className="relative">
                <Badge className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Field
                  type="text"
                  name="licenseNumber"
                  placeholder="License Number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
              <ErrorMessage
                name="licenseNumber"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Register as Agent
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Form>
        </Formik>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/agent/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentRegister;