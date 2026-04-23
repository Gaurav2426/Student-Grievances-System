import { useState } from 'react';
import { submitGrievance } from '../utils/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['Academic', 'Hostel', 'Transport', 'Other'];

const SubmitGrievanceForm = ({ onSubmitted }) => {
  const [form, setForm] = useState({ title: '', description: '', category: 'Academic' });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const { data } = await submitGrievance(form);
      onSubmitted(data.grievance);
      setForm({ title: '', description: '', category: 'Academic' });
      setIsOpen(false);
      toast.success('Grievance submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary w-full justify-center rounded-[1.4rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-5 py-4 text-base shadow-[0_18px_40px_rgba(15,23,42,0.16)] sm:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Submit New Grievance
        </button>
      ) : (
        <div className="surface overflow-hidden">
          <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 px-6 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">New grievance</h2>
                <p className="text-sm text-slate-600">Capture the issue clearly so it can be reviewed quickly.</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-7">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Brief title of your grievance"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-field"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="input-field resize-none"
                rows={5}
                placeholder="Describe your grievance in detail..."
                required
              />
            </div>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Submitting...' : 'Submit Grievance'}
              </button>
              <button type="button" onClick={() => setIsOpen(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubmitGrievanceForm;
