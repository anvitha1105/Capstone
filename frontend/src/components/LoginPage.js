import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, API } from '../App';
import { Brain, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/auth/login`, formData);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-500/30">
              <Brain className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="text-slate-400">Sign in to continue your cognitive journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="text-slate-400 text-sm mb-4">Don't have an account?</div>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 font-medium"
          >
            Create Account
          </Link>
        </div>

        {/* Demo Account Info */}
        <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="text-sm text-slate-400 text-center">
            <div className="font-medium text-slate-300 mb-2">Quick Demo</div>
            <div>Create an account to start challenging AI models!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;