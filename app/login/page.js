// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/contexts/AuthContext';

// export default function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields');
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await login(formData.email, formData.password);
      
//       if (result.success) {
//         if (result.user.role === 'admin') {
//           router.push('/admin');
//         } else {
//           router.push('/dashboard');
//         }
//       } else {
//         setError(result.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="max-w-4xl w-full">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
//           <div className="flex flex-col lg:flex-row">
//             {/* Left Side - Image */}
//             <div className="lg:w-1/2 bg-sky-600 relative">
//               <div 
//                 className="h-48 lg:h-full bg-cover bg-center bg-no-repeat"
//                 style={{
//                   backgroundImage: 'url("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
//                 }}
//               >
//                 <div className="absolute inset-0 bg-sky-900/30"></div>
//               </div>
              
//               {/* Overlay Content */}
//               <div className="absolute inset-0 flex items-center justify-center p-8">
//                 <div className="text-center text-white">
//                   <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
//                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
//                     </svg>
//                   </div>
//                   <h2 className="text-2xl font-bold mb-2">St Mary Rideau Clinic</h2>
//                   <p className="text-sky-100 text-sm">Secure Patient Portal</p>
//                   <div className="mt-4 space-y-2 text-xs text-sky-200">
//                     <div className="flex items-center justify-center">
//                       <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                       Secure & Encrypted
//                     </div>
//                     <div className="flex items-center justify-center">
//                       <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                       HIPAA Compliant
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Login Form */}
//             <div className="lg:w-1/2 p-8">
//               <div className="max-w-md mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                   <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//                   <p className="text-gray-600 text-sm">Sign in</p>
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-start">
//                     <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     {error}
//                   </div>
//                 )}

//                 <form className="space-y-5" onSubmit={handleSubmit}>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       autoComplete="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
//                       placeholder="Enter your email"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                       Password
//                     </label>
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       autoComplete="current-password"
//                       required
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
//                       placeholder="Enter your password"
//                     />
//                   </div>

//                   <div className="flex items-center justify-between text-sm">
//                     <label className="flex items-center">
//                       <input
//                         type="checkbox"
//                         className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
//                       />
//                       <span className="ml-2 text-gray-600">Remember me</span>
//                     </label>
//                     <a href="/forgot-password" className="text-sky-600 hover:text-sky-500 font-medium">
//                       Forgot password?
//                     </a>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 transition duration-300 font-semibold"
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Signing in...
//                       </span>
//                     ) : (
//                       'Sign In to Portal'
//                     )}
//                   </button>
//                 </form>

//                 <div className="mt-6 text-center">
//                   <p className="text-sm text-gray-600">
//                     New patient?{' '}
//                     <Link href="/signup" className="font-medium text-sky-600 hover:text-sky-500">
//                       Create account
//                     </Link>
//                   </p>
//                 </div>

//                 {/* Demo Credentials */}
//                 <div className="mt-6 bg-sky-50 rounded-lg p-4 border border-sky-200">
//                   <div className="text-center mb-3">
//                     <h3 className="text-sm font-semibold text-sky-800">Login Instruction</h3>
//                     <p className="text-xs text-sky-600">login details Sample</p>
//                   </div>
//                   <div className="space-y-1 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Email:</span>
//                       <span className="font-medium text-gray-800">demo@gmail.com</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Password:</span>
//                       <span className="font-medium text-gray-800">demo1234</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific field error when user types
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
    if (error) setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        if (result.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        // Handle specific backend errors
        if (result.message?.includes('Invalid email or password')) {
          setError('Invalid email or password. Please try again.');
        } else if (result.message?.includes('User not found')) {
          setError('No account found with this email address.');
        } else {
          setError(result.message || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        setError('Network error. Please check your connection and try again.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Image */}
            <div className="lg:w-1/2 bg-sky-600 relative">
              <div 
                className="h-48 lg:h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
                }}
              >
                <div className="absolute inset-0 bg-sky-900/30"></div>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">St Mary Rideau Clinic</h2>
                  <p className="text-sky-100 text-sm">Secure Patient Account</p>
                  <div className="mt-4 space-y-2 text-xs text-sky-200">
                    <div className="flex items-center justify-center">
                      <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Secure & Encrypted
                    </div>
                    {/* <div className="flex items-center justify-center">
                      <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      HIPAA Compliant
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 p-8">
              <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                  <p className="text-gray-600 text-sm">Sign in to your patient portal</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 text-gray-900 placeholder-gray-400 ${
                        validationErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-sky-500'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field with Toggle */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 pr-12 text-gray-900 placeholder-gray-400 ${
                          validationErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-sky-500'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {validationErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sky-600 hover:text-sky-500 font-medium transition duration-200">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-semibold shadow-sm"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    New patient?{' '}
                    <Link href="/signup" className="font-medium text-sky-600 hover:text-sky-500 transition duration-200">
                      Create account
                    </Link>
                  </p>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 bg-sky-50 rounded-lg p-4 border border-sky-200">
                  <div className="text-center mb-3">
                    <h3 className="text-sm font-semibold text-sky-800">Demo Access</h3>
                    <p className="text-xs text-sky-600">Test the portal with these credentials</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-800">demo@gmail.com</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Password:</span>
                      <span className="font-medium text-gray-800">demo1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}