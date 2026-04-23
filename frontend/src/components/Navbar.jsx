import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { student, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/75 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.5rem] items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-[0_14px_32px_rgba(8,145,178,0.22)]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">Student portal</p>
              <span className="text-lg font-bold text-slate-900">GrievanceMS</span>
            </div>
          </div>

          {student && (
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {student.name?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{student.name}</span>
              </div>
              <button onClick={handleLogout} className="btn-danger">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
