import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { UserCog, Mail, Lock, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AgentLogin = () => {


  const navigate = useNavigate();
  const { API_URL } = useContext(AuthContext);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/api/agentAuth/login`, { ...values, role: 'agent' })
      .then((response) => {
        console.log('Agent Login Successful:', response);
        
        if (response.data.token) {
          localStorage.setItem('agentToken', response.data.token);
          window.location.href = '/agent/home';


          
        } else {
          console.error('No token received in the response.');
        }
      })
      .catch((error) => {
        console.error('Agent Login Failed:', error.response ? error.response.data : error.message);
        alert('Login Failed. Please check your credentials.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 transform transition-all hover:scale-[1.01]">
          {/* Header Section */}
          <div className="text-center">
            <div className="mx-auto h-14 w-14 bg-indigo-100 rounded-full flex items-center justify-center">
              <UserCog className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Agent Portal
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your support dashboard
            </p>
          </div>

          {/* Form Section */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Agent Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="email"
                        name="email"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ease-in-out duration-150"
                        placeholder="agent@company.com"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="password"
                        name="password"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ease-in-out duration-150"
                        placeholder="Enter your password"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <Shield className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                    </span>
                    {isSubmitting ? 'Signing in...' : 'Sign in as Agent'}
                  </button>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-600">Don't have an account? New User.</span>
                  <Link to="/agent/register" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;