import { useState } from 'react';
import { updateGrievance, deleteGrievance } from '../utils/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['Academic', 'Hostel', 'Transport', 'Other'];
const STATUSES = ['Pending', 'Resolved'];

const categoryColors = {
  Academic: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  Hostel: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  Transport: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  Other: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
};

const statusColors = {
  Pending: 'bg-orange-50 text-orange-700 ring-1 ring-orange-100',
  Resolved: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
};

const GrievanceCard = ({ grievance, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: grievance.title,
    description: grievance.description,
    category: grievance.category,
    status: grievance.status,
  });

  const handleUpdate = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Title and description are required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await updateGrievance(grievance._id, form);
      onUpdate(data.grievance);
      setIsEditing(false);
      toast.success('Grievance updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this grievance?')) return;
    setLoading(true);
    try {
      await deleteGrievance(grievance._id);
      onDelete(grievance._id);
      toast.success('Grievance deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });

  return (
    <div className="card overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="-mx-6 -mt-6 mb-5 h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500" />
      {isEditing ? (
        <div className="space-y-4">
          <input
            className="input-field text-sm"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            className="input-field text-sm resize-none"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <select
              className="input-field text-sm"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              className="input-field text-sm"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={handleUpdate} disabled={loading} className="btn-primary text-sm px-3 py-1.5">
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-secondary text-sm px-3 py-1.5">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-xl font-bold leading-snug text-slate-900">{grievance.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{grievance.description}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[grievance.category]}`}>
                {grievance.category}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[grievance.status]}`}>
                {grievance.status}
              </span>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{formatDate(grievance.date || grievance.createdAt)}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-50"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
              >
                {loading ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GrievanceCard;
