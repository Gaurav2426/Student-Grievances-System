import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerStudent } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { data } = await registerStudent(form);
      login(data.student, data.token);
      toast.success(`Welcome, ${data.student.name}! 🎉`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="order-2 lg:order-1">
          <div className="mb-6 text-center lg:text-left">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-[0_18px_36px_rgba(8,145,178,0.22)] lg:mx-0">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
            <p className="mt-2 text-sm text-slate-600">Join the student grievance portal and keep your issues organized.</p>
          </div>

          <div className="surface p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="you@college.edu"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    className="input-field pr-10"
                    placeholder="Min. 6 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : 'Register'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-slate-900 underline decoration-sky-300 decoration-2 underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="surface order-1 overflow-hidden p-8 lg:order-2 lg:p-10">
          <div className="hero-chip mb-6 w-fit">New here?</div>
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">One place for every student grievance.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Create an account, file issues with context, and follow progress without jumping through multiple screens.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Simple</p>
              <p className="mt-2 text-slate-700">Fast signup, clean navigation, and a focused dashboard.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Visible</p>
              <p className="mt-2 text-slate-700">Track pending and resolved requests with clear status cues.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
